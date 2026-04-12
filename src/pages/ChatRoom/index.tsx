import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import useCurrentUser from '~/hooks/useCurrentUser';
import { useCurrentGroup } from '~/hooks/useCurrentGroup';
import { maskGroupCode } from '~/utils/ui_utils';
import { FloatingComponent } from '~/components/FloatingComponent';
import { Button } from '~/components/Button';
import TimerCountDown from './TimerCountDown';
import MessageItem from './MessageItem';
import { notify } from '~/components/Toast';
import { ToastContainer } from 'react-toastify';
import { REDIRECT_DELAY } from '~/constants/ApplicationConstants';
import { leaveGroup } from '~/services/groupService';
import { sendMessage, updateMessage, deleteMessage } from '~/services/messageService';
import useGetGroup from '~/hooks/useGetGroup';
import useGetMessages from '~/hooks/useGetMessages';

export default function ChatRoom() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const { user: currentUser } = useCurrentUser();
  const { group: currentGroup, removeGroup } = useCurrentGroup();

  const [inputText, setInputText] = useState('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentUser || !currentGroup || currentGroup.id !== Number(groupId)) {
      navigate('/');
    }
  }, [currentUser, currentGroup, groupId, navigate]);

  const { error: groupError } = useGetGroup(currentGroup?.id, currentUser?.code);

  useEffect(() => {
    if (groupError) {
      notify.error("Failed to load group");
      removeGroup();
      setTimeout(() => {
        navigate('/');
      }, REDIRECT_DELAY);
    }
  }, [groupError]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentUser || !currentGroup) return;

    const content = inputText.trim();
    setInputText('');

    try {
      if (editingMessageId) {
        await updateMessage(editingMessageId, { content }, currentUser.code);
        setEditingMessageId(null);
        refresh();
      } else {
        await sendMessage({
          content,
          group_id: currentGroup.id,
          message_type: "TEXT",
          message_uuid: crypto.randomUUID()
        }, currentUser.code);
        refresh();
      }
    } catch {
      notify.error(editingMessageId ? "Failed to update message" : "Failed to send message");
    }
  };

  const handleEdit = (messageId: number, content: string) => {
    setEditingMessageId(messageId);
    setInputText(content);
  };

  const handleDelete = async (messageId: number) => {
    if (!currentUser) return;
    try {
      await deleteMessage(messageId, currentUser.code);
      refresh();
      notify.success("Message deleted");
    } catch {
      notify.error("Failed to delete message");
    }
  };

  const handleCopyGroupCode = () => {
    navigator.clipboard.writeText(currentGroup?.code || "");
    notify.success("Group code copied to clipboard");
  }

  async function handleLeave() {
    if (!currentGroup || !currentUser) return;
    try {
      await leaveGroup({
        gr_id: currentGroup.id,
        u_id: currentUser.id,
      });
      removeGroup();
      notify.success(`Left group successfully, you will be redirected to home page after ${REDIRECT_DELAY / 1000} second`);
      setTimeout(() => {
        navigate('/');
      }, REDIRECT_DELAY);
    } catch {
      notify.error("Failed to leave group");
    }
  }

  const { messages, isLoading, error, refresh } = useGetMessages(currentGroup, currentUser);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <>
      <ToastContainer />
      <Card className="flex flex-col h-[85vh] mx-auto p-0 overflow-hidden relative border-border/60 bg-surface/80 w-[600px]">
        <CardHeader className="p-4 border-b border-border/50 bg-surface/95 backdrop-blur z-10 sticky top-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">{currentGroup?.name || ""}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                Code:
                <FloatingComponent anchorElement={<span className="font-mono text-white bg-surface-hover px-1 rounded cursor-pointer">{maskGroupCode(currentGroup?.code || "")}</span>}
                  placement="bottom-start"
                  dropdownClassName="bg-surface-hover p-4 rounded-lg border border-border/50 w-[300px] overflow-x-auto"
                >
                  <span className="font-mono text-white bg-surface-hover px-1 rounded cursor-pointer" onClick={handleCopyGroupCode}>{currentGroup?.code || ""}</span>
                </FloatingComponent>
                <span className="text-text-muted/40">•</span>
                <TimerCountDown expiredAt={currentGroup?.expiredAt || ""} />
              </CardDescription>
            </div>
            <div>
              <FloatingComponent anchorElement={<Button>Action</Button>} wrapperClassName="" dropdownClassName="bg-surface-hover p-4 rounded-lg border border-border/50">
                <div className="flex flex-col gap-2">
                  {currentUser?.id === currentGroup?.ownerId &&
                    <Button variant="primary" size='sm' onClick={() => navigate(`/waiting-list/${currentGroup?.id}`)} >Waiting List</Button>
                  }
                  <Button variant="primary" size='sm' onClick={handleCopyGroupCode} >Copy Group Code</Button>
                  <Button variant="danger" size='sm' onClick={handleLeave}>Leave</Button>
                </div>
              </FloatingComponent>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grow overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="h-full flex items-center justify-center flex-col text-text-muted opacity-60">
              <svg className="animate-spin w-8 h-8 mb-3 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Loading messages...</p>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center flex-col text-red-400 opacity-80">
              <p>Failed to load messages.</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center flex-col text-text-muted opacity-60">
              <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>Welcome to the ephemeral chat.</p>
              <p className="text-xs mt-1">Messages disappear when the room closes.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.userId === currentUser?.id;
              return (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  isMe={isMe}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="p-4 bg-surface border-t border-border/50">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              className="grow bg-surface/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all placeholder:text-text-muted/60"
              placeholder={editingMessageId ? "Edit your message..." : "Type your message..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {editingMessageId && (
              <button
                type="button"
                onClick={() => {
                  setEditingMessageId(null);
                  setInputText('');
                }}
                className="shrink-0 bg-surface-hover hover:bg-surface border border-border text-text-main w-12 h-12 rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="shrink-0 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:bg-surface-hover disabled:text-text-muted text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background"
            >
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </Card>
    </>
  );
}

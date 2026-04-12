import type { Message } from '~/types/model';
import { notify } from '~/components/Toast';
import { FloatingComponent } from '~/components/FloatingComponent';

interface MessageItemProps {
  message: Message;
  isMe: boolean;
  onEdit?: (messageId: number, content: string) => void;
  onDelete?: (messageId: number) => void;
}

export default function MessageItem({ message, isMe, onEdit, onDelete }: MessageItemProps) {

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content || '');
    notify.success('Message copied to clipboard');
  };

  const contextMenuContent = (
    <div className="flex flex-col min-w-[150px]">
      <button
        type="button"
        onClick={handleCopy}
        className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-surface-hover transition-colors"
      >
        Copy Text
      </button>

      {isMe && onEdit && (
        <button
          type="button"
          onClick={() => onEdit(message.id, message.content || '')}
          className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-surface-hover transition-colors"
        >
          Edit Message
        </button>
      )}

      {isMe && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(message.id)}
          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-surface-hover hover:text-red-400 transition-colors"
        >
          Delete Message
        </button>
      )}
    </div>
  );

  return (
    <div className={`flex flex-col relative ${isMe ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs font-medium ${isMe ? 'text-primary-300' : 'text-text-muted'}`}>
          {message.userName}
        </span>
        <span className="text-[10px] text-text-muted/50">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <FloatingComponent
        trigger="right-click"
        placement={isMe ? 'bottom-end' : 'bottom-start'}
        dropdownClassName="z-50 bg-surface border border-border/50 rounded-lg shadow-xl overflow-hidden py-1"
        anchorElement={
          <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${isMe
            ? 'bg-primary-600 text-white rounded-br-sm'
            : 'bg-surface-hover text-text-main border border-border/50 rounded-bl-sm'
            }`}>
            {message.content}
          </div>
        }
      >
        {contextMenuContent}
      </FloatingComponent>
    </div>

  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import { joinGroup } from "~/services/groupService";
import type { NewGroupForm } from '~/types/api';
import { AxiosError } from 'axios';
import useCurrentUser from '~/hooks/useCurrentUser';
import { useCurrentGroup } from '~/hooks/useCurrentGroup';

export default function JoinGroup() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groupCode: '',
    username: '',
    message: '',
  });

  const { user, setUser } = useCurrentUser();
  const { setGroup } = useCurrentGroup();

  useEffect(() => {
    if (user != null) {
      setFormData(prev => ({ ...prev, username: user.username }));
    }
  }, [user])

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    setErrorMessage('');
    e.preventDefault();
    setIsLoading(true);


    let joinGroupRequest: NewGroupForm = {
      group_code: formData.groupCode,
      username: formData.username,
      message: formData.message,
    }
    try {
      let userCode: string | undefined = undefined;
      if (user != null && user.username == formData.username) {
        userCode = user.code;
      }
      let joinGroupResponse = await joinGroup(joinGroupRequest, userCode);
      if (joinGroupResponse.user_code != user?.code) {
        setUser({
          id: joinGroupResponse.user_id,
          username: joinGroupResponse.username,
          code: joinGroupResponse.user_code,
        });
      }
      setGroup({
        id: joinGroupResponse.group_id,
        code: joinGroupResponse.group_code,
        name: joinGroupResponse.group_name,
        ownerId: joinGroupResponse.user_id,
        approvalRequired: joinGroupResponse.approval_required,
        duration: 0,
        maxPeople: 0,
      });
      if (joinGroupResponse.is_waiting) {
        navigate(`/waiting/${joinGroupResponse.group_id}`);
      } else {
        navigate(`/chat/${joinGroupResponse.group_id}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setErrorMessage('Group not found or expired');
        } else if (error.response?.status === 400) {
          setErrorMessage('You are already a member of this group');
        } else {
          setErrorMessage(error.response?.data?.msg || 'Error joining group');
        }
      } else {
        setErrorMessage('Error joining group');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface text-text-muted hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <CardTitle>Join Group</CardTitle>
          </div>
          <CardDescription>Enter the code to join an existing conversation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Group Code"
              name="groupCode"
              placeholder="e.g. X92KV"
              value={formData.groupCode}
              onChange={handleChange}
              required
              className="uppercase"
            />

            <Input
              label="Your Username"
              name="username"
              placeholder="e.g. AgentSmith"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input
              label="Message to Owner (Optional)"
              name="message"
              placeholder="Hi, I'm joining from the marketing team..."
              value={formData.message}
              onChange={handleChange}
            />

            <div className="text-red-500 text-sm text-center" hidden={errorMessage == null || errorMessage == ''}>
              {errorMessage}
            </div>

            <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
              Join Group
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

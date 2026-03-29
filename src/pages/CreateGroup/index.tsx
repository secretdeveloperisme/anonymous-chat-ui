import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import { createGroup } from '~/services/groupService';
import useCurrentUser from '~/hooks/useCurrentUser';
import { useCurrentGroup } from '~/hooks/useCurrentGroup';


export default function CreateGroup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    groupName: '',
    duration: 30,
    maxPeople: 10,
    approvalRequired: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useCurrentUser();
  const { setGroup } = useCurrentGroup();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user != null) {
      setFormData(prev => ({ ...prev, username: user.username }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    let userCode: string | undefined = undefined;

    try {
      if (user != null && user.username == formData.username) {
        userCode = user.code;
      }
      const groupResult = await createGroup({
        username: formData.username,
        group_name: formData.groupName,
        duration: Number(formData.duration),
        maximum_members: Number(formData.maxPeople),
        approval_require: formData.approvalRequired,
      }, userCode);

      setGroup({
        id: groupResult.group_id,
        code: groupResult.group_code,
        name: formData.groupName,
        duration: formData.duration,
        maxPeople: Number(formData.maxPeople),
        approvalRequired: formData.approvalRequired,
        ownerId: groupResult.user_id,
        expiredAt: groupResult.expired_at,
      });

      setUser({
        id: groupResult.user_id,
        code: groupResult.user_code,
        username: groupResult.username
      });
      navigate(`/chat/${groupResult.group_id}`);
    } catch (error) {
      console.error("Failed to create group:", error);
      setErrorMessage('Error creating group');
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
            <CardTitle>Create Group</CardTitle>
          </div>
          <CardDescription>Setup a new anonymous space.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Username"
              name="username"
              placeholder="e.g. GhostProtocol"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input
              label="Group Name"
              name="groupName"
              placeholder="e.g. Secret Project X"
              value={formData.groupName}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="15">15 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="1440">24 Hours</option>
                <option value="never">No Limit</option>
              </Select>

              <Input
                label="Max People"
                name="maxPeople"
                type="number"
                min="2"
                max="100"
                value={formData.maxPeople}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pt-2 pb-4">
              <Checkbox
                label="Require my approval to join"
                name="approvalRequired"
                checked={formData.approvalRequired}
                onChange={handleChange}
              />
            </div>
            <div className='text-red-500 text-sm' hidden={errorMessage == null || errorMessage == ''}>
              {errorMessage}
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Group
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

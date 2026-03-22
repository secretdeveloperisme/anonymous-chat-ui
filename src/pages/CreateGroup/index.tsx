import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import { setCurrentUser, setCurrentGroup } from '../../services/chatSlice';
import { createGroup } from '~/services/groupService';
import type { RootState } from '~/services/store';
import cookie from '~/utils/cookie';
import * as ApplicationConstants from '~/constants/ApplicationConstants';


export default function CreateGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    groupName: '',
    duration: 30,
    maxPeople: 10,
    approvalRequired: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  let currentUser = useSelector((state: RootState) => state.chat.currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (currentUser == null) {
      const userInfoCookie = cookie.getCookie(ApplicationConstants.COOKIE_USER_INFO);
      if (userInfoCookie) {
        let userInfo = JSON.parse(userInfoCookie);
        dispatch(setCurrentUser(userInfo));
        currentUser = userInfo;
      }
    }

    try {
      const groupResult = await createGroup({
        username: formData.username,
        group_name: formData.groupName,
        duration: Number(formData.duration),
        maximum_members: Number(formData.maxPeople),
        approval_require: formData.approvalRequired,
      }, currentUser?.code);

      dispatch(setCurrentGroup({
        id: groupResult.group_id,
        code: groupResult.group_code,
        name: formData.groupName,
        duration: formData.duration,
        maxPeople: Number(formData.maxPeople),
        approvalRequired: formData.approvalRequired,
        ownerId: groupResult.user_id
      }));

      dispatch(setCurrentUser({
        id: groupResult.user_id,
        code: groupResult.user_code,
        username: groupResult.username
      }));
      cookie.setCookie(ApplicationConstants.COOKIE_USER_INFO, JSON.stringify({
        id: groupResult.user_id,
        code: groupResult.user_code,
        username: groupResult.username
      }), { expires: 7 });
      navigate(`/chat/${groupResult.group_id}`);
    } catch (error) {
      console.error("Failed to create group:", error);
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

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Group
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

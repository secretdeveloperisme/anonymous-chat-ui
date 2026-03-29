import { get, post, put, del } from '../utils/http';
import type {
  ListResponse, MessageResponse, OrderBy,
  SendMessageRequest, SendMessageResponse, UpdateMessage, MessageWithUser
} from '../types/api';
import type { MessageStatus, MessageType } from '~/constants/Types';

export interface GetMessagesParams {
  message_type?: MessageType;
  content?: string;
  status?: MessageStatus;
  from_date?: string;
  to_date?: string;
  created_at_sort?: OrderBy;
  page?: number;
  limit?: number;
}

export const getMessages = async (groupId: number, userCode: string, params?: GetMessagesParams): Promise<ListResponse<MessageWithUser>> => {
  const response = await get<ListResponse<MessageWithUser>>(`/groups/${groupId}/messages`, {
    headers: { 'x-user-code': userCode },
    params
  });
  return response.data;
};

export const sendMessage = async (data: SendMessageRequest, userCode?: string): Promise<SendMessageResponse> => {
  const config = userCode ? { headers: { 'x-user-code': userCode } } : undefined;
  const response = await post<SendMessageResponse>('/messages', data, config);
  return response.data;
};

export const updateMessage = async (messageId: number, data: UpdateMessage, userCode: string): Promise<MessageResponse> => {
  const response = await put<MessageResponse>(`/messages/${messageId}`, data, { headers: { 'x-user-code': userCode } });
  return response.data;
};

export const deleteMessage = async (messageId: number, userCode: string): Promise<void> => {
  await del(`/messages/${messageId}`, { headers: { 'x-user-code': userCode } });
};

export type MessageStatus = "NotSent" | "Sent" | "Seen";
export type MessageTypeEnum = "TEXT" | "ATTACHMENT";
export type AttachmentTypeEnum = "TEXT" | "IMAGE" | "VIDEO" | "AUDIO" | "BINARY" | "COMPRESSION";
export type OrderBy = "ASC" | "DESC";

export interface AttachmentPayload {
  attachment_type: AttachmentTypeEnum;
  id?: number;
  url: string;
}

export interface NewUserRequest {
  username: string;
}

export interface UserResponse {
  user_id: number;
  username: string;
  user_code: string;
}

export interface CommonResponse<T> {
  code: number;
  msg: string;
  data?: T;
}

// Used for both /add-user-group and /join-group as indicated by docs
export interface NewGroupForm {
  approval_require?: boolean | null;
  duration?: number;
  group_name?: string;
  maximum_members?: number | null;
  username: string;
  group_code?: string;
  message?: string;
}

export interface GroupResult {
  expired_at: string;
  group_code: string;
  group_id: number;
  group_name: string;
  is_waiting: boolean;
  user_code: string;
  user_id: number;
  username: string;
}

export interface DelGroupRequest {
  gr_id: number;
  u_id: number;
}

export interface DelGroupResponse {
  del_status: string;
  gr_code: string;
  gr_id: number;
}

export interface LeaveGroupRequest {
  gr_id: number;
  u_id: number;
}

export interface LeaveGroupResponse {
  code: number;
  msg: string;
}

export interface UserSettingInfo {
  user_code: string;
  user_id: number;
  username: string;
}

export interface GrDetailSettingResponse {
  created_at: string;
  expired_at: string;
  group_code: string;
  group_id: number;
  group_name: string;
  list_joined_member: UserSettingInfo[];
  list_waiting_member: UserSettingInfo[];
  maximum_members: number;
  owner_id: number;
  total_joined_member: number;
  total_waiting_member: number;
}

export interface GroupInfo {
  created_at: string;
  expired_at: string;
  group_code: string;
  group_id: number;
  group_name: string;
  latest_ms_content: string;
  latest_ms_time: string;
  latest_ms_username: string;
}

export interface GroupListResponse {
  list_gr: GroupInfo[];
  list_waiting_gr: GroupInfo[];
  total_gr: number;
  user_code: string;
  user_id: number;
}

export interface MessageWithUser {
  attachments?: AttachmentPayload[] | null;
  content?: string | null;
  created_at: string;
  id: number;
  message_type: MessageTypeEnum;
  message_uuid: string;
  status: MessageStatus;
  updated_at?: string | null;
  user_id: number;
  user_name: string;
}

export interface ListResponse<T> {
  count: number;
  objects: T[];
  total_pages: number;
}

export interface WaitingListResponse {
  created_at: string;
  id: number;
  message: string;
  user_id: number;
  username: string;
}

export interface GroupDetailResponse {
  created_at: string;
  expired_at: string;
  group_name: string;
  joined_member: number;
  max_member: number;
  messages: MessageWithUser[];
  user_id: number;
  waiting_member: number;
}

export interface SendMessageRequest {
  attachments?: AttachmentPayload[] | null;
  content?: string | null;
  group_id: number;
  message_type: MessageTypeEnum;
  message_uuid: string;
}

export interface SendMessageResponse {
  attachments?: AttachmentPayload[] | null;
  content: string;
  created_at: string;
  message_id: number;
  message_type: MessageTypeEnum;
  message_uuid: string;
  status: MessageStatus;
}

export interface UpdateMessage {
  content?: string | null;
  message_type?: MessageTypeEnum | null;
}

export interface MessageResponse {
  attachments?: AttachmentPayload[] | null;
  content?: string | null;
  created_at: string;
  id: number;
  message_type: MessageTypeEnum;
  status: MessageStatus;
  updated_at?: string | null;
  user_id: number;
  user_name: string;
}

export interface RmUserRequest {
  gr_id: number;
  gr_owner_id: number;
  rm_user_id: number;
}

export interface RmUserResponse {
  res_code: number;
  res_msg: string;
}

export interface ProcessWaitingRequest {
  is_approved: boolean;
}

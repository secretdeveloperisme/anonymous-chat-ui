import type { MessageStatus, MessageType, AttachmentType } from "~/constants/Types";

export interface User {
    id: number;
    username: string;
    code: string;
}

export interface Group {
    id: number;
    name: string;
    code: string;
    duration: number;
    maxPeople: number;
    approvalRequired: boolean;
    ownerId: number;
    expiredAt: string;
}

export interface AttachmentPayload {
    attachmentType: AttachmentType;
    id?: number;
    url: string;
}

export interface Message {
    attachments?: AttachmentPayload[] | null;
    content?: string | null;
    id: number;
    messageType: MessageType;
    messageUuid: string;
    status: MessageStatus;
    createdAt: string;
    updatedAt?: string | null;
    userId: number;
    userName: string;
}

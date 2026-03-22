export type MessageType = "text" | "image" | "video" | "file";
export type MessageStatus = "NotSent" | "Sent" | "Seen";
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
}

export interface Message {
    id: string;
    content: string;
    message_type: MessageType;
    userId: number;
    groupId: number;
    status: MessageStatus;
    createAt: string,
    updatedAt: string
}

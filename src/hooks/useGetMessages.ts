import { useEffect, useState } from "react";
import { getMessages } from "~/services/messageService";
import type { Group, Message, User } from "~/types/model";


export default function useGetMessages(currentGroup: Group | null, currentUser: User | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (currentGroup == null || currentUser == null) {
            return;
        }
        const activeGroup = currentGroup;
        const activeUser = currentUser;

        setIsLoading(true);
        setError(null);

        async function getMessagesFromAPI() {
            try {
                const response = await getMessages(activeGroup.id, activeUser.code);
                setMessages(
                    response.objects.map(msg => ({
                        id: msg.id,
                        messageUuid: msg.message_uuid,
                        content: msg.content,
                        messageType: msg.message_type,
                        userId: msg.user_id,
                        userName: msg.user_name,
                        groupId: activeGroup.id,
                        status: msg.status,
                        createdAt: msg.created_at,
                        updatedAt: msg.updated_at
                    }))
                );
            } catch (err) {
                setError(err as string);
            } finally {
                setIsLoading(false);
            }
        }

        getMessagesFromAPI();
    }, [currentGroup, currentUser]);

    return { messages, isLoading, error };
}
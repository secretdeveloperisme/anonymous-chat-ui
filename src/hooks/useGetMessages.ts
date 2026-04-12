import { useEffect, useState, useCallback } from "react";
import { getMessages } from "~/services/messageService";
import type { Group, Message, User } from "~/types/model";


export default function useGetMessages(currentGroup: Group | null, currentUser: User | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMessagesFromAPI = useCallback(async (isPolling = false) => {
        if (currentGroup == null || currentUser == null) {
            return;
        }
        const activeGroup = currentGroup;
        const activeUser = currentUser;

        if (!isPolling) setIsLoading(true);
        setError(null);

        try {
            const response = await getMessages(activeGroup.id, activeUser.code);
            const formattedMessages = response.objects.map(msg => ({
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
            }));

            // Sort messages ascending (oldest first) so newest are at the bottom
            formattedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            setMessages(formattedMessages);
        } catch (err) {
            setError(String(err));
        } finally {
            if (!isPolling) setIsLoading(false);
        }
    }, [currentGroup, currentUser]);

    useEffect(() => {
        getMessagesFromAPI();

        if (currentGroup == null || currentUser == null) return;

        const intervalId = setInterval(() => {
            getMessagesFromAPI(true);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [getMessagesFromAPI, currentGroup, currentUser]);

    return { messages, isLoading, error, refresh: () => getMessagesFromAPI(true) };
}
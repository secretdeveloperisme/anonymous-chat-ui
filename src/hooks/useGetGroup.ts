import { useEffect, useState } from "react";
import { getGroupDetail } from "~/services/groupService";
import type { GroupDetailResponse } from "~/types/api";

export default function useGetGroup(groupId: number | undefined | null, userCode?: string) {
    const [groupDetail, setGroupDetail] = useState<GroupDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!groupId) {
            return;
        }

        setIsLoading(true);
        setError(null);

        async function getGroupFromAPI() {
            try {
                const response = await getGroupDetail(groupId as number, userCode);
                setGroupDetail(response);
            } catch (err) {
                setError(err as string);
            } finally {
                setIsLoading(false);
            }
        }

        getGroupFromAPI();
    }, [groupId, userCode]);

    return { groupDetail, isLoading, error };
}

import { get, post } from '../utils/http';
import type {
    CommonResponse, GrDetailSettingResponse, DelGroupRequest, DelGroupResponse,
    GroupDetailResponse, GroupListResponse, GroupResult, LeaveGroupRequest, LeaveGroupResponse,
    ListResponse, NewGroupForm, ProcessWaitingRequest, RmUserRequest, RmUserResponse, WaitingListResponse
} from '../types/api';

export const createGroup = async (data: NewGroupForm, userCode?: string): Promise<GroupResult> => {
    const config = userCode ? { headers: { 'x-user-code': userCode } } : undefined;
    const response = await post<GroupResult>('/add-user-group', data, config);
    return response.data;
};

export const deleteGroup = async (data: DelGroupRequest): Promise<CommonResponse<DelGroupResponse>> => {
    const response = await post<CommonResponse<DelGroupResponse>>('/del-gr', data);
    return response.data;
};

export const getUserGroups = async (userId: number): Promise<GroupListResponse> => {
    const response = await get<GroupListResponse>(`/gr/list/${userId}`);
    return response.data;
};

export const getGroupSettings = async (groupId: number): Promise<CommonResponse<GrDetailSettingResponse>> => {
    const response = await get<CommonResponse<GrDetailSettingResponse>>(`/group-detail/setting/${groupId}`);
    return response.data;
};

export const getGroupDetail = async (groupId: number, userCode?: string): Promise<GroupDetailResponse> => {
    const config = userCode ? { headers: { 'x-user-code': userCode } } : undefined;
    const response = await get<GroupDetailResponse>(`/group-detail/${groupId}`, config);
    return response.data;
};

export const getGroupDetailByCode = async (groupCode: string): Promise<GroupDetailResponse> => {
    const response = await get<GroupDetailResponse>(`/group-detail/code/${groupCode}`);
    return response.data;
};

export const getWaitingList = async (
    groupId: number,
    userCode: string,
    page?: number,
    limit?: number
): Promise<ListResponse<WaitingListResponse>> => {
    const params: Record<string, any> = {};
    if (page !== undefined) params.page = page;
    if (limit !== undefined) params.limit = limit;
    const response = await get<ListResponse<WaitingListResponse>>(`/groups/${groupId}/waiting-list`, {
        headers: { 'x-user-code': userCode },
        params
    });
    return response.data;
};

export const joinGroup = async (data: NewGroupForm, userCode?: string): Promise<GroupResult> => {
    const config = userCode ? { headers: { 'x-user-code': userCode } } : undefined;
    const response = await post<GroupResult>('/join-group', data, config);
    return response.data;
};

export const leaveGroup = async (data: LeaveGroupRequest): Promise<LeaveGroupResponse> => {
    const response = await post<LeaveGroupResponse>('/leave-gr', data);
    return response.data;
};

export const removeUserFromGroup = async (data: RmUserRequest): Promise<RmUserResponse> => {
    const response = await post<RmUserResponse>('/rm-u-from-gr', data);
    return response.data;
};

export const processWaitingRequest = async (requestId: number, data: ProcessWaitingRequest, userCode: string): Promise<void> => {
    await post(`/waiting-list/${requestId}`, data, { headers: { 'x-user-code': userCode } });
};

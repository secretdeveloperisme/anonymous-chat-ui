import { useSelector } from "react-redux";
import type { RootState } from "~/services/store";
import cookie from "~/utils/cookie";
import * as ApplicationConstant from "~/constants/ApplicationConstants";
import { useDispatch } from "react-redux";
import { setCurrentGroup } from "~/services/chatSlice";
import type { Group } from "~/types/model";

export function useCurrentGroup() {
    let group = useSelector((state: RootState) => state.chat.currentGroup);
    const dispatch = useDispatch();
    if (group == null) {
        let groupInfoCookie = cookie.getCookie(ApplicationConstant.COOKIE_GROUP_INFO)
        if (groupInfoCookie != null) {
            dispatch(setCurrentGroup(JSON.parse(groupInfoCookie)));
        }
    }
    const setGroup = (group: Group) => {
        dispatch(setCurrentGroup(group));
        cookie.setCookie(ApplicationConstant.COOKIE_GROUP_INFO, JSON.stringify(group));
    }
    const removeGroup = () => {
        dispatch(setCurrentGroup(null));
        cookie.deleteCookie(ApplicationConstant.COOKIE_GROUP_INFO);
    }
    return { group, setGroup, removeGroup };
}
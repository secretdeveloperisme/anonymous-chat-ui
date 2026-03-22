import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "~/services/store";
import cookie from "~/utils/cookie";
import * as ApplicationConstant from '~/constants/ApplicationConstants';
import type { User } from "~/types/model";
import { setCurrentUser } from "~/services/chatSlice";

export default function useCurrentUser() {
    const dispatch = useDispatch();
    let user = useSelector((state: RootState) => state.chat.currentUser);

    if (user == null) {
        let userInfoCookie = cookie.getCookie(ApplicationConstant.COOKIE_USER_INFO)
        if (userInfoCookie != null) {
            dispatch(setCurrentUser(JSON.parse(userInfoCookie)));
        }
    }

    const setUser = (user: User) => {
        dispatch(setCurrentUser(user));
        cookie.setCookie(ApplicationConstant.COOKIE_USER_INFO, JSON.stringify(user));
    }
    const clearUser = () => {
        dispatch(setCurrentUser(null));
        cookie.deleteCookie(ApplicationConstant.COOKIE_USER_INFO);
    }
    return { user, setUser, clearUser }
}

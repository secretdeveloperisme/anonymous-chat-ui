import Cookies from "js-cookie";

function setCookie(name: string, value: string, props: Cookies.CookieAttributes = {}) {
    Cookies.set(name, value, props);
}

function getCookie(name: string) {
    return Cookies.get(name);
}

function deleteCookie(name: string) {
    Cookies.remove(name);
}


export default { setCookie, getCookie, deleteCookie };
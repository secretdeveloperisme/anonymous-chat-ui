import ChatRoom from "~/pages/ChatRoom";
import CreateGroup from "~/pages/CreateGroup";
import Home from "~/pages/Home";
import JoinGroup from "~/pages/JoinGroup";
import WaitingRoom from "~/pages/WaitingRoom";
import DefaultLayout from "~/layouts/DefaultLayout";

const publicRoutes = [
    { path: '/', element: <Home />, layout: DefaultLayout },
    { path: '/create', element: <CreateGroup />, layout: DefaultLayout },
    { path: '/join', element: <JoinGroup />, layout: DefaultLayout },
];
const privateRoutes = [
    { path: '/waiting/:groupId', element: <WaitingRoom />, layout: DefaultLayout },
    { path: '/chat/:groupId', element: <ChatRoom />, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };

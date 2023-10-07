import { atom } from 'recoil';
import { MessengerUserListInterface, MessengerRoomListInterface, MessengeChatListInterface } from '@RecoilInterface';

// 사용자 리스트 스테이트
export const MessengerUserListState = atom<MessengerUserListInterface>({
    key: `messenger/user-list`,
    default: {
        loading: false,
        users: [],
    },
});

// 채팅방 리스트 스테이트
export const MessengerRoomListState = atom<MessengerRoomListInterface>({
    key: `messenger/room-list`,
    default: {
        loading: false,
        rooms: [],
    },
});

// 채팅리스트 스테이트
export const MessengerChatListState = atom<MessengeChatListInterface>({
    key: `messenger/chat-list`,
    default: {
        loading: false,
        messenger: {
            room_code: ``,
            target: [],
        },
        chats: [],
    },
});

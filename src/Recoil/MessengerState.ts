import { atom } from 'recoil';
import {
    MessengerUserListInterface,
    MessengerRoomListInterface,
    MessengeChatListInterface,
    MessengeChatCreateInterface,
} from '@RecoilInterface';

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
        resultData: {
            messenger: {
                room_code: ``,
                target: [],
                last: {
                    last: false,
                    message: ``,
                    profileImage: ``,
                    nickname: ``,
                    time: null,
                    uid: ``,
                },
                created_at: {
                    format: {
                        step1: ``,
                        step2: ``,
                        step3: ``,
                    },
                    sinceString: ``,
                },
            },
            chat: [],
        },
    },
});

// 신규 메시지 스테이트
export const MessengerChatCreateState = atom<MessengeChatCreateInterface>({
    key: `messenger/chat-create`,
    default: {
        loading: false,
        message: {
            type: '040010',
            contents: ``,
            image: ``,
        },
    },
});

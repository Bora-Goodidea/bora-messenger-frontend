import { atom } from 'recoil';
import { MessengerUserListInterface, MessengerRoomListInterface } from '@RecoilInterface';

// 사용자 리스트 스테이트
export const MessengerUserListState = atom<MessengerUserListInterface>({
    key: `messenger/user-list`,
    default: {
        loading: false,
        users: [],
    },
});

export const MessengerRoomListState = atom<MessengerRoomListInterface>({
    key: `messenger/room-list`,
    default: {
        loading: false,
        rooms: [],
    },
});

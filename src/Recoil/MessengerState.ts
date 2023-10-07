import { atom } from 'recoil';
import { MessengerUserListInterface } from '@RecoilInterface';

export const MessengerUserListState = atom<MessengerUserListInterface>({
    key: `messenger/user-list`,
    default: {
        loading: false,
        users: [],
    },
});

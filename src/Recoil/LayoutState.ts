import { atom } from 'recoil';
import { LayoutStateInterface } from '@RecoilInterface';

export const AtomLayoutState = atom<LayoutStateInterface>({
    key: `app/LayoutState`,
    default: {
        loading: false,
        mainAlert: {
            state: false,
            message: ``,
        },
    },
});

import { atom } from 'recoil';
import { RootStateInterface } from '@RecoilInterface';
// import { BaseDataCodeStep1Item, BaseDataCodeStep2Item } from '@CommonType';

// interface rootDataParmInterface {
//     code: {
//         step1: Array<BaseDataCodeStep1Item>;
//         step2: Array<BaseDataCodeStep2Item>;
//     };
// }

// interface Param extends rootDataParmInterface {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     [key: string]: any;
// }

export const AtomRootState = atom<RootStateInterface>({
    key: `app/RootState`,
    default: {
        appState: false,
        systemStatus: {
            server: false,
            notice: false,
            data: false,
            login: false,
        },
        systemNotice: '',
        loginState: false,
        rootData: {
            code: {
                step1: [],
                step2: [],
            },
        },
    },
});

// export const SelectorRootStateRootData = selector({
//     key: `RootStateRootDataSelector`,
//     get: ({ get }) => {
//         const element = get(AtomRootState);
//         return element.rootData;
//     },
// });

import { BaseDataCodeStep1Item, BaseDataCodeStep2Item } from '@CommonType';

export interface RootStateInterface {
    appState: boolean;
    systemStatus: {
        server: boolean;
        notice: boolean;
        data: boolean;
        login: boolean;
    };
    systemNotice: string;
    loginState: boolean;
    rootData: {
        code: {
            step1: Array<BaseDataCodeStep1Item>;
            step2: Array<BaseDataCodeStep2Item>;
        };
    };
}

export interface LayoutStateInterface {
    loading: boolean;
    mainAlert: {
        state: boolean;
        type: string | `default` | `move`;
        action: string;
        message: string;
    };
}

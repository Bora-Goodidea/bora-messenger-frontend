import { BaseDataCodeStep1Item, BaseDataCodeStep2Item } from '@CommonType';

export interface RootStateInterface {
    appState: boolean;
    systemStatus: {
        server: boolean;
        notice: boolean;
        data: boolean;
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

import { BaseDataCodeStep1Item, BaseDataCodeStep2Item } from '@CommonType';

// 기본 데이터 결과
export interface BaseDataResultInterface {
    code: {
        step1: Array<BaseDataCodeStep1Item>;
        step2: Array<BaseDataCodeStep2Item>;
    };
}

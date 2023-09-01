export interface BaseDataResultInterface {
    code: {
        step1: Array<{
            type: string | 'group' | 'code';
            group: string;
            code: string;
            name: string;
        }>;
        step2: Array<{
            group: string;
            name: string;
            codes: Array<{
                code_id: string;
                name: string;
            }>;
        }>;
    };
}

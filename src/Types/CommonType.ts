export type BoraButtonType = `RoundIcon` | `MessageInputButton` | `MessageInInputButton` | `MessageBoxMessageButton`;
export type LocationStyleType = string | `left` | `right`;
export type AvatarStyleSizeType = string | `default` | `middle` | `small`;
export type BoraInputType = string | `search` | `send`;
export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure';

// 서비스 결과 인터페이스
export interface ServicesResult<T> {
    status: boolean;
    message: string;
    payload: T;
}

// 공통 코드 인터페이스 ( step1 )
export interface BaseDataCodeStep1Item {
    type: string | 'group' | 'code';
    group: string;
    code: string;
    name: string;
}

// 공통 코드 인터페이스 ( step2 )
export interface BaseDataCodeStep2Item {
    group: string;
    name: string;
    codes: Array<{
        code_id: string;
        name: string;
    }>;
}

// 공통 코드 아이템
export interface CommonCodesItemInterface {
    code: string;
    name: string;
}

// 공통 사용자 인터페이스
export interface CommonUserInfoInterface {
    uid: string;
    nickname: string;
    profile: {
        image: string;
    };
}

// 공통 날짜 포멧 (Simply)
export interface CommonSimplyTimeFormatInterface {
    format: {
        step1: string; // ex) '2023년 10월 6일 금요일'
        step2: string; // ex) '2023년 10월 6일 금요일 23시 3분'
        step3: string; // ex) '2023년 10월 6일 금요일 23시 3분 5초'
    };
    sinceString: string; // ex) '2분 전'
}

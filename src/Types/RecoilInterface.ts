import {
    BaseDataCodeStep1Item,
    BaseDataCodeStep2Item,
    CommonCodesItemInterface,
    CommonSimplyTimeFormatInterface,
    CommonUserInfoInterface,
} from '@CommonType';

// Root State
export interface RootStateInterface {
    appState: boolean;
    appCheckStatus: {
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

// 레이아웃 스테이트
export interface LayoutStateInterface {
    loading: boolean;
    mainAlert: {
        state: boolean;
        type: string | `default` | `move`;
        action: string;
        message: string;
    };
}

// 사용자 리스트
export interface MessengerUserListInterface {
    loading: boolean;
    users: Array<{
        uid: string;
        type: CommonCodesItemInterface;
        level: CommonCodesItemInterface;
        status: CommonCodesItemInterface;
        email: string;
        nickname: string;
        profile: {
            image: string;
        };
        active: {
            state: `Y` | `N`;
            updated_at: CommonSimplyTimeFormatInterface | null;
        };
        created_at: CommonSimplyTimeFormatInterface;
        updated_at: CommonSimplyTimeFormatInterface;
    }>;
}

// 내 채팅방 리스트
export interface MessengerRoomListInterface {
    loading: boolean;
    rooms: Array<{
        room_code: string;
        target: Array<CommonUserInfoInterface>;
        chart: {
            content: string;
            updated_at: CommonSimplyTimeFormatInterface | null;
        };
        created_at: CommonSimplyTimeFormatInterface;
        updated_at: CommonSimplyTimeFormatInterface;
    }>;
}

// 채팅 리스트
export interface MessengeChatListInterface {
    loading: boolean;
    messenger: {
        room_code: string;
        target: Array<CommonUserInfoInterface>;
        last: {
            last: boolean;
            message: string | null;
            profileImage: string | null;
            nickname: string | null;
            time: CommonSimplyTimeFormatInterface | null;
        };
        created_at: CommonSimplyTimeFormatInterface | null;
    };
    chats: Array<{
        date: string;
        list: {
            [index: string]: {
                location: string | `left` | `right`;
                user: CommonUserInfoInterface;
                message: Array<{
                    type: CommonCodesItemInterface;
                    chat_code: string;
                    contents: string;
                    checked: `Y` | `N`;
                    checked_at: CommonSimplyTimeFormatInterface | null;
                    created_at: CommonSimplyTimeFormatInterface;
                }>;
            };
        };
    }>;
}

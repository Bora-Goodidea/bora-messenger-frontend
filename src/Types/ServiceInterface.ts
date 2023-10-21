import {
    BaseDataCodeStep1Item,
    BaseDataCodeStep2Item,
    CommonCodesItemInterface,
    CommonSimplyTimeFormatInterface,
    CommonUserInfoInterface,
} from '@CommonType';

// 기본 데이터 결과
export interface BaseDataResultInterface {
    code: {
        step1: Array<BaseDataCodeStep1Item>;
        step2: Array<BaseDataCodeStep2Item>;
    };
}

// 메시지 채팅 리스트 아이템
export interface MessengerChatListItemInterface {
    date: string;
    item: {
        location: `left` | `right`;
        chat_code: string;
        message_type: CommonCodesItemInterface;
        message: string;
        user: CommonUserInfoInterface;
        checked: `Y` | `N`;
        checked_at: CommonSimplyTimeFormatInterface | null;
        created_at: CommonSimplyTimeFormatInterface;
    };
}

// 채팅 리스트
export interface MessengerChatListInterface {
    messenger: {
        room_code: string;
        target: Array<CommonUserInfoInterface>;
        last: {
            last: boolean;
            message: string | null;
            profileImage: string | null;
            nickname: string | null;
            time: CommonSimplyTimeFormatInterface | null;
            uid: string | null;
        };
        created_at: CommonSimplyTimeFormatInterface;
    };
    chat: Array<MessengerChatListItemInterface>;
}

// 채팅방 리스트
export interface MessengerRoomListItemInterface {
    room_code: string;
    target: Array<CommonUserInfoInterface>;
    chart: {
        content: string;
        updated_at: CommonSimplyTimeFormatInterface | null;
    };
    created_at: CommonSimplyTimeFormatInterface;
    updated_at: CommonSimplyTimeFormatInterface;
}

// 채팅방 신규 메시지
export interface MessengerRoomNewMessage {
    roomCode: string;
    content: string;
    updated_at: CommonSimplyTimeFormatInterface;
}

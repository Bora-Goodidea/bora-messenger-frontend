import { Axios } from '@Commons';
import {
    ServicesResult,
    CommonSimplyTimeFormatInterface,
    CommonUserInfoInterface,
    CommonCodesItemInterface,
    MessageType,
} from '@CommonType';

export default {
    ServiceMessengerCreate: ({
        target,
    }: {
        target: Array<string>;
    }): Promise<
        ServicesResult<{
            room_code: string;
        }>
    > => {
        return Axios({
            method: 'post',
            url: `/api/messenger/messenger-create`,
            payload: {
                target: target,
            },
        });
    },
    ServiceMessengerRoomList: (): Promise<
        ServicesResult<
            Array<{
                room_code: string;
                target: Array<CommonUserInfoInterface>;
                chart: {
                    content: string;
                    updated_at: CommonSimplyTimeFormatInterface | null;
                };
                created_at: CommonSimplyTimeFormatInterface;
                updated_at: CommonSimplyTimeFormatInterface;
            }>
        >
    > => {
        return Axios({
            method: 'get',
            url: `/api/messenger/messenger-room-list`,
            payload: null,
        });
    },
    ServiceMessengerChatList: ({
        roomCode,
    }: {
        roomCode: string;
    }): Promise<
        ServicesResult<{
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
                created_at: CommonSimplyTimeFormatInterface;
            };
            chat: Array<{
                date: string;
                list: {
                    [index: string]: {
                        location: `left` | `right`;
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
        }>
    > => {
        return Axios({
            method: 'get',
            url: `/api/messenger/${roomCode}/chart-list`,
            payload: null,
        });
    },
    ServiceMessengerChartChecked: ({
        chart,
    }: {
        chart: Array<string>;
    }): Promise<
        ServicesResult<{
            chart_code: Array<string>;
        }>
    > => {
        return Axios({
            method: 'get',
            url: `/api/messenger/chart-checked`,
            payload: {
                chart: chart,
            },
        });
    },
    ServiceMessengerChartCreate: ({
        roomCode,
        messageType,
        messageContents,
    }: {
        roomCode: string;
        messageType: MessageType;
        messageContents: string;
    }): Promise<ServicesResult<null>> => {
        return Axios({
            method: 'post',
            url: `/api/messenger/${roomCode}/messenger-chat-create`,
            payload: {
                messageType: messageType,
                message: messageContents,
            },
        });
    },
};

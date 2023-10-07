import { Axios } from '@Commons';
import { ServicesResult, CommonSimplyTimeFormatInterface, CommonUserInfoInterface, CommonCodesItemInterface } from '@CommonType';

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
};

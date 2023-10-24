import { Axios } from '@Commons';
import { ServicesResult, MessageType } from '@CommonType';
import { MessengerChatListInterface, MessengerRoomListItemInterface } from '@ServiceInterface';

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
    ServiceMessengerRoomList: (): Promise<ServicesResult<Array<MessengerRoomListItemInterface>>> => {
        return Axios({
            method: 'get',
            url: `/api/messenger/messenger-user-room-list`,
            payload: null,
        });
    },
    ServiceMessengerChatList: ({ roomCode }: { roomCode: string }): Promise<ServicesResult<MessengerChatListInterface>> => {
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
            room: MessengerRoomListItemInterface;
        }>
    > => {
        return Axios({
            method: 'post',
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

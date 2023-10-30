import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { getAccessToken } from '@Helper';
import { MessengerRoomListItemInterface, MessengerChatListItemInterface, MessengerRoomNewMessage } from '@ServiceInterface';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MessengerChatListState, MessengerRoomListState, MessengerUserListState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import { MessengerUserListItemInterface } from '@RecoilInterface';
import { AtomRootState } from '@Recoil/AppRootState';

export default function useSockets() {
    const [roomBubbleState, setRoomBubbleState] = useState<{ roomCode: string; uid: string; state: boolean }>({
        roomCode: ``,
        uid: ``,
        state: false,
    });
    const [socketConnentState, setSocketConnentState] = useState<boolean>(false);
    const socketConnection = useRef<Socket>();
    const socketSendBubble = useRef<`start` | `end`>(`end`);
    const atomRootState = useRecoilValue(AtomRootState);
    const setMessengerRoomListState = useSetRecoilState(MessengerRoomListState);
    const setMessengerUserListState = useSetRecoilState(MessengerUserListState);
    const setMessengerChatListState = useSetRecoilState(MessengerChatListState);

    // 서버 연결
    const handleSocketConnent = () => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            return;
        }

        socketConnection.current = io(`${process.env.REACT_APP_API_URL}`, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                },
            },
        });
        setSocketConnentState(true);
    };

    // 연결 끊기
    const handleSocketDisconnect = () => {
        if (socketConnection.current) {
            console.debug('disconnect');
            socketConnection.current.disconnect();
        }
    };

    // 채팅방 입장.
    const handleJoinRoom = ({ roomCode }: { roomCode: string }) => {
        if (socketConnection.current && socketConnection.current.connected) {
            socketConnection.current.emit('join-room', {
                sid: roomCode,
            });
        }
    };

    // 채팅방 생성
    const handleCreateRoom = ({ roomCode }: { roomCode: string }) => {
        if (socketConnection.current && socketConnection.current.connected) {
            socketConnection.current.emit('create-room', {
                room_code: `${roomCode}`,
            });
        }
    };

    // 방 메시지 전송
    const handleRoomSendMessage = ({ roomCode, type, message }: { roomCode: string; type: string; message: string }) => {
        if (socketConnection.current && socketConnection.current.connected) {
            socketConnection.current.emit('room-send-message', {
                room_code: roomCode,
                type: `${type}`,
                contents: `${message}`,
            });
        }
    };

    // 메시지 타이핑 시작, 종료 이벤트
    const hdnaleSendBubble = ({ roomCode, state }: { roomCode: string; state: `start` | `end` }) => {
        if (socketSendBubble.current === state) {
            return;
        }
        socketSendBubble.current = state;
        if (socketConnection.current && socketConnection.current.connected) {
            if (state === `start`) {
                socketConnection.current.emit('send-bubble-start', {
                    room_code: roomCode,
                });

                return;
            }

            if (state === `end`) {
                socketConnection.current.emit('send-bubble-end', {
                    room_code: roomCode,
                });

                return;
            }
        }
    };

    useEffect(() => {
        if (socketConnentState && socketConnection.current) {
            // 방초대 이벤트
            socketConnection.current.on('invite-room', (payload: MessengerRoomListItemInterface) => {
                setMessengerRoomListState(prevState => ({
                    ...prevState,
                    rooms: lodash.concat(prevState.rooms, payload),
                }));
            });

            // 사용자 접속 이벤트 || 접종
            socketConnection.current.on('active-user', (payload: MessengerUserListItemInterface) => {
                setMessengerUserListState(prevState => ({
                    ...prevState,
                    users: (() => {
                        const findUser = lodash.find(prevState.users, { uid: payload.uid });
                        if (findUser) {
                            return lodash.map(prevState.users, e => {
                                if (e.uid === payload.uid) {
                                    return payload;
                                } else {
                                    return e;
                                }
                            });
                        } else {
                            return [...prevState.users, payload];
                        }
                    })(),
                }));
            });

            // 신규 메시지
            socketConnection.current.on('new-message', (payload: MessengerChatListItemInterface) => {
                setMessengerChatListState(prevState => ({
                    ...prevState,
                    loading: false,
                    resultData: {
                        ...prevState.resultData,
                        chat: lodash.concat(prevState.resultData.chat, {
                            ...payload,
                            item: {
                                ...payload.item,
                                checked: payload.item.user.uid === atomRootState.uid ? 'Y' : 'N',
                            },
                        }),
                    },
                }));
            });

            // 메시지 타이핑? 시작 이벤트
            socketConnection.current.on('room-bubble-start', (payload: { roomCode: string; uid: string }) => {
                setRoomBubbleState({ roomCode: payload.roomCode, uid: payload.uid, state: true });
            });

            // 메시지 타이핑? 종료 이벤트
            socketConnection.current.on('room-bubble-end', (payload: { roomCode: string; uid: string }) => {
                setRoomBubbleState({ roomCode: payload.roomCode, uid: payload.uid, state: false });
            });

            // 채팅방 신규 메시지
            socketConnection.current.on('room-new-message', (payload: MessengerRoomNewMessage) => {
                setMessengerRoomListState(prevState => ({
                    ...prevState,
                    rooms: (() => {
                        const findRoom = lodash.find(prevState.rooms, { room_code: payload.roomCode });

                        if (findRoom) {
                            return lodash.map(prevState.rooms, e => {
                                if (e.room_code === payload.roomCode) {
                                    return {
                                        ...e,
                                        checked: 'N',
                                        chart: {
                                            content: payload.content,
                                            type: payload.type,
                                            updated_at: payload.updated_at,
                                        },
                                    };
                                } else {
                                    return e;
                                }
                            });
                        } else {
                            return prevState.rooms;
                        }
                    })(),
                }));
            });
        }
        // FIXME : 종속성에서 connent 업데이트시 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketConnentState]);

    return {
        socketConnentState,
        socketConnection,
        handleJoinRoom,
        handleCreateRoom,
        handleSocketConnent,
        handleSocketDisconnect,
        handleRoomSendMessage,
        hdnaleSendBubble,
        roomBubbleState,
        socketSendBubble,
    };
}

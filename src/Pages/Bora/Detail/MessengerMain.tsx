import React, { useCallback, useEffect, useState } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { UserService, MessengerService } from '@Modules';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { MessengerUserListState, MessengerRoomListState, MessengerChatListState, MessengerChatCreateState } from '@Recoil/MessengerState';
import { useParams } from 'react-router-dom';
import Messages from '@Messages';
import { useLayout } from '@Hooks';
import { socketConnect } from '@Common/Socket';
import { MessengerChatListItemInterface, MessengerRoomListItemInterface, MessengerRoomNewMessage } from '@ServiceInterface';
import lodash from 'lodash';
import { MessengerUserListItemInterface } from '@RecoilInterface';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const { ServiceUserList } = UserService;
const { ServiceMessengerRoomList, ServiceMessengerChatList, ServiceMessengerCreate } = MessengerService;

const pageInitializeState = {
    createLoading: false,
};

const MessengerMain = () => {
    const { roomCode } = useParams<{ roomCode?: string }>();
    const { HandleMainAlert } = useLayout();
    const setMessengerUserListState = useSetRecoilState(MessengerUserListState);
    const resetMessengerUserListState = useResetRecoilState(MessengerUserListState);
    const setMessengerRoomListState = useSetRecoilState(MessengerRoomListState);
    const resetMessengerRoomListState = useResetRecoilState(MessengerUserListState);
    const setMessengerChatListState = useSetRecoilState(MessengerChatListState);
    const resetMessengerChatListState = useResetRecoilState(MessengerChatListState);
    const messengerChatCreateState = useRecoilValue(MessengerChatCreateState);
    const resetMessengerChatCretaeState = useResetRecoilState(MessengerChatCreateState);

    const [pageState, setPageState] = useState<{ createLoading: boolean }>(pageInitializeState);

    // 현재 사용자 리스트
    const handleGetUserList = useCallback(
        async ({ loading }: { loading: boolean }) => {
            setMessengerUserListState(prevState => ({
                ...prevState,
                loading: loading,
            }));
            const { status, payload } = await ServiceUserList();
            if (status) {
                setMessengerUserListState(prevState => ({
                    ...prevState,
                    loading: false,
                    users: payload,
                }));
            } else {
                resetMessengerUserListState();
            }
        },
        [resetMessengerUserListState, setMessengerUserListState]
    );

    // 내 채팅방 리스트
    const handleGetMessengerRoomList = useCallback(async () => {
        setMessengerRoomListState(prevState => ({
            ...prevState,
            loading: true,
        }));
        const { status, payload } = await ServiceMessengerRoomList();
        if (status) {
            setMessengerRoomListState(prevState => ({
                ...prevState,
                loading: false,
                rooms: payload,
            }));
        } else {
            resetMessengerRoomListState();
        }
    }, [resetMessengerRoomListState, setMessengerRoomListState]);

    // 메신저 대화 내용 조회
    const handleGetMessengerChatList = useCallback(
        async (code: string) => {
            setMessengerChatListState(prevState => ({
                ...prevState,
                loading: true,
            }));

            const { status, payload, message } = await ServiceMessengerChatList({ roomCode: code });
            if (status) {
                setMessengerChatListState(prevState => ({
                    ...prevState,
                    loading: false,
                    resultData: payload,
                }));

                socketConnect.emit('client-request', {
                    name: `join-room`,
                    room_code: `${code}`,
                });
            } else {
                resetMessengerChatListState();
                HandleMainAlert({
                    state: true,
                    type: `move`,
                    message: message,
                    action: `/bora/messenger`,
                });
            }
        },
        [HandleMainAlert, resetMessengerChatListState, setMessengerChatListState]
    );

    // 채팅 방생성
    const handleMessengerCreate = async (uid: Array<string>) => {
        if (uid.length === 0) {
            HandleMainAlert({
                state: true,
                message: Messages.Common.emptySelectUser,
            });
            return;
        }
        setPageState(prevState => ({
            ...prevState,
            createLoading: true,
        }));

        const { status, payload, message } = await ServiceMessengerCreate({ target: uid });
        if (status) {
            socketConnect.emit('create-room', {
                room_code: `${payload.room_code}`,
            });

            handleGetMessengerRoomList().then();

            HandleMainAlert({
                state: true,
                type: `move`,
                message: Messages.Common.successCreateRoom,
                action: `/bora/${payload.room_code}/messenger`,
            });

            setPageState(prevState => ({
                ...prevState,
                createLoading: false,
            }));
        } else {
            HandleMainAlert({
                state: true,
                message: message,
            });

            setPageState(prevState => ({
                ...prevState,
                createLoading: false,
            }));
        }
    };

    // 메시지 등록
    const HandleSendMessage = async () => {
        const {
            message: { contents, type },
        } = messengerChatCreateState;

        if (contents === '') {
            HandleMainAlert({
                state: true,
                message: Messages.Common.emptyContents,
            });

            return;
        }

        socketConnect.emit('room-send-message', {
            room_code: roomCode,
            type: `${type}`,
            contents: `${contents}`,
        });
        resetMessengerChatCretaeState();
        return;
    };

    useEffect(() => {
        if (roomCode) {
            handleGetMessengerChatList(roomCode).then();
            socketConnect.emit('join-room', {
                sid: roomCode,
            });
        }
        // FIXME : 종속성에서 handleGetMessengerChatList 업데이트시 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    useEffect(() => {
        handleGetUserList({ loading: true }).then(() => handleGetMessengerRoomList().then());
    }, [handleGetMessengerRoomList, handleGetUserList]);

    useEffect(() => {
        socketConnect.on('connect', () => {
            console.debug('connect');
        });

        socketConnect.on('welcome', payload => {
            console.debug(payload);
        });

        socketConnect.on('invite-room', (payload: MessengerRoomListItemInterface) => {
            setMessengerRoomListState(prevState => ({
                ...prevState,
                rooms: lodash.concat(prevState.rooms, payload),
            }));
        });

        socketConnect.on('active-user', (payload: MessengerUserListItemInterface) => {
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

        socketConnect.on('new-message', (payload: MessengerChatListItemInterface) => {
            setMessengerChatListState(prevState => ({
                ...prevState,
                loading: false,
                resultData: {
                    ...prevState.resultData,
                    chat: lodash.concat(prevState.resultData.chat, payload),
                },
            }));
        });

        socketConnect.on('room-new-message', (payload: MessengerRoomNewMessage) => {
            setMessengerRoomListState(prevState => ({
                ...prevState,
                rooms: (() => {
                    const findRoom = lodash.find(prevState.rooms, { room_code: payload.roomCode });

                    if (findRoom) {
                        return lodash.map(prevState.rooms, e => {
                            if (e.room_code === payload.roomCode) {
                                return {
                                    ...e,
                                    chart: {
                                        content: payload.content,
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

        socketConnect.on('client-error', (payload: { message: string }) => {
            HandleMainAlert({
                state: true,
                message: payload.message,
            });
        });

        return () => {
            console.debug('clean');
            socketConnect.off('connect', () => {
                console.debug('clean : connect');
            });
            socketConnect.off('disconnect', () => {
                console.debug('clean : disconnect');
            });
            socketConnect.off('message', message => {
                console.debug('clean message: ', message);
            });

            socketConnect.off('room-message', payload => {
                console.debug('room-message', payload);
            });

            socketConnect.disconnect();
        };
        // FIXME : 종속성에서 업데이트시 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <LeftContainer>
                <HeaderBox>
                    <HeaderSection MessengerCreate={uid => handleMessengerCreate(uid)} />
                </HeaderBox>
                <SearchBox>
                    <SearchSection />
                </SearchBox>
                <ActiveUsersBox>
                    <ActiveUsersSection CreateLoading={pageState.createLoading} MessengerCreate={uid => handleMessengerCreate(uid)} />
                </ActiveUsersBox>
                <ContactsBox>
                    <ContactsSection />
                </ContactsBox>
            </LeftContainer>
            <RightContainer>
                <MessageSection HandleSendMessage={() => HandleSendMessage()} />
            </RightContainer>
        </>
    );
};

export default MessengerMain;

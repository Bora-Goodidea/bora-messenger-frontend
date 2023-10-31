import React, { useCallback, useEffect, useState } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { UserService, MessengerService } from '@Modules';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { MessengerUserListState, MessengerRoomListState, MessengerChatListState, MessengerChatCreateState } from '@Recoil/MessengerState';
import { useParams } from 'react-router-dom';
import Messages from '@Messages';
import { useLayout, useSockets } from '@Hooks';
import lodash from 'lodash';
import { gmtTimeToTimeObject } from '@Helper';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const { ServiceUserList } = UserService;
const { ServiceMessengerRoomList, ServiceMessengerChatList, ServiceMessengerCreate } = MessengerService;

const pageInitializeState = {
    createLoading: false,
};

const MessengerMain = () => {
    const { roomCode } = useParams<{ roomCode?: string }>();
    const { HandleMainAlert } = useLayout();
    const {
        handleSocketConnent,
        handleSocketDisconnect,
        handleJoinRoom,
        handleCreateRoom,
        handleRoomSendMessage,
        socketConnentState,
        hdnaleSendBubble,
        roomBubbleState,
    } = useSockets();
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
            handleCreateRoom({ roomCode: payload.room_code });

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

        if (roomCode) {
            handleRoomSendMessage({ roomCode: roomCode, type: type, message: contents });

            // 내가 보낸 메시지는 수동으로 왼쪽 방 리스트목록의 마지막 대화를 업데이트 한다.
            const { year, monthPad, dayPad, hourPad, minutePad, secondPad, week } = gmtTimeToTimeObject(new Date());
            setMessengerRoomListState(prevState => ({
                ...prevState,
                rooms: lodash.map(prevState.rooms, e => {
                    if (e.room_code === roomCode) {
                        return {
                            ...e,
                            checked: 'Y',
                            chart: {
                                ...e.chart,
                                content: contents,
                                type: type,
                                updated_at: {
                                    ...e.chart.updated_at,
                                    sinceString: `방금 전`,
                                    format: {
                                        step1: `${year}년 ${monthPad}월 ${dayPad}일 ${week}요일`,
                                        step2: `${year}년 ${monthPad}월 ${dayPad}일 ${week}요일 ${hourPad}시 ${minutePad}분`,
                                        step3: `${year}년 ${monthPad}월 ${dayPad}일 ${week}요일 ${hourPad}시 ${minutePad}분 ${secondPad}초`,
                                    },
                                },
                            },
                        };
                    }

                    return e;
                }),
            }));

            setMessengerChatListState(prevState => ({
                ...prevState,
                resultData: (() => {
                    return {
                        ...prevState.resultData,
                        messenger: {
                            ...prevState.resultData.messenger,
                            last: {
                                ...prevState.resultData.messenger.last,
                                time: (() => {
                                    return {
                                        sinceString: `방금 전`,
                                        format: {
                                            step1: `${year}년 ${monthPad}월 ${dayPad}일 ${week}요일`,
                                            step2: `${year}년 ${monthPad}월 ${dayPad}일 ${week}요일 ${hourPad}시 ${minutePad}분`,
                                            step3: `${year}년 ${monthPad}월 ${dayPad}일 ${week}요일 ${hourPad}시 ${minutePad}분 ${secondPad}초`,
                                        },
                                    };
                                })(),
                            },
                        },
                    };
                })(),
            }));
        }

        resetMessengerChatCretaeState();
        return;
    };

    const HandleSendBubble = ({ state }: { state: `start` | `end` }) => {
        if (roomCode) {
            if (state === `start`) {
                hdnaleSendBubble({ roomCode: roomCode, state: `start` });
                return;
            }

            if (state === `end`) {
                hdnaleSendBubble({ roomCode: roomCode, state: `end` });
                return;
            }
        }

        return;
    };

    useEffect(() => {
        handleGetUserList({ loading: true }).then(() => handleGetMessengerRoomList().then());
    }, [handleGetMessengerRoomList, handleGetUserList]);

    useEffect(() => {
        if (socketConnentState && roomCode) {
            handleGetMessengerChatList(roomCode).then(() => handleJoinRoom({ roomCode: roomCode }));
        }
        // FIXME : 종속성에서 handleJoinRoom 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketConnentState, roomCode]);

    useEffect(() => {
        handleSocketConnent();

        return () => {
            handleSocketDisconnect();
        };

        // FIXME : 종속성에서 handleSocketConnent 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <LeftContainer>
                <HeaderBox>
                    <HeaderSection MessengerCreate={uid => handleMessengerCreate(uid)} ResetMessenger={resetMessengerChatListState} />
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
                {roomCode && (
                    <MessageSection
                        RoomCode={roomCode}
                        HandleSendMessage={() => HandleSendMessage()}
                        HandleBubble={e => HandleSendBubble(e)}
                        StateBubble={roomBubbleState.state}
                    />
                )}
            </RightContainer>
        </>
    );
};

export default MessengerMain;

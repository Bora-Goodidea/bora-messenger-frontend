import React, { useCallback, useEffect, useState } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { UserService, MessengerService } from '@Modules';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { MessengerUserListState, MessengerRoomListState, MessengerChatListState, MessengerChatCreateState } from '@Recoil/MessengerState';
import { useParams } from 'react-router-dom';
import Messages from '@Messages';
import { useLayout, useSockets } from '@Hooks';

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
                <MessageSection
                    HandleSendMessage={() => HandleSendMessage()}
                    HandleBubble={e => HandleSendBubble(e)}
                    StateBubble={roomBubbleState.state}
                />
            </RightContainer>
        </>
    );
};

export default MessengerMain;

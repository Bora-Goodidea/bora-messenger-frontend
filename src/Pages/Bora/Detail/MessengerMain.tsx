import React, { useCallback, useEffect, useState } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { UserService, MessengerService } from '@Modules';
import { useSetRecoilState, useResetRecoilState, useRecoilState } from 'recoil';
import { MessengerUserListState, MessengerRoomListState, MessengerChatListState, MessengerChatCretaeState } from '@Recoil/MessengerState';
import { useParams } from 'react-router-dom';
import Messages from '@Messages';
import { useLayout } from '@Hooks';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const { ServiceUserList } = UserService;
const { ServiceMessengerRoomList, ServiceMessengerChatList, ServiceMessengerCreate, ServiceMessengerChartCreate } = MessengerService;

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
    const [messengerChatCretaeState, setMessengerChatCretaeState] = useRecoilState(MessengerChatCretaeState);
    const resetMessengerChatCretaeState = useResetRecoilState(MessengerChatCretaeState);

    const [pageState, setPageState] = useState<{ createLoading: boolean }>(pageInitializeState);

    // 현재 사용자 리스트
    const handleGetUserList = useCallback(async () => {
        setMessengerUserListState(prevState => ({
            ...prevState,
            loading: true,
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
    }, [resetMessengerUserListState, setMessengerUserListState]);

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

    const handleGetMessengerChatList = useCallback(
        async (code: string) => {
            setMessengerChatListState(prevState => ({
                ...prevState,
                loading: true,
            }));

            const { status, payload } = await ServiceMessengerChatList({ roomCode: code });
            if (status) {
                setMessengerChatListState(prevState => ({
                    ...prevState,
                    loading: false,
                    messenger: {
                        room_code: payload.messenger.room_code,
                        target: payload.messenger.target,
                        last: payload.messenger.last,
                        created_at: payload.messenger.created_at,
                    },
                    last: payload.messenger.last,
                    chats: payload.chat,
                }));
            } else {
                resetMessengerChatListState();
            }
        },
        [resetMessengerChatListState, setMessengerChatListState]
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
        } = messengerChatCretaeState;

        if (contents === '') {
            HandleMainAlert({
                state: true,
                message: Messages.Common.emptyContents,
            });

            return;
        }

        if (roomCode) {
            setMessengerChatCretaeState(prevState => ({
                ...prevState,
                loading: true,
            }));
            const { status } = await ServiceMessengerChartCreate({
                roomCode: roomCode,
                messageType: type,
                messageContents: contents,
            });
            if (status) {
                handleGetMessengerChatList(roomCode).then(() => resetMessengerChatCretaeState());
            } else {
                HandleMainAlert({
                    state: true,
                    message: Messages.Common.unknownError,
                });
            }

            setMessengerChatCretaeState(prevState => ({
                ...prevState,
                loading: false,
            }));

            return;
        }

        HandleMainAlert({
            state: true,
            message: Messages.Common.unknownError,
        });

        return;
    };

    useEffect(() => {
        if (roomCode) {
            handleGetMessengerChatList(roomCode).then();
        }
    }, [handleGetMessengerChatList, roomCode]);

    useEffect(() => {
        handleGetUserList().then(() => handleGetMessengerRoomList().then());
    }, [handleGetMessengerRoomList, handleGetUserList]);

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

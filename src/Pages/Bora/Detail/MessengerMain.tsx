import React, { useCallback, useEffect } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { UserService, MessengerService } from '@Modules';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { MessengerUserListState, MessengerRoomListState, MessengerChatListState } from '@Recoil/MessengerState';
import { useParams } from 'react-router-dom';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const { ServiceUserList } = UserService;
const { ServiceMessengerRoomList, ServiceMessengerChatList } = MessengerService;

const MessengerMain = () => {
    const { roomCode } = useParams<{ roomCode?: string }>();
    const setMessengerUserListState = useSetRecoilState(MessengerUserListState);
    const resetMessengerUserListState = useResetRecoilState(MessengerUserListState);
    const setMessengerRoomListState = useSetRecoilState(MessengerRoomListState);
    const resetMessengerRoomListState = useResetRecoilState(MessengerUserListState);
    const setMessengerChatListState = useSetRecoilState(MessengerChatListState);
    const resetMessengerChatListState = useResetRecoilState(MessengerChatListState);

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
                    messenger: payload.messenger,
                    chats: payload.chat,
                }));
            } else {
                resetMessengerChatListState();
            }
        },
        [resetMessengerChatListState, setMessengerChatListState]
    );

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
                    <HeaderSection />
                </HeaderBox>
                <SearchBox>
                    <SearchSection />
                </SearchBox>
                <ActiveUsersBox>
                    <ActiveUsersSection />
                </ActiveUsersBox>
                <ContactsBox>
                    <ContactsSection />
                </ContactsBox>
            </LeftContainer>
            <RightContainer>
                <MessageSection />
            </RightContainer>
        </>
    );
};

export default MessengerMain;

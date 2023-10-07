import React, { useCallback } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { useEffect } from 'react';
import { UserService, MessengerService } from '@Modules';
import { useSetRecoilState } from 'recoil';
import { MessengerUserListState, MessengerRoomListState } from '@Recoil/MessengerState';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const { ServiceUserList } = UserService;
const { ServiceMessengerRoomList } = MessengerService;

const MessengerMain = () => {
    const setMessengerUserListState = useSetRecoilState(MessengerUserListState);
    const setMessengerRoomListState = useSetRecoilState(MessengerRoomListState);

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
            setMessengerUserListState(prevState => ({
                ...prevState,
                loading: false,
                users: [],
            }));
        }
    }, [setMessengerUserListState]);

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
            setMessengerRoomListState(prevState => ({
                ...prevState,
                loading: false,
                rooms: [],
            }));
        }
    }, [setMessengerRoomListState]);

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

import React, { useCallback } from 'react';
import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';
import { useEffect } from 'react';
import { UserService } from '@Modules';
import { useSetRecoilState } from 'recoil';
import { MessengerUserListState } from '@Recoil/MessengerState';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const { ServiceUserList } = UserService;

const MessengerMain = () => {
    const setMessengerUserListState = useSetRecoilState(MessengerUserListState);

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
            }));
        }
        setMessengerUserListState(prevState => ({
            ...prevState,
            loading: false,
        }));
    }, [setMessengerUserListState]);

    useEffect(() => {
        handleGetUserList().then();
    }, [handleGetUserList]);

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

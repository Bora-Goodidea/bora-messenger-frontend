import { HeaderPart, ActiveUsersPart, SearchPart, ContactsPart, MessagePart } from '.';
import { MessengerStyles } from '@Styles';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = MessengerStyles.Container;

const MainContainer = () => {
    return (
        <>
            <LeftContainer>
                <HeaderBox>
                    <HeaderPart />
                </HeaderBox>
                <SearchBox>
                    <SearchPart />
                </SearchBox>
                <ActiveUsersBox>
                    <ActiveUsersPart />
                </ActiveUsersBox>
                <ContactsBox>
                    <ContactsPart />
                </ContactsBox>
            </LeftContainer>
            <RightContainer>
                <MessagePart />
            </RightContainer>
        </>
    );
};

export default MainContainer;

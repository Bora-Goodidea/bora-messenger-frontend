import { HeaderSection, ActiveUsersSection, SearchSection, ContactsSection, MessageSection } from '.';
import { PageStyles } from '@Styles';

const { LeftContainer, RightContainer, ActiveUsersBox, HeaderBox, SearchBox, ContactsBox } = PageStyles.Bora.MessengerStyles.Container;

const MessengerMain = () => {
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

import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { PageStyles } from '@Styles';

const {
    Wapper,
    AvatarBox,
    AvatarImage,
    AvatarActive,
    AvatarActiveMark,
    MessageWapper,
    MessageName,
    MessageBox,
    Message,
    MessageTime,
    MessageMin,
} = PageStyles.Bora.MessengerStyles.ContactsSection;

const ContactsSection = () => {
    return (
        <>
            {lodash.map(TemporaryData.Contacts, (c, index) => {
                return (
                    <Wapper SelectStyle={c.select} key={`contacts-section-item-${index}`}>
                        <AvatarBox>
                            <AvatarImage src={`${c.profileImage}`} alt="" />
                            {c.now && (
                                <AvatarActive>
                                    <AvatarActiveMark />
                                </AvatarActive>
                            )}
                        </AvatarBox>
                        <MessageWapper>
                            <MessageName>{`${c.name}`}</MessageName>
                            <MessageBox>
                                <MessageMin>
                                    <Message>{`${c.message}`}</Message>
                                </MessageMin>
                            </MessageBox>
                            <MessageTime>{`${c.time}`}</MessageTime>
                        </MessageWapper>
                    </Wapper>
                );
            })}
        </>
    );
};

export default ContactsSection;

import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { MessengerStyles } from '@Styles';

const { Wapper, AvatarBox, AvatarImage, AvatarActive, AvatarActiveMark, MessageWapper, MessageName, MessageBox, Message, MessageTime } =
    MessengerStyles.ContactsPart;

const ContactsPart = () => {
    return (
        <>
            {lodash.map(TemporaryData.Contacts, (c, index) => {
                return (
                    <Wapper SelectStyle={c.select} key={`contacts-part-item-${index}`}>
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
                                <div className="min-w-0">
                                    <Message>{`${c.message}`}</Message>
                                </div>
                            </MessageBox>
                            <MessageTime>{`${c.time}`}</MessageTime>
                        </MessageWapper>
                    </Wapper>
                );
            })}
        </>
    );
};

export default ContactsPart;

import lodash from 'lodash';
import MessageItem from './MessageItem';
import { ElementStyles } from '@Styles';
import { LocationStyleType } from '@CommonType';
import { BoraAvatar } from '@Elements';

const { Container, MessageWapper, MessageTextItemWapper } = ElementStyles.MessageStyle.MessageBox;

const MessageBox = ({
    MessageLocation,
    ProfileImage,
    MessageList,
}: {
    MessageLocation: LocationStyleType;
    ProfileImage: string | null;
    MessageList: Array<{ type: string | `text` | `image`; message: string }>;
}) => {
    return (
        <Container LocationStyle={MessageLocation}>
            {MessageLocation === `left` && ProfileImage && (
                <BoraAvatar AvatarUrl={ProfileImage} AvataAltString={``} AvatarShadow={true} AvatarSize={`small`} />
            )}
            <MessageWapper LocationStyle={MessageLocation}>
                {lodash.map(MessageList, (m, index, mList) => {
                    return (
                        <MessageTextItemWapper key={`message-box-message-item-${index}`} LocationStyle={MessageLocation}>
                            <MessageItem
                                MessageLocation={MessageLocation}
                                Message={m.message}
                                MessageType={m.type}
                                MessageStyle={
                                    mList.length === 1 ? 'middle' : index === 0 ? `first` : index === mList.length - 1 ? `last` : `middle`
                                }
                            />
                        </MessageTextItemWapper>
                    );
                })}
            </MessageWapper>
        </Container>
    );
};

export default MessageBox;

import { BoraAvatar } from '@Elements';
import { MessageInfoIcon } from '@Icons';
import { ElementStyles } from '@Styles';

const { Wapper, TextWapper, Name, Time, IconWapper } = ElementStyles.MessageStyle.MessageHeader;

const MessageHeader = () => {
    return (
        <>
            <Wapper>
                <BoraAvatar
                    AvatarUrl={`https://randomuser.me/api/portraits/women/33.jpg`}
                    AvataAltString={`Scarlett Johansson`}
                    AvatarShadow={true}
                    AvatarSize={`middle`}
                />
                <TextWapper>
                    <Name>{`Scarlett Johansson`}</Name>
                    <Time>{`Active 1h ago`}</Time>
                </TextWapper>
            </Wapper>

            <Wapper>
                <IconWapper>
                    <MessageInfoIcon />
                </IconWapper>
            </Wapper>
        </>
    );
};

export default MessageHeader;

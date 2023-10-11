import { BoraAvatar } from '@Elements';
import { MessageInfoIcon } from '@Icons';
import { ElementStyles } from '@Styles';

const { Wapper, TextWapper, Name: NameStyle, Time: TimeStyle, IconWapper } = ElementStyles.MessageStyle.MessageHeader;

const MessageHeader = ({
    Params,
}: {
    Params: {
        AvatarImage: Array<{
            alt: string;
            url: string;
        }>;
        Name: string;
        Date: string;
    };
}) => {
    return (
        <>
            <Wapper>
                <BoraAvatar AvatarImage={Params.AvatarImage} AvatarShadow={true} AvatarSize={`middle`} />
                <TextWapper>
                    <NameStyle>{Params.Name}</NameStyle>
                    <TimeStyle>{Params.Date}</TimeStyle>
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

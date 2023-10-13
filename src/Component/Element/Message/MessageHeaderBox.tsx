import { BoraAvatar } from '@Elements';
import { MessageInfoIcon } from '@Icons';
import { ElementStyles } from '@Styles';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    return (
        <>
            <Wapper onClick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/bora/profile` })}>
                <BoraAvatar AvatarImage={Params.AvatarImage} AvatarShadow={true} AvatarSize={`middle`}></BoraAvatar>
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

import { BoraButton, BoraInput } from '@Elements';
import { MessagePictureIcon, MessageCameraIcon, MessageEmojiIcon, MessageSendIcon } from '@Icons';
import { ElementStyles } from '@Styles';

const { Container, InputBox, InputWapper } = ElementStyles.MessageStyle.MessageFooterBox;

const MessageFooterBox = () => {
    return (
        <>
            <Container>
                <BoraButton ButtonType={`MessageInputButton`} ButtonChildren={<MessagePictureIcon />} />
                <BoraButton ButtonType={`MessageInputButton`} ButtonChildren={<MessageCameraIcon />} />
                <InputBox>
                    <InputWapper>
                        <BoraInput StyleType={`send`} InputType={`text`} InputValue="" Placeholder="Aa" />
                        <BoraButton ButtonType={`MessageInInputButton`} ButtonChildren={<MessageEmojiIcon />} />
                    </InputWapper>
                </InputBox>
                <BoraButton ButtonType={`MessageInputButton`} ButtonChildren={<MessageSendIcon />} />
            </Container>
        </>
    );
};

export default MessageFooterBox;

import { ChangeEvent, KeyboardEvent, useRef } from 'react';
import { BoraButton, BoraInput } from '@Elements';
import { MessagePictureIcon, MessageEmojiIcon, MessageSendIcon } from '@Icons';
import { ElementStyles } from '@Styles';
import { useRecoilState } from 'recoil';
import { MessengerChatCretaeState } from '@Recoil/MessengerState';
import { MessageType } from '@CommonType';
import { ProfileService } from '@Modules';
import { useLayout } from '@Hooks';

const { Container, InputBox, InputWapper } = ElementStyles.MessageStyle.MessageFooterBox;
const { ImageCreate } = ProfileService;

const MessageFooterBox = ({ HandleSendMessage }: { HandleSendMessage: () => void }) => {
    const [messengerChatCretaeState, setMessengerChatCretaeState] = useRecoilState(MessengerChatCretaeState);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const { HandleMainAlert } = useLayout();

    const handleMessageRecoilState = ({ type, message }: { type: MessageType; message: string }) => {
        setMessengerChatCretaeState(prevState => ({
            ...prevState,
            message: {
                ...prevState.message,
                type: type,
                contents: message,
            },
        }));
    };

    const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        handleMessageRecoilState({ type: `040010`, message: e.target.value });
    };

    const handleClickPuctureButton = () => {
        (hiddenFileInput.current as HTMLInputElement).click();
    };

    const handlePictureOnchange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectFiles = e.target.files as FileList;

        if (selectFiles.length > 0) {
            const formData = new FormData();
            formData.append('image', selectFiles[0]);
            const { status, payload, message } = await ImageCreate(formData);

            if (status) {
                handleMessageRecoilState({ type: `040020`, message: payload.media_url });
            } else {
                HandleMainAlert({
                    state: true,
                    message: message,
                });
                return;
            }
        }
    };

    const HandleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        HandleSendMessage();
    };

    return (
        <>
            <Container>
                <BoraButton
                    ButtonType={`MessageInputButton`}
                    ButtonChildren={<MessagePictureIcon />}
                    HandleOnClick={() => handleClickPuctureButton()}
                />
                <InputBox>
                    <InputWapper>
                        <BoraInput
                            StyleType={`send`}
                            InputType={`text`}
                            InputValue={messengerChatCretaeState.message.contents}
                            Placeholder="Aa"
                            OnChange={e => handleInputOnchange(e)}
                            HandleOnKeyDown={e => HandleOnKeyDown(e)}
                        />
                        <input type="file" onChange={e => handlePictureOnchange(e)} ref={hiddenFileInput} className="hidden" />
                        <BoraButton ButtonType={`MessageInInputButton`} ButtonChildren={<MessageEmojiIcon />} />
                    </InputWapper>
                </InputBox>
                <BoraButton
                    ButtonType={`MessageInputButton`}
                    ButtonChildren={<MessageSendIcon />}
                    HandleOnClick={() => HandleSendMessage()}
                />
            </Container>
        </>
    );
};

export default MessageFooterBox;

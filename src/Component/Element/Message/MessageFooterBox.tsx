import { BoraButton } from '@Elements';
import { MessagePictureIcon, MessageCameraIcon, MessageEmojiIcon, MessageSendIcon } from '@Icons';

const MessageFooterBox = () => {
    return (
        <>
            <div className="flex flex-row items-center p-4">
                <BoraButton ButtonType={`MessageInputButton`} ButtonChildren={<MessagePictureIcon />} />
                <BoraButton ButtonType={`MessageInputButton`} ButtonChildren={<MessageCameraIcon />} />
                <div className="relative flex-grow">
                    <label>
                        <input
                            className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in"
                            type="text"
                            value=""
                            placeholder="Aa"
                            onChange={() => console.debug('onChange')}
                        />
                        <BoraButton ButtonType={`MessageInInputButton`} ButtonChildren={<MessageEmojiIcon />} />
                    </label>
                </div>
                <BoraButton ButtonType={`MessageInputButton`} ButtonChildren={<MessageSendIcon />} />
            </div>
        </>
    );
};

export default MessageFooterBox;

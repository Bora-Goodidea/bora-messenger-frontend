import { MessageAvatar } from '@Elements';
import { MessageInfoIcon } from '@Icons';

const MessageHeader = () => {
    return (
        <>
            <div className="flex">
                <MessageAvatar
                    AvatarUrl={`https://randomuser.me/api/portraits/women/33.jpg`}
                    AvataAltString={`Scarlett Johansson`}
                    AvatarName={`Scarlett Johansson`}
                    MessageTime={`Active 1h ago`}
                />
            </div>

            <div className="flex">
                <div className="block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2 ml-4">
                    <MessageInfoIcon />
                </div>
            </div>
        </>
    );
};

export default MessageHeader;

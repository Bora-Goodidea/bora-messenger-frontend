import { BoraAvatar } from '@Elements';
import { MessageInfoIcon } from '@Icons';

const MessageHeader = () => {
    return (
        <>
            <div className="flex">
                <BoraAvatar
                    AvatarUrl={`https://randomuser.me/api/portraits/women/33.jpg`}
                    AvataAltString={`Scarlett Johansson`}
                    AvatarShadow={true}
                    SmallSize={true}
                />
                <div className="text-sm">
                    <p className="font-bold">{`Scarlett Johansson`}</p>
                    <p>{`Active 1h ago`}</p>
                </div>
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

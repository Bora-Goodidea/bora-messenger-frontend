import { MessageHeaderBox, MessageBox, MessageFooterBox } from '@Elements';

const MessagePart = () => {
    return (
        <>
            <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <MessageHeaderBox />
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                <MessageBox />
            </div>
            <div className="chat-footer flex-none">
                <MessageFooterBox />
            </div>
        </>
    );
};

export default MessagePart;

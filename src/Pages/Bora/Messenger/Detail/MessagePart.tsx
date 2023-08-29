import React from 'react';
import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { MessageHeaderBox, MessageBox, MessageFooterBox } from '@Elements';

const MessagePart = () => {
    return (
        <>
            <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <MessageHeaderBox />
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                {lodash.map(TemporaryData.Messages, (message, dateIndex) => {
                    return (
                        <React.Fragment key={`message-part-message-box-item-${dateIndex}`}>
                            <p className="p-4 text-center text-sm text-gray-500">{`${dateIndex}`}</p>
                            {lodash.map(message, (msg, index) => {
                                return (
                                    <MessageBox
                                        key={`message-part-message-box-message-${dateIndex}-${index}`}
                                        ProfileImage={msg.user.profileImage ? msg.user.profileImage : null}
                                        MessageLocation={msg.location}
                                        MessageList={lodash.map(msg.msg, msgList => {
                                            return {
                                                type: msgList.type,
                                                message: msgList.contents,
                                            };
                                        })}
                                    />
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="chat-footer flex-none">
                <MessageFooterBox />
            </div>
        </>
    );
};

export default MessagePart;

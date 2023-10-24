import React from 'react';
import { LocationStyleType } from '@CommonType';

import { ElementStyles } from '@Styles';

const { MessageTextWapper, MessageImageWapper, MessageImage } = ElementStyles.MessageStyle.MessageItem;

const MessageItem = ({
    MessageLocation,
    MessageType,
    MessageStyle,
    Message,
}: {
    MessageLocation: LocationStyleType;
    MessageType: string | `text` | `image`;
    Message: string;
    MessageStyle: string | `first` | `middle` | `last`;
}) => {
    return (
        <>
            {MessageType === 'text' ? (
                <MessageTextWapper LocationStyle={MessageLocation} IndexStyle={MessageStyle}>
                    {Message}
                </MessageTextWapper>
            ) : (
                <MessageImageWapper>
                    <MessageImage src={Message} alt="" />
                </MessageImageWapper>
            )}
        </>
    );
};

export default MessageItem;

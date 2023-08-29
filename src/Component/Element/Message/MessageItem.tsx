import { BoraButton } from '@Elements';
import { MessageBoxHamburgerIcon, MessageBoxOptionIcon, MessageBoxReplayIcon } from '@Icons';
import React, { useState } from 'react';
import { LocationStyleType } from '@CommonType';

import { ElementStyles } from '@Styles';

const { MessageTextWapper, MessageImageWapper, MessageImage } = ElementStyles.MessageStyle.MessageItem;

const initialPageState = {
    buttonShow: false,
};

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
    const [pageState, setPageState] = useState<{ buttonShow: boolean }>(initialPageState);

    return (
        <>
            {MessageType === 'text' ? (
                <MessageTextWapper
                    LocationStyle={MessageLocation}
                    IndexStyle={MessageStyle}
                    onMouseOver={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            buttonShow: true,
                        }))
                    }
                    onMouseLeave={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            buttonShow: false,
                        }))
                    }>
                    {Message}
                </MessageTextWapper>
            ) : (
                <MessageImageWapper
                    onMouseOver={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            buttonShow: true,
                        }))
                    }
                    onMouseLeave={() =>
                        setPageState(prevState => ({
                            ...prevState,
                            buttonShow: false,
                        }))
                    }>
                    <MessageImage src={Message} alt="" />
                </MessageImageWapper>
            )}

            {pageState.buttonShow && (
                <>
                    <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                    <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                    <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                </>
            )}
        </>
    );
};

export default MessageItem;

import tw, { styled } from 'twin.macro';
import { BoraButton } from '@Elements';
import { MessageBoxHamburgerIcon, MessageBoxOptionIcon, MessageBoxReplayIcon } from '@Icons';
import React, { useState } from 'react';

type LocationStyleType = string | `left` | `right`;

const MessageTextWapper = styled.p(
    ({ IndexStyle, LocationStyle }: { IndexStyle: string | `first` | `middle` | `last`; LocationStyle: LocationStyleType }) => {
        const twStyled = [];

        if (IndexStyle === `first`) {
            twStyled.push(tw`px-6 py-3 rounded-t-full max-w-xs lg:max-w-md`);
        } else if (IndexStyle === `last`) {
            twStyled.push(tw`px-6 py-3 rounded-b-full max-w-xs lg:max-w-md`);
        } else {
            twStyled.push(tw`px-6 py-3 max-w-xs lg:max-w-md`);
        }

        if (LocationStyle === `left`) {
            twStyled.push(tw`bg-gray-200 rounded-r-full`);
        } else if (LocationStyle === `right`) {
            twStyled.push(tw`bg-blue-500 rounded-l-full`);
        }

        return twStyled;
    }
);

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
                <div
                    className="w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md cursor-pointer"
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
                    <img className="absolute shadow-md w-full h-full rounded-l-lg object-cover" src={Message} alt="hiking" />
                </div>
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

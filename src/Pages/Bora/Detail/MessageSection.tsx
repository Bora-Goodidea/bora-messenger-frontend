import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import { useRecoilValue } from 'recoil';
import { MessengerChatListState } from '@Recoil/MessengerState';
import { MessageHeaderBox, MessageBox, MessageFooterBox } from '@Elements';
import { PageStyles } from '@Styles';
import { CommonCodesItemInterface } from '@CommonType';
import { DefaultSpinner } from '@Icons';

const { HeaderBox, MessageBox: MessageBoxStyle, FooterBox, MessageDate } = PageStyles.Bora.MessengerStyles.MessageSection;

const pageInitializeState = {
    loading: false,
    chats: [],
};

const MessageSection = () => {
    const messengerChatListState = useRecoilValue(MessengerChatListState);
    const [pageState, setPageState] = useState<{
        loading: boolean;
        chats: Array<{
            date: string;
            message: Array<{
                location: string;
                user: {
                    profileImage: string | null;
                };
                list: Array<{
                    type: CommonCodesItemInterface;
                    contents: string;
                }>;
            }>;
        }>;
    }>(pageInitializeState);

    useEffect(() => {
        const fnSetChatList = () => {
            const { loading, chats } = messengerChatListState;
            setPageState(prevState => ({
                ...prevState,
                loading: loading,
                chats: lodash.map(chats, chat => {
                    return {
                        date: chat.date,
                        message: lodash.map(chat.list, element => {
                            return {
                                location: element.location,
                                user: {
                                    profileImage: element.user.profile.image,
                                },
                                list: lodash.map(element.message, m => {
                                    return {
                                        type: m.type,
                                        contents: m.contents,
                                    };
                                }),
                            };
                        }),
                    };
                }),
            }));
        };
        fnSetChatList();
    }, [messengerChatListState]);

    return (
        <>
            {pageState.loading ? (
                <DefaultSpinner />
            ) : (
                <>
                    <HeaderBox>
                        <MessageHeaderBox />
                    </HeaderBox>
                    <MessageBoxStyle>
                        {lodash.map(pageState.chats, (chat, dateIndex) => {
                            return (
                                <React.Fragment key={`message-section-message-box-item-${dateIndex}`}>
                                    <MessageDate>{`${chat.date}`}</MessageDate>
                                    {lodash.map(chat.message, (msg, index) => {
                                        return (
                                            <MessageBox
                                                key={`message-section-message-box-message-${dateIndex}-${index}`}
                                                ProfileImage={msg.user.profileImage ? msg.user.profileImage : null}
                                                MessageLocation={msg.location}
                                                MessageList={lodash.map(msg.list, list => {
                                                    return {
                                                        type: list.type.name,
                                                        message: list.contents,
                                                    };
                                                })}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </MessageBoxStyle>
                </>
            )}
            <FooterBox>
                <MessageFooterBox />
            </FooterBox>
        </>
    );
};

export default MessageSection;

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
    messenger: {
        target: [],
        last: {
            last: false,
            message: ``,
            profileImage: ``,
            nickname: ``,
            time: ``,
            uid: ``,
        },
        sinceString: ``,
    },
    chats: [],
};

const MessageSection = ({ HandleSendMessage }: { HandleSendMessage: () => void }) => {
    const messengerChatListState = useRecoilValue(MessengerChatListState);
    const [pageState, setPageState] = useState<{
        loading: boolean;
        messenger: {
            target: Array<{
                profileImage: string;
                name: string;
            }>;
            last: {
                last: boolean;
                message: string;
                profileImage: string;
                nickname: string;
                time: string;
                uid: string;
            };
            sinceString: string;
        };
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
            const { loading, chats, messenger } = messengerChatListState;
            setPageState(prevState => ({
                ...prevState,
                loading: loading,
                messenger: {
                    target: lodash.map(messenger.target, m => {
                        return {
                            profileImage: m.profile.image,
                            name: m.nickname,
                        };
                    }),
                    last: {
                        last: messenger.last.last,
                        message: messenger.last.message ? messenger.last.message : ``,
                        profileImage: messenger.last.profileImage ? messenger.last.profileImage : ``,
                        nickname: messenger.last.nickname ? messenger.last.nickname : ``,
                        time: messenger.last.time ? messenger.last.time.sinceString : ``,
                        uid: messenger.last.uid ? messenger.last.uid : ``,
                    },
                    sinceString: messenger.created_at ? messenger.created_at.sinceString : ``,
                },
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
                    {!pageState.messenger.last.uid ? (
                        <></>
                    ) : (
                        <HeaderBox>
                            <MessageHeaderBox
                                Params={(() => {
                                    const { last, profileImage, nickname, time, uid } = pageState.messenger.last;
                                    const { target, sinceString } = pageState.messenger;
                                    if (last) {
                                        return {
                                            AvatarImage: [{ url: profileImage, alt: nickname }],
                                            Name: nickname,
                                            Date: time,
                                            Uid: uid,
                                        };
                                    } else {
                                        return {
                                            AvatarImage: [
                                                {
                                                    url: target.length > 0 ? target[0].profileImage : ``,
                                                    alt: target.length > 0 ? target[0].name : ``,
                                                },
                                            ],
                                            Name: target.length > 0 ? target[0].name : ``,
                                            Date: sinceString,
                                            Uid: uid,
                                        };
                                    }
                                })()}
                            />
                        </HeaderBox>
                    )}
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
                <MessageFooterBox HandleSendMessage={() => HandleSendMessage()} />
            </FooterBox>
        </>
    );
};

export default MessageSection;

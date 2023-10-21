import React, { useEffect, useState, useRef } from 'react';
import lodash from 'lodash';
import { useRecoilValue } from 'recoil';
import { MessengerChatListState } from '@Recoil/MessengerState';
import { AtomRootState } from '@Recoil/AppRootState';
import { MessageHeaderBox, MessageBox, MessageFooterBox } from '@Elements';
import { PageStyles } from '@Styles';
import { CommonCodesItemInterface } from '@CommonType';
import { DefaultSpinner } from '@Icons';

const { HeaderBox, MessageBox: MessageBoxStyle, FooterBox, MessageDate } = PageStyles.Bora.MessengerStyles.MessageSection;

const pageInitializeState = {
    loading: false,
    uid: ``,
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
    const atomRootState = useRecoilValue(AtomRootState);
    const messageBoxRef = useRef<HTMLDivElement>(null);
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
            const {
                loading,
                resultData: { chat, messenger },
            } = messengerChatListState;
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
                chats: lodash.map(lodash.union(lodash.map(chat, e => e.item.created_at.format.step1)), date => {
                    return {
                        date: date,
                        message: (() => {
                            const returnData: {
                                [index: string]: {
                                    location: string | 'right' | 'left';
                                    user: {
                                        uid: string;
                                        nickname: string;
                                        profile: {
                                            image: string;
                                        };
                                    };
                                    message: Array<{
                                        type: CommonCodesItemInterface;
                                        chat_code: string;
                                        contents: string;
                                        checked: string | 'N' | `Y`;
                                        checked_at: {
                                            format: {
                                                step1: string;
                                                step2: string;
                                                step3: string | undefined;
                                            };
                                        } | null;
                                        created_at: {
                                            format: {
                                                step1: string;
                                                step2: string;
                                                step3: string | undefined;
                                            };
                                            sinceString: string;
                                        };
                                    }>;
                                };
                            } = {};
                            let nowUser = '';
                            let nowKey = '';

                            lodash.forEach(
                                lodash.map(
                                    lodash.filter(chat, e => e.date === `${date}`),
                                    e => {
                                        return e.item;
                                    }
                                ),
                                (e, index) => {
                                    if (e.user) {
                                        const uid = e.user.uid;
                                        if (nowUser !== uid) {
                                            nowUser = uid;

                                            nowKey = `${uid}${index}`;
                                        }

                                        if (!returnData[nowKey]) {
                                            returnData[nowKey] = {
                                                location: e.location,
                                                user: {
                                                    uid: e.user.uid,
                                                    nickname: e.user.nickname,
                                                    profile: e.user.profile,
                                                },
                                                message: [],
                                            };
                                        }

                                        returnData[nowKey].message.push({
                                            type: e.message_type,
                                            chat_code: e.chat_code,
                                            contents: e.message,
                                            checked: e.checked,
                                            checked_at: (() => {
                                                if (e.checked_at === null) {
                                                    return null;
                                                } else {
                                                    return {
                                                        format: {
                                                            step1: e.checked_at.format.step1,
                                                            step2: e.checked_at.format.step2,
                                                            step3: e.checked_at.format.step3,
                                                        },
                                                    };
                                                }
                                            })(),
                                            created_at: (() => {
                                                return {
                                                    format: {
                                                        step1: e.created_at.format.step1,
                                                        step2: e.created_at.format.step2,
                                                        step3: e.created_at.format.step3,
                                                    },
                                                    sinceString: e.created_at.sinceString,
                                                };
                                            })(),
                                        });
                                    }
                                }
                            );

                            return lodash.map(returnData, e => {
                                return {
                                    // 신규 메시지에서는 내 메시지인지 아닌지 판단 할수가 없어서 다시 한번 판단.
                                    location: atomRootState.uid === e.user.uid ? `right` : `left`,
                                    // location: e.location,
                                    user: {
                                        profileImage: e.user.profile.image ? e.user.profile.image : null,
                                    },
                                    list: lodash.map(e.message, m => {
                                        return {
                                            type: {
                                                code: m.type.code ? m.type.code : '',
                                                name: m.type.name ? m.type.name : '',
                                            },
                                            contents: m.contents,
                                        };
                                    }),
                                };
                            });
                        })(),
                    };
                }),
            }));
        };
        fnSetChatList();

        if (messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [atomRootState.uid, messengerChatListState]);

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
                    <div ref={messageBoxRef} />
                </>
            )}
            <FooterBox>
                <MessageFooterBox HandleSendMessage={() => HandleSendMessage()} />
            </FooterBox>
        </>
    );
};

export default MessageSection;

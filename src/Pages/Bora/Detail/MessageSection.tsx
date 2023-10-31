import React, { useEffect, useState, useRef } from 'react';
import lodash from 'lodash';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { MessengerChatListState, MessengerRoomListState } from '@Recoil/MessengerState';
import { AtomRootState } from '@Recoil/AppRootState';
import { MessageHeaderBox, MessageBox, MessageFooterBox } from '@Elements';
import { PageStyles, LayoutStyles } from '@Styles';
import { CommonCodesItemInterface } from '@CommonType';
import { DefaultSpinner, MessageBubbleIcon } from '@Icons';
import MessengerService from '@Module/Messenger.Service';
import { BoraAvatar } from '@Elements';

const {
    HeaderBox,
    MessageBox: MessageBoxStyle,
    FooterBox,
    MessageDate,
    MessageBubbleWapper,
    MessageBubbleBox,
    MessageBubbleIconWapper,
} = PageStyles.Bora.MessengerStyles.MessageSection;
const { ServiceMessengerChartChecked } = MessengerService;
const { FlexWFullCenter } = LayoutStyles.WapperStyle;

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
    doChecks: [],
};

const MessageSection = ({
    HandleSendMessage,
    HandleBubble,
    StateBubble,
}: {
    HandleSendMessage: () => void;
    StateBubble: boolean;
    HandleBubble: ({ state }: { state: `start` | `end` }) => void;
}) => {
    const [messengerChatListState, setMessengerChatListState] = useRecoilState(MessengerChatListState);
    const setMessengerRoomListState = useSetRecoilState(MessengerRoomListState);
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
                    cid: string;
                    checked: string | `Y` | `N`;
                    type: CommonCodesItemInterface;
                    contents: string;
                }>;
            }>;
        }>;
        doChecks: Array<string>;
    }>(pageInitializeState);

    useEffect(() => {
        const fnSetChatList = () => {
            const {
                loading,
                resultData: { chat, messenger },
            } = messengerChatListState;
            const doChecks: Array<string> = [];
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
                                        if (atomRootState.uid !== e.user.uid && m.checked === 'N') {
                                            doChecks.push(m.chat_code);
                                        }
                                        return {
                                            cid: m.chat_code,
                                            checked: m.checked,
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
                doChecks: doChecks,
            }));
        };

        fnSetChatList();
    }, [atomRootState.uid, messengerChatListState, messengerChatListState.resultData.chat]);

    useEffect(() => {
        if (messengerChatListState.resultData.chat.length > 0 && messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messengerChatListState.resultData.chat.length, pageState.chats]);

    useEffect(() => {
        const funcMsgChecked = async (list: Array<string>) => {
            const { status, payload } = await ServiceMessengerChartChecked({ chart: list });
            if (status) {
                setMessengerChatListState(prevState => ({
                    ...prevState,
                    resultData: {
                        ...prevState.resultData,
                        chat: lodash.map(prevState.resultData.chat, e => {
                            if (lodash.includes(payload.chart_code, e.item.chat_code)) {
                                return {
                                    ...e,
                                    item: {
                                        ...e.item,
                                        checked: 'Y',
                                    },
                                };
                            } else {
                                return e;
                            }
                        }),
                    },
                }));

                setMessengerRoomListState(prevState => ({
                    ...prevState,
                    rooms: lodash.map(prevState.rooms, room => {
                        if (room.room_code === payload.room.room_code) {
                            return {
                                ...room,
                                checked: payload.room.checked,
                                chart: payload.room.chart,
                            };
                        }
                        return room;
                    }),
                }));
            }
        };
        if (pageState.doChecks.length > 0) {
            funcMsgChecked(pageState.doChecks).then(() => {
                setPageState(prevState => ({
                    ...prevState,
                    doChecks: [],
                }));
            });
        }
    }, [pageState.doChecks, setMessengerChatListState, setMessengerRoomListState]);

    useEffect(() => {
        if (messengerChatListState.resultData.chat.length > 0 && messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [StateBubble, messengerChatListState.resultData.chat.length]);

    return (
        <>
            {pageState.loading ? (
                <FlexWFullCenter>
                    <DefaultSpinner />
                </FlexWFullCenter>
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
                                                MessageList={lodash.map(msg.list, item => {
                                                    return {
                                                        type: item.type.name,
                                                        message: item.contents,
                                                    };
                                                })}
                                            />
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                        {StateBubble && (
                            <MessageBubbleWapper location={`left`}>
                                <BoraAvatar
                                    AvatarImage={[{ url: `https://xsgames.co/randomusers/avatar.php?g=pixel`, alt: `` }]}
                                    AvatarShadow={true}
                                    AvatarSize={`small`}
                                />
                                <MessageBubbleBox>
                                    <MessageBubbleIconWapper>
                                        <MessageBubbleIcon />
                                    </MessageBubbleIconWapper>
                                </MessageBubbleBox>
                            </MessageBubbleWapper>
                        )}

                        <div ref={messageBoxRef} />
                    </MessageBoxStyle>
                </>
            )}
            {!pageState.messenger.last.uid ? (
                <></>
            ) : (
                <FooterBox>
                    <MessageFooterBox HandleSendMessage={() => HandleSendMessage()} HandleBubble={e => HandleBubble(e)} />
                </FooterBox>
            )}
        </>
    );
};

export default MessageSection;

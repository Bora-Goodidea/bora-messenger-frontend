import React from 'react';
import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { MessageHeaderBox, MessageBox, MessageFooterBox } from '@Elements';
import { PageStyles } from '@Styles';

const { HeaderBox, MessageBox: MessageBoxStyle, FooterBox, MessageDate } = PageStyles.Bora.MessengerStyles.MessageSection;

const MessageSection = () => {
    return (
        <>
            <HeaderBox>
                <MessageHeaderBox />
            </HeaderBox>
            <MessageBoxStyle>
                {lodash.map(TemporaryData.Messages, (message, dateIndex) => {
                    return (
                        <React.Fragment key={`message-section-message-box-item-${dateIndex}`}>
                            <MessageDate>{`${dateIndex}`}</MessageDate>
                            {lodash.map(message, (msg, index) => {
                                return (
                                    <MessageBox
                                        key={`message-section-message-box-message-${dateIndex}-${index}`}
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
            </MessageBoxStyle>
            <FooterBox>
                <MessageFooterBox />
            </FooterBox>
        </>
    );
};

export default MessageSection;

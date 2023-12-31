import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessengerRoomListState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import { PageStyles, LayoutStyles } from '@Styles';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultSpinner } from '@Icons';
import Const from '@Const';

const {
    Wapper,
    AvatarBox,
    AvatarImage,
    AvatarActive,
    AvatarActiveMark,
    MessageWapper,
    MessageName,
    MessageBox,
    Message,
    MessageTime,
    MessageMin,
} = PageStyles.Bora.MessengerStyles.ContactsSection;
const { FlexWFullCenter } = LayoutStyles.WapperStyle;

const pageInitializeState = {
    loading: false,
    rooms: [],
};

const ContactsSection = () => {
    const navigate = useNavigate();
    const { roomCode } = useParams();
    const messengerRoomListState = useRecoilValue(MessengerRoomListState);
    const [pageState, setPageState] = useState<{
        loading: boolean;
        rooms: Array<{
            roomCode: string;
            select: boolean;
            profileImage: Array<string> | null;
            checked: boolean;
            name: string;
            message: string;
            time: string;
        }>;
    }>(pageInitializeState);

    useEffect(() => {
        const fnSetRoomList = () => {
            const { loading, rooms } = messengerRoomListState;
            setPageState(prevState => ({
                ...prevState,
                loading: loading,
                rooms: lodash.map(rooms, room => {
                    return {
                        roomCode: room.room_code,
                        select: roomCode === room.room_code,
                        profileImage: lodash.map(room.target, e => e.profile.image),
                        checked: room.checked === 'N',
                        name: room.target[0].nickname, // 첫번쨰 닉네임만 표시
                        message: room.chart.type === Const.Message.imageType ? `이미지` : room.chart.content,
                        time: room.chart.updated_at ? room.chart.updated_at.sinceString : '',
                    };
                }),
            }));
        };

        fnSetRoomList();
    }, [messengerRoomListState, roomCode]);

    return (
        <>
            {pageState.loading ? (
                <FlexWFullCenter>
                    <DefaultSpinner />
                </FlexWFullCenter>
            ) : (
                <>
                    {lodash.map(pageState.rooms, (room, index) => {
                        return (
                            <Wapper
                                SelectStyle={room.select}
                                key={`contacts-section-item-${index}`}
                                onClick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/bora/${room.roomCode}/messenger` })}>
                                <AvatarBox>
                                    {lodash.map(room.profileImage, (e, i, list) => {
                                        return (
                                            <AvatarImage
                                                key={`contacts-section-avatar-box-image-item-${i}`}
                                                src={`${e}`}
                                                alt=""
                                                Multiple={list.length > 1}
                                                Index={i}
                                            />
                                        );
                                    })}
                                    {room.checked && (
                                        <AvatarActive>
                                            <AvatarActiveMark />
                                        </AvatarActive>
                                    )}
                                </AvatarBox>
                                <MessageWapper>
                                    <MessageName>{`${room.name}`}</MessageName>
                                    <MessageBox>
                                        <MessageMin>
                                            <Message>{`${room.message}`}</Message>
                                        </MessageMin>
                                    </MessageBox>
                                    <MessageTime>{`${room.time}`}</MessageTime>
                                </MessageWapper>
                            </Wapper>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default ContactsSection;

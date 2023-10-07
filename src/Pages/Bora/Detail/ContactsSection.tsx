import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessengerRoomListState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import { PageStyles } from '@Styles';
import { useNavigate } from 'react-router-dom';
import { DefaultSpinner } from '@Icons';

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

const pageInitializeState = {
    loading: false,
    rooms: [],
};

const ContactsSection = () => {
    const navigate = useNavigate();
    const messengerRoomListState = useRecoilValue(MessengerRoomListState);
    const [pageState, setPageState] = useState<{
        loading: boolean;
        rooms: Array<{
            roomCode: string;
            select: boolean;
            profileImage: string;
            now: boolean;
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
                    const last = lodash.last(room.target);
                    return {
                        roomCode: room.room_code,
                        select: false,
                        profileImage: last ? last.profile.image : '',
                        now: true,
                        name: last ? last.nickname : '',
                        message: room.chart.content,
                        time: room.chart.updated_at ? room.chart.updated_at.sinceString : '',
                    };
                }),
            }));
        };

        fnSetRoomList();
    }, [messengerRoomListState]);

    return (
        <>
            {pageState.loading ? (
                <DefaultSpinner />
            ) : (
                <>
                    {lodash.map(pageState.rooms, (room, index) => {
                        return (
                            <Wapper
                                SelectStyle={room.select}
                                key={`contacts-section-item-${index}`}
                                onClick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/bora/${room.roomCode}/messenger` })}>
                                <AvatarBox>
                                    <AvatarImage src={`${room.profileImage}`} alt="" />
                                    {room.now && (
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

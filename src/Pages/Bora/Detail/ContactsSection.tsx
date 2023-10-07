import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessengerRoomListState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import { PageStyles } from '@Styles';

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
    const messengerRoomListState = useRecoilValue(MessengerRoomListState);
    const [pageState, setPageState] = useState<{
        loading: boolean;
        rooms: Array<{
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
            {lodash.map(pageState.rooms, (c, index) => {
                return (
                    <Wapper SelectStyle={c.select} key={`contacts-section-item-${index}`}>
                        <AvatarBox>
                            <AvatarImage src={`${c.profileImage}`} alt="" />
                            {c.now && (
                                <AvatarActive>
                                    <AvatarActiveMark />
                                </AvatarActive>
                            )}
                        </AvatarBox>
                        <MessageWapper>
                            <MessageName>{`${c.name}`}</MessageName>
                            <MessageBox>
                                <MessageMin>
                                    <Message>{`${c.message}`}</Message>
                                </MessageMin>
                            </MessageBox>
                            <MessageTime>{`${c.time}`}</MessageTime>
                        </MessageWapper>
                    </Wapper>
                );
            })}
        </>
    );
};

export default ContactsSection;

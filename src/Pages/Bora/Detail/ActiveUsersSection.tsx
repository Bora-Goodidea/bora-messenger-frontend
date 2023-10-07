import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessengerUserListState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import { BoraButton, BoraAvatar } from '@Elements';
import { YourStoryIcon } from '@Icons';
import { PageStyles } from '@Styles';

const { IconWapper, AvatarWapper, AvatarBox } = PageStyles.Bora.MessengerStyles.ActiveUsersSection;

const pageInitializeState = {
    loading: false,
    users: [],
};

const ActiveUsersSection = () => {
    const messengerUserListState = useRecoilValue(MessengerUserListState);

    const [pageState, setPageState] = useState<{
        loading: boolean;
        users: Array<{
            active: boolean;
            profileImage: string;
            name: string;
        }>;
    }>(pageInitializeState);

    useEffect(() => {
        const fnSetUserList = () => {
            const { loading, users } = messengerUserListState;
            setPageState(prevState => ({
                ...prevState,
                loading: loading,
                users: lodash.map(users, user => {
                    return {
                        active: user.active.state === 'Y',
                        profileImage: user.profile.image,
                        name: user.nickname,
                    };
                }),
            }));
        };

        if (!messengerUserListState.loading && messengerUserListState.users.length > 0) {
            fnSetUserList();
        }
    }, [messengerUserListState]);

    return (
        <>
            <IconWapper>
                <BoraButton ButtonType={`RoundIcon`} ButtonChildren={<YourStoryIcon />} />
                <p>Your Story</p>
            </IconWapper>
            {lodash.map(pageState.users, (user, index) => {
                return (
                    <AvatarBox key={`Active-Users-avatar-item-${index}`}>
                        <AvatarWapper ActiveStyle={user.active}>
                            <BoraAvatar
                                AvatarUrl={user.profileImage}
                                AvataAltString={user.name}
                                AvatarShadow={true}
                                AvatarSize={`default`}
                            />
                        </AvatarWapper>
                        <p>{`${user.name}`}</p>
                    </AvatarBox>
                );
            })}
        </>
    );
};

export default ActiveUsersSection;

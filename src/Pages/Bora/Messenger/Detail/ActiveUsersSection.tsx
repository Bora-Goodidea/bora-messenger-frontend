import React from 'react';
import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { BoraButton, BoraAvatar } from '@Elements';
import { YourStoryIcon } from '@Icons';
import { PageStyles } from '@Styles';

const { IconWapper, AvatarWapper, AvatarBox } = PageStyles.Bora.MessengerStyles.ActiveUsersSection;

const { ActiveUsers: ActiveUserList } = TemporaryData;

const ActiveUsersSection = () => {
    return (
        <>
            <IconWapper>
                <BoraButton ButtonType={`RoundIcon`} ButtonChildren={<YourStoryIcon />} />
                <p>Your Story</p>
            </IconWapper>
            {lodash.map(ActiveUserList, (user, index) => {
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
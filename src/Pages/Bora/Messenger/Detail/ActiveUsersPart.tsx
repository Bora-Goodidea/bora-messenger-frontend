import React from 'react';
import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { BoraButton, BoraAvatar } from '@Elements';
import { YourStoryIcon } from '@Icons';
import tw, { styled } from 'twin.macro';

const AvatarWapper = styled.div(({ ActiveStyle }: { ActiveStyle: boolean }) => {
    const twStyled = [tw`p-1 border-4 rounded-full`];

    if (ActiveStyle) {
        twStyled.push(tw`border-blue-600`);
    } else {
        twStyled.push(tw`border-transparent`);
    }

    return twStyled;
});

const { ActiveUsers: ActiveUserList } = TemporaryData;

const ActiveUsersPart = () => {
    return (
        <>
            <div className="text-sm text-center mr-4">
                <BoraButton ButtonType={`RoundIcon`} ButtonChildren={<YourStoryIcon />} />
                <p>Your Story</p>
            </div>
            {lodash.map(ActiveUserList, (user, index) => {
                return (
                    <div className="text-sm text-center mr-4" key={`Active-Users-avatar-item-${index}`}>
                        <AvatarWapper ActiveStyle={user.active}>
                            <BoraAvatar
                                AvatarUrl={user.profileImage}
                                AvataAltString={user.name}
                                AvatarShadow={true}
                                AvatarSize={`default`}
                            />
                        </AvatarWapper>
                        <p>{`${user.name}`}</p>
                    </div>
                );
            })}
        </>
    );
};

export default ActiveUsersPart;

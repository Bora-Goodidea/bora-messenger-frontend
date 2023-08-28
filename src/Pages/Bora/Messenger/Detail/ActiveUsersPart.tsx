import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { BoraButton, BoraAvatar } from '@Elements';
import { YourStoryIcon } from '@Icons';

const { ActiveUsers: ActiveUserList } = TemporaryData;

const ActiveUsersPart = () => {
    return (
        <>
            <div className="text-sm text-center mr-4">
                <BoraButton Icon={<YourStoryIcon />} />
                <p>Your Story</p>
            </div>
            {lodash.map(ActiveUserList, (user, index) => {
                return (
                    <div className="text-sm text-center mr-4" key={`Active-Users-avatar-item-${index}`}>
                        <BoraAvatar Active={user.active} AvatarUrl={user.profileImage} AvataAltString={user.name} AvatarName={user.name} />
                    </div>
                );
            })}
        </>
    );
};

export default ActiveUsersPart;

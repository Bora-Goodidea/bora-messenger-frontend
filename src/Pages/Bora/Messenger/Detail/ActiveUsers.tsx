import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import { BoraButton, BoraAvatar } from '@Elements';
import { YourStoryIcon } from '@Icons';

const { ActiveUsers: ActiveUserList } = TemporaryData;

const ActiveUsers = () => {
    return (
        <>
            <div className="text-sm text-center mr-4">
                <BoraButton Icon={<YourStoryIcon />} />
                <p>Your Story</p>
            </div>
            {lodash.map(ActiveUserList, (user, index) => {
                return <BoraAvatar Active={user.active} AvatarUrl={user.profileImage} AvataAltString={user.name} />;
            })}
        </>
    );
};

export default ActiveUsers;

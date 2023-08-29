import { BoraAvatar } from '@Elements';
import { NewMessageIcon } from '@Icons';

const HeaderPart = () => {
    return (
        <>
            <BoraAvatar
                AvatarShadow={true}
                AvatarUrl={`https://avatars3.githubusercontent.com/u/22351907?s=60`}
                AvataAltString={`ravisankarchinnam`}
                AvatarSize={`default`}
            />
            <p className="text-md font-bold hidden md:block">Messenger</p>
            <div className="block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2">
                <NewMessageIcon />
            </div>
        </>
    );
};

export default HeaderPart;

import { BoraAvatar } from '@Elements';
import { NewMessageIcon } from '@Icons';
import { MessengerStyles } from '@Styles';

const { Title, NewMessage } = MessengerStyles.HeaderPart;

const HeaderPart = () => {
    return (
        <>
            <BoraAvatar
                AvatarShadow={true}
                AvatarUrl={`https://avatars3.githubusercontent.com/u/22351907?s=60`}
                AvataAltString={`ravisankarchinnam`}
                AvatarSize={`default`}
            />
            <Title>Messenger</Title>
            <NewMessage>
                <NewMessageIcon />
            </NewMessage>
        </>
    );
};

export default HeaderPart;

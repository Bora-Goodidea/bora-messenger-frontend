import { BoraAvatar } from '@Elements';
import { NewMessageIcon } from '@Icons';
import { PageStyles } from '@Styles';

const { Title, NewMessage } = PageStyles.Bora.MessengerStyles.HeaderSection;

const HeaderSection = () => {
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

export default HeaderSection;
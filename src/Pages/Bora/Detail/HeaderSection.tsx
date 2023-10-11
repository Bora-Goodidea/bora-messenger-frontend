import { BoraAvatar } from '@Elements';
import { NewMessageIcon } from '@Icons';
import { PageStyles } from '@Styles';
import { useNavigate } from 'react-router-dom';

const { Title, NewMessage } = PageStyles.Bora.MessengerStyles.HeaderSection;

const HeaderSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <BoraAvatar
                AvatarShadow={true}
                AvatarImage={[{ url: `https://avatars3.githubusercontent.com/u/22351907?s=60`, alt: `ravisankarchinnam` }]}
                AvatarSize={`default`}
                AvatarOnclick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/bora/profile-update` })}
            />
            <Title>Bora-Messenger</Title>
            <NewMessage>
                <NewMessageIcon />
            </NewMessage>
        </>
    );
};

export default HeaderSection;

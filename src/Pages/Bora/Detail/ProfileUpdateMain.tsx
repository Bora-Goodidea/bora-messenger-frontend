import { LayoutStyles } from '@Styles';
import ProfileUpdateSection from './ProfileUpdateSection';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const ProfileUpdateMain = () => {
    return (
        <MainContainer>
            <ProfileUpdateSection />
        </MainContainer>
    );
};

export default ProfileUpdateMain;

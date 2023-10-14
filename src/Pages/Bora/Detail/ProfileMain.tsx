import { LayoutStyles } from '@Styles';
import ProfileSection from './ProfileSection';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const ProfileMain = () => {
    return (
        <MainContainer>
            <ProfileSection />
        </MainContainer>
    );
};

export default ProfileMain;

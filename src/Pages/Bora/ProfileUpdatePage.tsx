import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import ProfileUpdateMain from './Detail/ProfileUpdateMain';

const pageName = `프로필 수정`;

const ProfileUpdatePage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>
            <ProfileUpdateMain />
        </>
    );
};

export default ProfileUpdatePage;

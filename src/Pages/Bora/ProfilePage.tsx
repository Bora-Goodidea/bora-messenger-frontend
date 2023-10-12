import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import ProfileMain from './Detail/ProfileMain';

const pageName = `프로필`;

const ProfilePage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>
            <ProfileMain />
        </>
    );
};

export default ProfilePage;

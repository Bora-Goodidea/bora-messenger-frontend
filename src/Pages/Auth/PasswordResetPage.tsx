import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import { PasswordResetMain } from './Detail';

const pageName = `패스워드 초기화`;

const PasswordResetPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <PasswordResetMain />
        </>
    );
};

export default PasswordResetPage;

import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import { LogoutMain } from './Detail';

const pageName = `로그인`;

const LogoutPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <LogoutMain />
        </>
    );
};

export default LogoutPage;

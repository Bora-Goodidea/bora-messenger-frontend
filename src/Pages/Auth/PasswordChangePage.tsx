import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import { PasswordChangeMain } from './Detail';

const pageName = `패스워드 변경`;

const PasswordChangePage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <PasswordChangeMain />
        </>
    );
};

export default PasswordChangePage;

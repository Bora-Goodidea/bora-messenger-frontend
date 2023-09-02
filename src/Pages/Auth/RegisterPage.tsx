import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import { RegisterMain } from './Detail';

const pageName = `회원가입`;

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <RegisterMain />
        </>
    );
};

export default RegisterPage;

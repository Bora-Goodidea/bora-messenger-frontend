import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import MainContainer from './Detail/MainContainer';

const pageName = `회원가입`;

const MessengerPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <MainContainer />
        </>
    );
};

export default MessengerPage;

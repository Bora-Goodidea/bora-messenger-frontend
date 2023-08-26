import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import MainContainer from './Detail/MainContainer';

const MessengerPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | 메인`}</title>
                <meta name="description" content="메인 페이지" />
            </Helmet>

            <MainContainer />
        </>
    );
};

export default MessengerPage;

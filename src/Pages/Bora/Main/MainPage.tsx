import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import Detail from './Detail/Main';

const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | 메인`}</title>
                <meta name="description" content="메인 페이지" />
            </Helmet>

            <Detail />
        </>
    );
};

export default MainPage;

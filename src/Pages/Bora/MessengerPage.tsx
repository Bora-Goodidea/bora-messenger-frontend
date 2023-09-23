import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import MessengerMain from './Detail/MessengerMain';

const pageName = `메신저`;

const MessengerPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <MessengerMain />
        </>
    );
};

export default MessengerPage;

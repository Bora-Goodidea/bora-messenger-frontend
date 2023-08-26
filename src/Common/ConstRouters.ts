import React from 'react';

export default {
    Bora: [
        {
            name: `bora-messenger`,
            pathName: `/messenger`,
            Component: React.lazy(() => import('@Page/Bora/Messenger/MessengerPage')),
        },
    ],
    Auth: [
        {
            name: `auth-login`,
            pathName: `/login`,
            Component: React.lazy(() => import('@Page/Auth/LoginPage')),
        },
    ],
    Publish: [
        {
            name: `publish-default`,
            pathName: `/default`,
            Component: React.lazy(() => import('@Page/Publish/DefaultPage')),
        },
        {
            name: `publish-dark-default`,
            pathName: `/dark-default`,
            Component: React.lazy(() => import('@Page/Publish/DefaultDerkPage')),
        },
    ],
};

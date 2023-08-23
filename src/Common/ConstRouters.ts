import React from 'react';

export default {
    Bora: [
        {
            name: `bora-main`,
            pathName: `/bora/main`,
            Component: React.lazy(() => import('@Page/Bora/Main/MainPage')),
        },
    ],
    Auth: [
        {
            name: `auth-login`,
            pathName: `/auth/login`,
            Component: React.lazy(() => import('@Page/Auth/LoginPage')),
        },
    ],
};

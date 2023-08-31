import React, { useEffect, useState } from 'react';
import { RootRoutes } from '@Modules';
import { SplashComponent } from '@Components';
import { useRoot } from '@Hooks';

const App = () => {
    const [appLoading, setAppLoading] = useState<boolean>(true);
    const AppStatus = useRoot();

    useEffect(() => {
        const appStart = (appStatus: boolean) => {
            if (appStatus) {
                setAppLoading(false);
            }
        };

        appStart(AppStatus);
    }, [AppStatus]);

    return (
        <>
            {(() => {
                if (appLoading) {
                    return <SplashComponent />;
                }

                return <RootRoutes />;
            })()}
        </>
    );
};

export default App;

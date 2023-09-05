import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { RootRoutes } from '@Modules';
import { SplashComponent } from '@Components';

const App = () => {
    const [appLoading, setAppLoading] = useState<boolean>(true);

    return (
        <RecoilRoot>
            {(() => {
                if (appLoading) {
                    return <SplashComponent LodingControl={() => setAppLoading(false)} />;
                }

                return <RootRoutes />;
            })()}
        </RecoilRoot>
    );
};

export default App;

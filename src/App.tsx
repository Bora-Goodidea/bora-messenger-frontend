import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import RootRoutes from '@Module/RootRoutes';
import { SplashComponent } from '@Components';
import UnderConstructionPage from '@Page/Common/UnderConstructionPage';

const App = () => {
    const [appLoading, setAppLoading] = useState<boolean | `under`>(true);

    return (
        <RecoilRoot>
            {(() => {
                if (appLoading === true) {
                    return <SplashComponent LodingControl={state => setAppLoading(state)} />;
                }

                if (appLoading === `under`) {
                    return <UnderConstructionPage />;
                }

                return <RootRoutes />;
            })()}
        </RecoilRoot>
    );
};

export default App;

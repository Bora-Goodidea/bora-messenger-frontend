import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import lodash from 'lodash';
import { ConstRouters } from '@Commons';
import { BoraLayout, BlankLayout } from '@Components';
import { PageNotFound } from '@Pages';

const RootRoutes = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route element={<BlankLayout />}>
                    {lodash.map(ConstRouters.Auth, (element, index) => {
                        const PageComponent = element.Component;
                        return (
                            <Route
                                key={`root-routers-auth-${index}`}
                                path={element.pathName}
                                element={
                                    <React.Suspense>
                                        <PageComponent />
                                    </React.Suspense>
                                }
                            />
                        );
                    })}
                </Route>
                <Route element={<BoraLayout />}>
                    {lodash.map(ConstRouters.Bora, (element, index) => {
                        const PageComponent = element.Component;
                        return (
                            <Route
                                key={`root-routers-bora-${index}`}
                                path={element.pathName}
                                element={
                                    <React.Suspense>
                                        <PageComponent />
                                    </React.Suspense>
                                }
                            />
                        );
                    })}
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RootRoutes;

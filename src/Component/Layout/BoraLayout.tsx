import { Outlet } from 'react-router';
import { LayoutStyles } from '@Styles';
import { useRecoilValue } from 'recoil';
import { AtomRootState } from '@Recoil/AppRootState';
import { useEffect } from 'react';
import { BoraAlert } from '@Elements';
import { useLayout, useAuth } from '@Hooks';
import { useNavigate } from 'react-router-dom';
import { AtomLayoutState } from '@Recoil/LayoutState';
import Messages from '@Messages';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Wapper, IconWapper, MainWapper, IconStep1, IconStep2, IconStep3 } = LayoutStyles.DafalutLayoutStyle.BoraLayoutStyle;

const BoraLayout = () => {
    const atomRootState = useRecoilValue(AtomRootState);
    const atomLayoutState = useRecoilValue(AtomLayoutState);
    const { HandleMainAlert } = useLayout();
    const { handleAuthCkeck } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!handleAuthCkeck()) {
            HandleMainAlert({
                state: true,
                type: `move`,
                message: Messages.Common.needLogin,
                action: `/auth/login`,
            });
        }

        // FIXME : 종속성에서 Data1, Data2 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [atomRootState.loginState]);

    return (
        <MainContainer>
            <Wapper>
                <BoraAlert
                    AlertState={atomLayoutState.mainAlert.state}
                    AlertMessage={atomLayoutState.mainAlert.message}
                    ButtonClick={() => {
                        const { type, action } = atomLayoutState.mainAlert;
                        HandleMainAlert({ state: false });
                        if (type === `move` && action) {
                            navigate({
                                pathname: `${process.env.PUBLIC_URL}${action}`,
                            });
                        }
                    }}
                />
                <IconWapper>
                    <IconStep1></IconStep1>
                    <IconStep2></IconStep2>
                    <IconStep3></IconStep3>
                </IconWapper>
                <MainWapper>
                    <Outlet />
                </MainWapper>
            </Wapper>
        </MainContainer>
    );
};

export default BoraLayout;

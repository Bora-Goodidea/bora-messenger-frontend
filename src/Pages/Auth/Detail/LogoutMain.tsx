import { useEffect } from 'react';
import { DefaultSpinner } from '@Icons';
import { LayoutStyles } from '@Style/index';
import { useAuth } from '@Hooks';
import { useRecoilValue } from 'recoil';
import { AtomRootState } from '@Recoil/AppRootState';
import { useNavigate } from 'react-router-dom';

const { BllankWapper } = LayoutStyles.DafalutLayoutStyle;

const LogoutMain = () => {
    const atomRootState = useRecoilValue(AtomRootState);
    const navigate = useNavigate();
    const { handleLogOut } = useAuth();

    useEffect(() => {
        if (!atomRootState.loginState) {
            navigate({
                pathname: `${process.env.PUBLIC_URL}/auth/login`,
            });
        }
    }, [atomRootState.loginState, navigate]);

    useEffect(() => {
        const startPage = () => {
            handleLogOut();
            navigate({
                pathname: `${process.env.PUBLIC_URL}/auth/login`,
            });
        };

        startPage();
        // FIXME : 종속성에서 handleLogOut, navigate 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BllankWapper>
            <DefaultSpinner />
        </BllankWapper>
    );
};

export default LogoutMain;

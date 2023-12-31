import { LoginSection } from '.';
import { useNavigate } from 'react-router-dom';
import { useLayout, useAuth } from '@Hooks';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AuthService } from '@Module/index';
import Messages from '@Messages';
import { emailValidate, storageMaster } from '@Helper';
import { useRecoilValue } from 'recoil';
import { AtomRootState } from '@Recoil/AppRootState';
import Const from '@Const';

const pageInitializeState = {
    loading: false,
    checkState: {
        status: false,
        type: null,
        message: '',
    },
    loginState: {
        email: '',
        password: '',
        idRemember: false,
    },
};

const { loginStatus } = AuthService;

const LoginMain = () => {
    const atomRootState = useRecoilValue(AtomRootState);
    const { handleAuthTokenSave, handleAuthCkeck } = useAuth();
    const navigate = useNavigate();
    const { HandleMainAlert } = useLayout();
    const enterInputRef = useRef<HTMLInputElement[]>([]);

    const [pageState, setPageState] = useState<{
        loading: boolean;
        checkState: {
            status: boolean;
            type: null | string | `email` | `password`;
            message: string;
        };
        loginState: {
            email: string;
            password: string;
            idRemember: boolean;
        };
    }>(pageInitializeState);

    const loginHandler = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setPageState(prev => ({
            ...prev,
            loginState: {
                ...prev.loginState,
                [name]: value,
            },
        }));
    };

    const loginCheck = async () => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }));
        const email = pageState.loginState.email;
        const password = pageState.loginState.password;

        const { status, message, payload } = await loginStatus(email, password);

        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }));

        if (status) {
            const { access_token, refresh_token } = payload;

            handleAuthTokenSave({ access_token: access_token, refresh_token: refresh_token });

            if (pageState.loginState.idRemember) {
                storageMaster.set(Const.Naming.rememberId, email);
            } else {
                storageMaster.remove(Const.Naming.rememberId);
            }

            await handleAuthCkeck({ tokenCheck: true });

            navigate({
                pathname: `${process.env.PUBLIC_URL}/bora/messenger`,
            });
        } else {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `password`,
                    message: message,
                },
            }));
            HandleMainAlert({
                state: true,
                message: message,
            });
        }
    };

    const login = () => {
        if (!pageState.loginState.email) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `email`,
                    message: Messages.Common.emptyEmail,
                },
            }));
            return;
        }

        if (!pageState.loginState.password) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `password`,
                    message: Messages.Common.emptyPassword,
                },
            }));
            return;
        }

        loginCheck().then();
    };

    const handleIdRemember = (checked: boolean) => {
        setPageState(prevState => ({
            ...prevState,
            loginState: {
                ...prevState.loginState,
                idRemember: checked,
            },
        }));
    };

    const HandleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const inputName = (e.target as HTMLInputElement).name;
        if (inputName === 'email') {
            enterInputRef.current[1].focus();
        } else if (inputName === 'password') {
            enterInputRef.current[0].focus();
            login();
        }
    };

    useEffect(() => {
        if (atomRootState.loginState) {
            HandleMainAlert({
                state: true,
                type: `move`,
                message: Messages.Common.alreadyLogin,
                action: `/bora/messenger`,
            });
        }
        // FIXME : 종속성에서 로그인성공시 alert 작동으로 인해 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const pageStart = () => {
            const loginId = storageMaster.get(Const.Naming.rememberId);
            if (loginId && emailValidate(loginId)) {
                setPageState(prevState => ({
                    ...prevState,
                    loginState: {
                        ...prevState.loginState,
                        email: loginId,
                        idRemember: true,
                    },
                }));
            }
        };

        pageStart();
    }, []);

    return (
        <>
            <LoginSection
                Loading={pageState.loading}
                InputValue={pageState.loginState}
                CheckState={pageState.checkState}
                LoginHandler={e => loginHandler(e)}
                HandleIdRemember={check => handleIdRemember(check)}
                PasswordResetClick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/auth/password-reset` })}
                LoginButtonClick={() => login()}
                JoinButtonClick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/auth/register` })}
                EnterRef={enterInputRef}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
            />
        </>
    );
};

export default LoginMain;

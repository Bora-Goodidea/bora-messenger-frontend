import { LayoutStyles } from '@Styles';
import { LoginSection } from '.';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '@Hooks';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AuthService } from '@Module/index';
import Messages from '@Messages';
import { emailValidate, storageMaster } from '@Helper';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

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

        const { status, message } = await loginStatus(email, password);

        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }));

        if (status) {
            if (pageState.loginState.idRemember) {
                storageMaster.set(`boraLoginId`, email);
            } else {
                storageMaster.remove(`boraLoginId`);
            }

            HandleMainAlert({
                state: true,
                type: `move`,
                message: Messages.Common.successLogin,
                action: `/bora/messenger`,
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
        const pageStart = () => {
            const loginId = storageMaster.get(`boraLoginId`);
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
        <MainContainer>
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
        </MainContainer>
    );
};

export default LoginMain;

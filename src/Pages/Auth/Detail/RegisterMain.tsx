import { LayoutStyles } from '@Styles';
import { RegisterSection } from '.';
import { KeyboardEvent, useRef, useState } from 'react';
import { emailValidate } from '@Helper';
import { AuthService } from '@Module/index';
import { useLayout } from '@Hooks';
import { useNavigate } from 'react-router-dom';
import Messages from '@Messages';

const { EmailCheckStatus, NicknameCheckStatus, joinupStatus } = AuthService;

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const pageInitializeState = {
    loading: false,
    checkState: {
        status: false,
        type: null,
        message: ``,
    },
    joinupState: {
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
    },
};

const RegisterMain = () => {
    const { HandleMainAlert } = useLayout();
    const navigate = useNavigate();
    const enterInputRef = useRef<HTMLInputElement[]>([]);

    const [pageState, setPageState] = useState<{
        loading: boolean;
        checkState: {
            status: boolean;
            type: null | string | `email` | `password` | `passwordConfirm` | `nickname`;
            message: string;
        };
        joinupState: {
            email: string;
            password: string;
            passwordConfirm: string;
            nickname: string;
        };
    }>(pageInitializeState);

    const joinupHandler = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setPageState(prev => ({
            ...prev,
            joinupState: {
                ...prev.joinupState,
                [name]: value,
            },
        }));
    };

    const emailCheck = async () => {
        const email = pageState.joinupState.email;

        const { status, payload } = await EmailCheckStatus(email);

        if (status) {
            if (payload.exist) {
                setPageState(prev => ({
                    ...prev,
                    checkState: {
                        ...prev.checkState,
                        status: true,
                        type: `email`,
                        message: Messages.Common.existsEmail,
                    },
                }));
            }
            return;
        }
        return;
    };

    const nicknameCheck = async () => {
        const nickname = pageState.joinupState.nickname;

        const { status, payload } = await NicknameCheckStatus(nickname);

        if (status) {
            if (payload.exist) {
                setPageState(prev => ({
                    ...prev,
                    checkState: {
                        ...prev.checkState,
                        status: true,
                        type: `nickname`,
                        message: Messages.Common.existsNickname,
                    },
                }));
                return;
            } else {
                await joinupCheck();
            }
        }
    };

    const joinupCheck = async () => {
        const email = pageState.joinupState.email;
        const password = pageState.joinupState.password;
        const nickname = pageState.joinupState.nickname;

        const { status, payload, message } = await joinupStatus(email, password, nickname);

        if (status) {
            if (!payload) {
                setPageState(prev => ({
                    ...prev,
                    checkState: {
                        ...prev.checkState,
                        status: true,
                        message: message,
                    },
                }));
                return;
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    joinupState: pageInitializeState.joinupState,
                }));
                HandleMainAlert({
                    state: true,
                    type: `move`,
                    message: Messages.Common.successJoinup,
                    action: `/auth/login`,
                });
            }
        }
    };

    const joinUp = () => {
        if (!pageState.joinupState.email) {
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

        const email = pageState.joinupState.email;

        if (!emailValidate(email)) {
            //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `email`,
                    message: Messages.Common.emailValidate,
                },
            }));
            return;
        }

        emailCheck().then();

        if (!pageState.joinupState.password) {
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

        if (pageState.joinupState.password.length < 4 || pageState.joinupState.password.length > 15) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `password`,
                    message: Messages.Common.passwordLength,
                },
            }));
            return;
        }

        if (!pageState.joinupState.passwordConfirm) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `passwordConfirm`,
                    message: Messages.Common.emptyPasswordConfirm,
                },
            }));
            return;
        }

        if (pageState.joinupState.password !== pageState.joinupState.passwordConfirm) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `passwordConfirm`,
                    message: Messages.Common.passwordConfirm,
                },
            }));
            return;
        }

        if (!pageState.joinupState.nickname) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `nickname`,
                    message: Messages.Common.emptyNickname,
                },
            }));
            return;
        }

        nicknameCheck().then();
    };

    const handleJoinupButtonClick = () => {
        setPageState(prevState => ({
            ...prevState,
            checkState: pageInitializeState.checkState,
        }));
        joinUp();
    };

    const handleLoginButtonClick = () => {
        navigate({
            pathname: process.env.PUBLIC_URL + `/auth/login`,
        });
    };

    const HandleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const inputName = (e.target as HTMLInputElement).name;
        if (inputName === 'email') {
            enterInputRef.current[1].focus();
        } else if (inputName === 'password') {
            enterInputRef.current[2].focus();
        } else if (inputName === 'passwordConfirm') {
            enterInputRef.current[3].focus();
        } else if (inputName === 'nickname') {
            enterInputRef.current[0].focus();
            handleJoinupButtonClick();
        }
    };

    return (
        <MainContainer>
            <RegisterSection
                Loading={pageState.loading}
                InputValue={pageState.joinupState}
                CheckState={pageState.checkState}
                JoinupHandler={e => joinupHandler(e)}
                HandleJoinupButtonClick={() => handleJoinupButtonClick()}
                LoginButtonClick={() => handleLoginButtonClick()}
                EnterRef={enterInputRef}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
            />
        </MainContainer>
    );
};

export default RegisterMain;

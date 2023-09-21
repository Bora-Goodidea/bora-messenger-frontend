import React, { ChangeEvent, useEffect, useState, useRef, KeyboardEvent, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutStyles } from '@Styles';
import { PasswordChangeSection } from '.';
import { AuthService } from '@Modules';
import Messages from '@Messages';

const { PasswordResetCodeCheck, PasswordChange } = AuthService;

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const pageInitializeState = {
    pageLoading: true,
    changeLoading: false,
    resetCode: '',
    input: {
        password: ``,
        passwordConfirm: ``,
    },
    inputError: {
        status: false,
        type: null,
        message: ``,
    },
};

const PasswordChangeMain = () => {
    const params = useParams<{ ResetCode: string | undefined }>();
    const navigate = useNavigate();
    const enterInputRef = useRef<HTMLInputElement[]>([]);
    const [pageState, setPageState] = useState<{
        pageLoading: boolean;
        changeLoading: boolean;
        resetCode: string;
        input: {
            password: string;
            passwordConfirm: string;
        };
        inputError: {
            status: boolean;
            type: null | string | `email` | `password` | `passwordConfirm` | `nickname`;
            message: string;
        };
    }>(pageInitializeState);

    const handlePasswordResetCodeCheck = useCallback(
        async (code: string) => {
            const { status, message } = await PasswordResetCodeCheck({ resetCode: code });
            if (status) {
                setPageState(prevState => ({
                    ...prevState,
                    pageLoading: false,
                    resetCode: code,
                }));
            } else {
                alert(message);
                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/login`,
                });
            }
        },
        [navigate]
    );

    const handlePasswordChange = async () => {
        setPageState(prevState => ({
            ...prevState,
            changeLoading: true,
        }));
        const { status, message } = await PasswordChange({ password: pageState.input.password, resetCode: pageState.resetCode });
        if (status) {
            alert(Messages.Common.success);
        } else {
            alert(message);
        }

        setPageState(prevState => ({
            ...prevState,
            changeLoading: false,
        }));
    };

    const handleClickButton = () => {
        if (!pageState.input.password) {
            setPageState(prevState => ({
                ...prevState,
                inputError: {
                    ...prevState.inputError,
                    status: true,
                    type: `password`,
                    message: Messages.Common.emptyPassword,
                },
            }));
            return;
        }

        if (!(pageState.input.password.length >= 4 && pageState.input.password.length < 15)) {
            setPageState(prevState => ({
                ...prevState,
                inputError: {
                    ...prevState.inputError,
                    status: true,
                    type: `password`,
                    message: Messages.Common.passwordLength,
                },
            }));
            return;
        }

        if (!pageState.input.passwordConfirm) {
            setPageState(prevState => ({
                ...prevState,
                inputError: {
                    ...prevState.inputError,
                    status: true,
                    type: `passwordConfirm`,
                    message: Messages.Common.emptyPasswordConfirm,
                },
            }));
            return;
        }

        if (pageState.input.password !== pageState.input.passwordConfirm) {
            setPageState(prevState => ({
                ...prevState,
                inputError: {
                    ...prevState.inputError,
                    status: true,
                    type: `passwordConfirm`,
                    message: Messages.Common.passwordConfirm,
                },
            }));
            return;
        }

        setPageState(prevState => ({
            ...prevState,
            inputError: {
                ...prevState.inputError,
                status: false,
                type: null,
                message: ``,
            },
        }));

        handlePasswordChange().then(() => {
            navigate({
                pathname: process.env.PUBLIC_URL + `/auth/login`,
            });
        });
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPageState(prevState => ({
            ...prevState,
            input: {
                ...prevState.input,
                [name]: value,
            },
        }));
    };

    const HandleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const inputName = (e.target as HTMLInputElement).name;
        if (inputName === 'password') {
            enterInputRef.current[1].focus();
        } else if (inputName === 'passwordConfirm') {
            handleClickButton();
        }
    };

    useEffect(() => {
        const pageStart = (code: string) => {
            handlePasswordResetCodeCheck(code).then();
        };

        if (params.ResetCode) {
            pageStart(params.ResetCode);
        }
    }, [handlePasswordResetCodeCheck, params]);

    return (
        <MainContainer>
            <PasswordChangeSection
                PageLoading={pageState.pageLoading}
                PasswordValue={pageState.input.password}
                PasswordConfirmValue={pageState.input.passwordConfirm}
                HandleOnChange={e => handleOnChange(e)}
                InputError={pageState.inputError}
                EnterRef={enterInputRef}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
                HandleClickButton={() => handleClickButton()}
                ChangeLoading={pageState.changeLoading}
            />
        </MainContainer>
    );
};

export default PasswordChangeMain;

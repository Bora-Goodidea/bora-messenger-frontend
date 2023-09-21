import { useState, KeyboardEvent } from 'react';
import { LayoutStyles } from '@Styles';
import { PasswordResetSection } from '.';
import { emailValidate } from '@Helper';
import { AuthService } from '@Modules';
import Messages from '@Messages';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '@Hooks';

const { PasswordReset } = AuthService;

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const pageInitializeState = {
    loading: false,
    email: ``,
};

const PasswordResetMain = () => {
    const [pageState, setPageState] = useState<{
        loading: boolean;
        email: string;
    }>(pageInitializeState);
    const navigate = useNavigate();
    const { HandleMainAlert } = useLayout();

    const handlePasswordReset = async () => {
        const { email } = pageState;

        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }));

        const { status, message, payload } = await PasswordReset({ email: email });
        if (status) {
            HandleMainAlert({
                state: true,
                message: Messages.Common.success,
            });

            if (process.env.REACT_APP_ENV === 'local') {
                navigate({
                    pathname: process.env.PUBLIC_URL + `/auth/${payload.resetcode}/password-change`,
                });
            }
        } else {
            HandleMainAlert({
                state: true,
                message: message,
            });
        }

        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }));
    };

    const handleClickButton = () => {
        const { email } = pageState;

        if (email === '') {
            HandleMainAlert({
                state: true,
                message: Messages.Common.emptyEmail,
            });
            return;
        }

        if (emailValidate(email)) {
            handlePasswordReset().then();
        } else {
            HandleMainAlert({
                state: true,
                message: Messages.Common.emailValidate,
            });
            return;
        }
    };

    const HandleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        handleClickButton();
    };

    return (
        <MainContainer>
            <PasswordResetSection
                Loading={pageState.loading}
                InputValue={pageState.email}
                HandleOnChange={v =>
                    setPageState(prevState => ({
                        ...prevState,
                        email: v,
                    }))
                }
                HandleClickButton={() => handleClickButton()}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
            />
        </MainContainer>
    );
};

export default PasswordResetMain;

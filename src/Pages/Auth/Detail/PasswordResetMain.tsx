import { useState, KeyboardEvent } from 'react';
import { PasswordResetSection } from '.';
import { emailValidate } from '@Helper';
import { AuthService } from '@Modules';
import Messages from '@Messages';
import { useLayout } from '@Hooks';

const { PasswordReset } = AuthService;

const pageInitializeState = {
    loading: false,
    email: ``,
};

const PasswordResetMain = () => {
    const [pageState, setPageState] = useState<{
        loading: boolean;
        email: string;
    }>(pageInitializeState);
    const { HandleMainAlert } = useLayout();

    const handlePasswordReset = async () => {
        const { email } = pageState;

        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }));

        const { status, message, payload } = await PasswordReset({ email: email });
        if (status) {
            if (process.env.REACT_APP_ENV === 'local') {
                HandleMainAlert({
                    state: true,
                    type: `move`,
                    message: Messages.Common.passwordResetSuccess,
                    action: `/auth/${payload.resetcode}/password-change`,
                });
            } else {
                HandleMainAlert({
                    state: true,
                    type: `move`,
                    message: Messages.Common.passwordResetSuccess,
                    action: `/auth/login`,
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
    );
};

export default PasswordResetMain;

import { useSetRecoilState } from 'recoil';
import lodash from 'lodash';
import { getAccessToken, getRefreshToken, saveRefreshToken, removeLoginToken } from '@Helper';
import { AtomRootState } from '@Recoil/AppRootState';
import AuthService from '@Module/Auth.Service';

const { getTokenInfo } = AuthService;

export default function useAuth() {
    const setAtomRootState = useSetRecoilState(AtomRootState);

    const handleAuthTokenSave = ({ access_token, refresh_token }: { access_token: string; refresh_token: string }) => {
        saveRefreshToken({ accessToken: access_token, refreshToken: refresh_token });
    };

    const handleAuthCkeck = async ({ tokenCheck }: { tokenCheck: boolean }): Promise<boolean> => {
        const access_token = getAccessToken();
        const refresh_token = getRefreshToken();

        if (lodash.isEmpty(access_token) || lodash.isEmpty(refresh_token)) {
            setAtomRootState(prevState => ({
                ...prevState,
                loginState: false,
                systemStatus: {
                    ...prevState.systemStatus,
                    login: true,
                },
            }));

            return false;
        }

        if (tokenCheck) {
            const { status } = await getTokenInfo();
            if (!status) {
                setAtomRootState(prevState => ({
                    ...prevState,
                    loginState: false,
                    systemStatus: {
                        ...prevState.systemStatus,
                        login: true,
                    },
                }));

                return false;
            }
        }

        setAtomRootState(prevState => ({
            ...prevState,
            loginState: true,
            systemStatus: {
                ...prevState.systemStatus,
                login: true,
            },
        }));
        return true;
    };

    const handleLogOut = () => {
        removeLoginToken();

        setAtomRootState(prevState => ({
            ...prevState,
            loginState: false,
        }));
    };

    return {
        handleAuthTokenSave,
        handleAuthCkeck,
        handleLogOut,
    };
}

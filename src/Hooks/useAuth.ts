import { useSetRecoilState } from 'recoil';
import lodash from 'lodash';
import { storageMaster } from '@Helper';
import { AtomRootState } from '@Recoil/AppRootState';

export default function useAuth() {
    const setAtomRootState = useSetRecoilState(AtomRootState);

    const handleAuthTokenSave = ({ access_token, refresh_token }: { access_token: string; refresh_token: string }) => {
        storageMaster.set('access_token', access_token);
        storageMaster.set('refresh_token', refresh_token);
    };

    const handleAuthCkeck = (): boolean => {
        const access_token = storageMaster.get('access_token');
        const refresh_token = storageMaster.get('refresh_token');

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
        storageMaster.remove('access_token');
        storageMaster.remove('refresh_token');

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

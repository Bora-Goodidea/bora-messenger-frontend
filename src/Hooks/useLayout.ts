import { useSetRecoilState } from 'recoil';
import { AtomLayoutState } from '@Recoil/LayoutState';

export default function useLayout() {
    const setAtomLayoutState = useSetRecoilState(AtomLayoutState);

    const HandleMainAlert = ({
        type,
        state,
        message,
        action,
    }: {
        type?: string | `move` | `default`;
        state: boolean;
        message?: string;
        action?: string;
    }) => {
        setAtomLayoutState(prevState => ({
            ...prevState,
            mainAlert: {
                ...prevState.mainAlert,
                state: state,
                type: type ? type : `default`,
                message: message ? message : ``,
                action: action ? action : ``,
            },
        }));
    };

    return {
        HandleMainAlert,
    };
}

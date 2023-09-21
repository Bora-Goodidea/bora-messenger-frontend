import { useSetRecoilState } from 'recoil';
import { AtomLayoutState } from '@Recoil/LayoutState';

export default function useLayout() {
    const setAtomLayoutState = useSetRecoilState(AtomLayoutState);

    const HandleMainAlert = ({ state, message }: { state: boolean; message?: string }) => {
        setAtomLayoutState(prevState => ({
            ...prevState,
            mainAlert: {
                ...prevState.mainAlert,
                state: state,
                message: message ? message : ``,
            },
        }));
    };

    return {
        HandleMainAlert,
    };
}

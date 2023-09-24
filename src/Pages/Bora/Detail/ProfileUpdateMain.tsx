import { LayoutStyles } from '@Styles';
import { useLayout } from '@Hooks';
import ProfileUpdateSection from './ProfileUpdateSection';
import { KeyboardEvent, useEffect, useRef, useState, useCallback } from 'react';
import { ProfileService } from '@Modules';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { MyProfile } = ProfileService;

const pageInitializeState = {
    loading: true,
    checkState: {
        status: false,
        type: null,
        message: ``,
    },
    profileState: {
        profileImage: '',
        email: '',
        nickname: '',
    },
};

const ProfileUpdateMain = () => {
    const { HandleMainAlert } = useLayout();
    const enterInputRef = useRef<HTMLInputElement[]>([]);

    const [pageState, setPageState] = useState<{
        loading: boolean;
        checkState: {
            status: boolean;
            type: null | string | `profileImage` | `email` | `nickname`;
            message: string;
        };
        profileState: {
            profileImage: string;
            email: string;
            nickname: string;
        };
    }>(pageInitializeState);

    const handleGetMyProfileData = useCallback(async () => {
        const { status, payload, message } = await MyProfile();
        if (status) {
            setPageState(prev => ({
                ...prev,
                profileState: {
                    ...prev.profileState,
                    email: payload.email,
                },
            }));
        } else {
            HandleMainAlert({
                state: true,
                message: message,
            });
        }
    }, [HandleMainAlert]);

    const handleProfileUpdateChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setPageState(prev => ({
            ...prev,
            profileState: {
                ...prev.profileState,
                [name]: value,
            },
        }));
    };

    const HandleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const inputName = (e.target as HTMLInputElement).name;
        if (inputName === 'email') {
            enterInputRef.current[1].focus();
        }
    };

    useEffect(() => {
        const pageStart = () => {
            handleGetMyProfileData().then();
        };
        pageStart();
    }, [handleGetMyProfileData]);

    return (
        <MainContainer>
            <ProfileUpdateSection
                Loading={pageState.loading}
                InputValue={pageState.profileState}
                CheckState={pageState.checkState}
                handleProfileUpdateChange={e => handleProfileUpdateChange(e)}
                EnterRef={enterInputRef}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
            />
        </MainContainer>
    );
};

export default ProfileUpdateMain;

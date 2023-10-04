import { LayoutStyles } from '@Styles';
import { useLayout } from '@Hooks';
import ProfileUpdateSection from './ProfileUpdateSection';
import { KeyboardEvent, useEffect, useRef, useState, useCallback } from 'react';
import { ProfileService } from '@Modules';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { MyProfile, ImageCreate } = ProfileService;

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
            return;
        } // eslint-disable-next-line
    }, []);

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

    const handleImgUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }));

        const files = e.target.files as FileList;

        if (files.length > 0) {
            const formData = new FormData();
            formData.append('image', files[0]);

            const { status, payload, message } = await ImageCreate(formData);
            console.log('Response:', status, payload, message);
        }

        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }));
    };

    useEffect(() => {
        const pageStart = () => {
            handleGetMyProfileData().then();
        };
        pageStart();
    }, [handleGetMyProfileData]);

    // useEffect(() => {
    //     handleGetMyProfileData().then();
    // }, []);

    return (
        <MainContainer>
            <ProfileUpdateSection
                Loading={pageState.loading}
                InputValue={pageState.profileState}
                CheckState={pageState.checkState}
                handleProfileUpdateChange={e => handleProfileUpdateChange(e)}
                EnterRef={enterInputRef}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
                handleImgUploadChange={e => handleImgUploadChange(e)}
            />
        </MainContainer>
    );
};

export default ProfileUpdateMain;

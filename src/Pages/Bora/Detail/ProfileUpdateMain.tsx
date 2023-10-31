import { LayoutStyles } from '@Styles';
import { useLayout } from '@Hooks';
import ProfileUpdateSection from './ProfileUpdateSection';
import { KeyboardEvent, useEffect, useRef, useState, useCallback } from 'react';
import { ProfileService } from '@Modules';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { MyProfile, ImageCreate, ProfileUpdate } = ProfileService;

const pageInitializeState = {
    profileState: {
        profileImage: {
            id: null,
            url: '',
        },
        email: '',
        nickname: '',
    },
};

const ProfileUpdateMain = () => {
    const { HandleMainAlert } = useLayout();
    const enterInputRef = useRef<HTMLInputElement[]>([]);

    const [pageState, setPageState] = useState<{
        profileState: {
            profileImage: {
                id: number | null;
                url: string;
            };
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
                    nickname: payload.nickname,
                    profileImage: {
                        id: payload.profile_image.id,
                        url: payload.profile_image.url,
                    },
                },
            }));
        } else {
            HandleMainAlert({
                state: true,
                message: message,
            });
            return;
        }

        // FIXME : 종속성에서 HandleMainAlert 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            if (status) {
                setPageState(prev => ({
                    ...prev,
                    profileState: {
                        ...prev.profileState,
                        profileImage: {
                            id: payload.id,
                            url: payload.media_url,
                        },
                    },
                }));
            } else {
                HandleMainAlert({
                    state: true,
                    message: message,
                });
                return;
            }
        }

        setPageState(prevState => ({
            ...prevState,
            loading: false,
        }));
    };

    const handleProfileUpdateSubmit = async () => {
        setPageState(prevState => ({
            ...prevState,
            loading: true,
        }));
        const { status, message } = await ProfileUpdate(pageState.profileState.profileImage.id, pageState.profileState.nickname);
        if (status) {
            HandleMainAlert({
                state: true,
                message: '프로필을 수정하였습니다.',
            });
            handleGetMyProfileData().then();
        } else {
            HandleMainAlert({
                state: true,
                message: message,
            });
            return;
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

    return (
        <MainContainer>
            <ProfileUpdateSection
                InputValue={pageState.profileState}
                handleProfileUpdateChange={e => handleProfileUpdateChange(e)}
                EnterRef={enterInputRef}
                HandleOnKeyDown={e => HandleOnKeyDown(e)}
                handleImgUploadChange={e => handleImgUploadChange(e)}
                handleProfileUpdateSubmit={() => handleProfileUpdateSubmit()}
            />
        </MainContainer>
    );
};

export default ProfileUpdateMain;

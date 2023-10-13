import { LayoutStyles } from '@Styles';
import { useLayout } from '@Hooks';
import ProfileSection from './ProfileSection';
import { useEffect, useState, useCallback } from 'react';
import { ProfileService } from '@Modules';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { MyProfile } = ProfileService;

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

    useEffect(() => {
        const pageStart = () => {
            handleGetMyProfileData().then();
        };
        pageStart();
    }, [handleGetMyProfileData]);

    return (
        <MainContainer>
            <ProfileSection InputValue={pageState.profileState} />
        </MainContainer>
    );
};

export default ProfileUpdateMain;

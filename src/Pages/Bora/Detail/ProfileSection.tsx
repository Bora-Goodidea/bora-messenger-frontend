import { PageStyles } from '@Styles';
import { useParams } from 'react-router-dom';
import { ProfileService } from '@Modules';
import { useLayout } from '@Hooks';
import { useEffect, useState, useCallback } from 'react';

const { YourProfile } = ProfileService;

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

const {
    Container,
    Wapper,
    FormWapper,
    FormBox,
    TitleBox,
    AuthForm,
    InputItem,
    InputLabel,
    Input,
    ProfileImageForm,
    ProfileImage,
    DefaultProfileImage,
} = PageStyles.Bora.ProfileStyles;

const ProfileSection = () => {
    const { profileUid } = useParams();
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

    const handleGetYourProfileData = useCallback(async (profileUid: string) => {
        const { status, payload, message } = await YourProfile({ profileUid: profileUid });
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
            if (profileUid) {
                handleGetYourProfileData(profileUid).then();
            }
        };
        pageStart();
    }, [handleGetYourProfileData, profileUid]);

    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>프로필</TitleBox>
                        <ProfileImageForm>
                            <ProfileImage>
                                <DefaultProfileImage src={pageState.profileState.profileImage.url} />
                            </ProfileImage>
                            <AuthForm>
                                <InputItem>
                                    <Input
                                        type="text"
                                        name="nickname"
                                        id="nickname"
                                        required={false}
                                        value={pageState.profileState.nickname}
                                        readOnly
                                    />
                                </InputItem>
                            </AuthForm>
                        </ProfileImageForm>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input type="text" name="email" id="email" value={pageState.profileState.email} readOnly />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">최근 접속 정보</InputLabel>
                                <Input
                                    type="text"
                                    name="latestLogin"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.profileState.nickname}
                                    readOnly
                                />
                            </InputItem>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default ProfileSection;

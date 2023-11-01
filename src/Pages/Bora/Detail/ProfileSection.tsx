import { PageStyles } from '@Styles';
import { useParams } from 'react-router-dom';
import { ProfileService } from '@Modules';
import { useLayout } from '@Hooks';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const { YourProfile } = ProfileService;

const pageInitializeState = {
    profileState: {
        profileImage: {
            id: null,
            url: '',
        },
        email: '',
        nickname: '',
        active: ``,
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
    Button,
} = PageStyles.Bora.ProfileStyles;

const ProfileSection = () => {
    const navigate = useNavigate();
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
            active: string;
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
                    active: payload.active,
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
                            <div className="pl-10 w-full">
                                <InputLabel htmlFor="nickname">닉네임</InputLabel>
                                <InputItem>
                                    <Input
                                        type="text"
                                        name="nickname"
                                        id="nickname"
                                        required={false}
                                        defaultValue={pageState.profileState.nickname}
                                    />
                                </InputItem>
                            </div>
                        </ProfileImageForm>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input type="text" name="email" id="email" defaultValue={pageState.profileState.email} readOnly />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="latestLogin">최근 접속 정보</InputLabel>
                                <Input
                                    type="text"
                                    name="latestLogin"
                                    id="latestLogin"
                                    placeholder="••••••••"
                                    required={false}
                                    defaultValue={pageState.profileState.active}
                                />
                            </InputItem>
                        </AuthForm>
                        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default ProfileSection;

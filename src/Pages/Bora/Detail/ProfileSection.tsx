import { PageStyles } from '@Styles';

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

const ProfileUpdateSection = ({
    InputValue,
}: {
    InputValue: { profileImage: { id: number | null; url: string }; email: string; nickname: string };
}) => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>프로필</TitleBox>
                        <ProfileImageForm>
                            <ProfileImage>
                                <DefaultProfileImage src={InputValue.profileImage.url} />
                            </ProfileImage>
                            <AuthForm>
                                <InputItem>
                                    <Input
                                        type="text"
                                        name="nickname"
                                        id="nickname"
                                        required={false}
                                        value={InputValue.nickname}
                                        readOnly
                                    />
                                </InputItem>
                            </AuthForm>
                        </ProfileImageForm>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input type="text" name="email" id="email" value={InputValue.email} readOnly />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">최근 접속 정보</InputLabel>
                                <Input
                                    type="text"
                                    name="latestLogin"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    value={InputValue.nickname}
                                />
                            </InputItem>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default ProfileUpdateSection;

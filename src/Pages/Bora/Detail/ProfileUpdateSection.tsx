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
    Button,
    ProfileImageForm,
    ProfileImage,
    DefaultProfileImage,
    ProfileInputItem,
    ProfileInputLabel,
} = PageStyles.Bora.ProfileUpdateStyles;

const ProfileUpdateSection = () => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>프로필 수정</TitleBox>
                        <ProfileImageForm>
                            <ProfileImage>
                                <DefaultProfileImage src="http://psmever.iptime.org:8052/profile/default_profile.jpg" />
                            </ProfileImage>
                            <ProfileInputItem type="file" id="uploadProfile" accept="image/*" />
                            <ProfileInputLabel htmlFor="uploadProfile">프로필사진 바꾸기</ProfileInputLabel>
                        </ProfileImageForm>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input type="email" name="email" id="email" placeholder="name@company.com" required={false} value={''} />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">닉네임</InputLabel>
                                <Input type="nickname" name="nickname" id="nickname" placeholder="••••••••" required={false} />
                            </InputItem>
                            <Button onClick={() => console.log()}>프로필 수정</Button>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default ProfileUpdateSection;

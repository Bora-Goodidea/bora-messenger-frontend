import { PageStyles } from '@Styles';
import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';

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

const ProfileUpdateSection = ({
    // Loading,
    InputValue,
    // CheckState,
    handleProfileUpdateChange,
    EnterRef,
    HandleOnKeyDown,
}: {
    Loading: boolean;
    InputValue: { profileImage: string; email: string; nickname: string };
    handleProfileUpdateChange: (event: ChangeEvent<HTMLInputElement>) => void;
    CheckState: { status: boolean; type: null | string | `profileImage` | `email` | `nickname`; message: string };
    EnterRef: MutableRefObject<HTMLInputElement[]>;
    HandleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}) => {
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
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={InputValue.email}
                                    ref={el => (EnterRef.current[0] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                    style={{ color: 'gray' }}
                                    readOnly
                                />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">닉네임</InputLabel>
                                <Input
                                    type="nickname"
                                    name="nickname"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    value={InputValue.nickname}
                                    onChange={e => handleProfileUpdateChange(e)}
                                    ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                />
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

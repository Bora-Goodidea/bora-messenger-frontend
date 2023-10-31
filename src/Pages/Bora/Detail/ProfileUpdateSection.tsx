import { PageStyles } from '@Styles';
import { ChangeEvent, KeyboardEvent, MutableRefObject, useRef } from 'react';

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
    InputValue,
    handleProfileUpdateChange,
    EnterRef,
    HandleOnKeyDown,
    handleImgUploadChange,
    handleProfileUpdateSubmit,
}: {
    InputValue: { profileImage: { id: number | null; url: string }; email: string; nickname: string };
    handleProfileUpdateChange: (event: ChangeEvent<HTMLInputElement>) => void;
    EnterRef: MutableRefObject<HTMLInputElement[]>;
    HandleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    handleImgUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProfileUpdateSubmit: () => void;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>프로필 수정</TitleBox>
                        <ProfileImageForm>
                            <ProfileImage>
                                <DefaultProfileImage src={InputValue.profileImage.url} />
                            </ProfileImage>
                            <ProfileInputItem
                                type="file"
                                id="uploadProfile"
                                accept="image/*"
                                onChange={e => handleImgUploadChange(e)}
                                ref={fileInputRef}
                            />
                            <ProfileInputLabel htmlFor="uploadProfile">프로필사진 바꾸기</ProfileInputLabel>
                        </ProfileImageForm>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input
                                    type="text"
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
                                    type="text"
                                    name="nickname"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    onChange={e => handleProfileUpdateChange(e)}
                                    ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                    value={InputValue.nickname}
                                />
                            </InputItem>
                            <Button onClick={() => handleProfileUpdateSubmit()}>프로필 수정</Button>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default ProfileUpdateSection;

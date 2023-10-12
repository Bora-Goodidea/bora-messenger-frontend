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
} = PageStyles.Bora.ProfileStyles;

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
                                    {/* <InputLabel htmlFor="nickname">닉네임</InputLabel> */}
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
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={InputValue.email}
                                    ref={el => (EnterRef.current[0] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
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
                                    value={InputValue.nickname}
                                    onChange={e => handleProfileUpdateChange(e)}
                                    ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">최근 접속정보</InputLabel>
                                <Input
                                    type="text"
                                    name="latestLogin"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    value={InputValue.nickname}
                                    onChange={e => handleProfileUpdateChange(e)}
                                    ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
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

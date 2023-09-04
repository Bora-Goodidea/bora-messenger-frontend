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
    AuthButton,
    Button,
    AuthText,
    ErrorMessage,
} = PageStyles.Auth.AuthStyles;

const RegisterSection = () => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>회원 가입</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input type="email" name="email" id="email" placeholder="name@company.com" required={false} />
                                <ErrorMessage>이미 사용중인 이메일 주소 입니다.</ErrorMessage>
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="password">비밀 번호</InputLabel>
                                <Input type="password" name="password" id="password" placeholder="••••••••" required={false} />
                                <ErrorMessage>패스워드는 4~15자 이내여야 합니다.</ErrorMessage>
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="confirm-password">비밀 번호 확인</InputLabel>
                                <Input
                                    type="confirm-password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    required={false}
                                />
                                <ErrorMessage>패스워드를 확인해 주세요</ErrorMessage>
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="confirm-password">닉네임</InputLabel>
                                <Input
                                    type="confirm-password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    required={false}
                                />
                                <ErrorMessage>이미 사용중인 닉네임 입니다.</ErrorMessage>
                            </InputItem>
                            <Button>회원 가입</Button>
                            <AuthButton>
                                아이디가 존재 한가요?
                                <AuthText>로그인</AuthText>
                            </AuthButton>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default RegisterSection;

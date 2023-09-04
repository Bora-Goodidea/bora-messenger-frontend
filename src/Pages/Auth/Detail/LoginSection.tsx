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
    ManagerWapper,
    RememberId,
    CheckBoxWapper,
    RememberTextWapper,
    RememberTextLabel,
    RememberCheckBox,
    ErrorMessage,
    AuthText,
    Button,
    AuthButton,
} = PageStyles.Auth.AuthStyles;

const LoginSection = () => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>로그인</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel htmlFor="email">이메일</InputLabel>
                                <Input type="email" name="email" id="email" placeholder="name@company.com" required={false} />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="password">비밀번호</InputLabel>
                                <Input type="password" name="password" id="password" placeholder="••••••••" required={false} />
                                <ErrorMessage>패스워드를 확인해 주세요</ErrorMessage>
                            </InputItem>
                            <ManagerWapper>
                                <RememberId>
                                    <CheckBoxWapper>
                                        <RememberCheckBox id="remember" aria-describedby="remember" type="checkbox" required={false} />
                                    </CheckBoxWapper>
                                    <RememberTextWapper>
                                        <RememberTextLabel htmlFor="remember">아이디 기억</RememberTextLabel>
                                    </RememberTextWapper>
                                </RememberId>
                                <AuthText>비밀번호를 잊으셨나요?</AuthText>
                            </ManagerWapper>
                            <Button>로그인</Button>
                            <AuthButton>
                                아직 계정이 없으신가요?
                                <AuthText>회원 가입</AuthText>
                            </AuthButton>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default LoginSection;

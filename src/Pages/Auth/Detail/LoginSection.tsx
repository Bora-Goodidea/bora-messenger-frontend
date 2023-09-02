import { PageStyles } from '@Styles';

const {
    Container,
    Wapper,
    FormWapper,
    FormBox,
    TitleBox,
    LoginForm,
    InputItem,
    InputLabel,
    Input,
    ManagerWapper,
    RememberId,
    CheckBoxWapper,
    RememberTextWapper,
    RememberTextLabel,
    RememberCheckBox,
    RememberText,
    LoginButton,
    RegisterButton,
    RegisterText,
    ErrorMessage,
} = PageStyles.AuthStyles.LoginPageStyles;

const LoginSection = () => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>로그인</TitleBox>
                        <LoginForm>
                            <InputItem>
                                <InputLabel htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    이메일
                                </InputLabel>
                                <Input type="email" name="email" id="email" placeholder="name@company.com" required={false} />
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    비밀번호
                                </InputLabel>
                                <Input type="password" name="password" id="password" placeholder="••••••••" required={false} />
                                <ErrorMessage>패스워드를 확인해 주세요</ErrorMessage>
                            </InputItem>
                            <ManagerWapper>
                                <RememberId>
                                    <CheckBoxWapper className="flex items-center h-5">
                                        <RememberCheckBox id="remember" aria-describedby="remember" type="checkbox" required={false} />
                                    </CheckBoxWapper>
                                    <RememberTextWapper className="ml-3 text-sm">
                                        <RememberTextLabel htmlFor="remember">아이디 기억</RememberTextLabel>
                                    </RememberTextWapper>
                                </RememberId>
                                <RememberText>비밀번호를 잊으셨나요?</RememberText>
                            </ManagerWapper>
                            <LoginButton type="submit">로그인</LoginButton>
                            <RegisterButton>
                                아직 계정이 없으신가요?
                                <RegisterText>회원 가입</RegisterText>
                            </RegisterButton>
                        </LoginForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default LoginSection;

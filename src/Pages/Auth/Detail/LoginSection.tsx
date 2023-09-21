import { PageStyles } from '@Styles';
import { /*useEffect, */ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@Modules';

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

const { loginStatus } = AuthService;

const pageInitializeState = {
    checkState: {
        status: false,
        type: null,
        message: '',
    },
    loginState: {
        email: '',
        password: '',
        idRemember: true,
    },
};

const LoginSection = () => {
    const navigate = useNavigate();

    const [pageState, setPageState] = useState<{
        checkState: {
            status: boolean;
            type: null | string | `email` | `password` | `passwordConfirm` | `nickname`;
            message: string;
        };
        loginState: {
            email: string;
            password: string;
            idRemember: boolean;
        };
    }>(pageInitializeState);

    const loginHandler = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setPageState(prev => ({
            ...prev,
            loginState: {
                ...prev.loginState,
                [name]: value,
            },
        }));
    };

    const loginCheck = async () => {
        const email = pageState.loginState.email;
        const password = pageState.loginState.password;

        const { status, message } = await loginStatus(email, password);

        if (status) {
            setPageState(prevState => ({
                ...prevState,
                joinupState: pageInitializeState.loginState,
            }));
            navigate('/bora/messenger');
        } else {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `password`,
                    message: message,
                },
            }));
            alert(message);
        }
    };

    const login = () => {
        if (!pageState.loginState.email) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `email`,
                    message: `이메일을 입력해 주세요`,
                },
            }));
            return;
        }

        if (!pageState.loginState.password) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `password`,
                    message: `비밀번호를 입력해 주세요`,
                },
            }));
            return;
        }

        loginCheck();
    };

    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>로그인</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel htmlFor="email">이메일</InputLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    required={false}
                                    value={pageState.loginState.email}
                                    onChange={loginHandler}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'email' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="password">비밀번호</InputLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.loginState.password}
                                    onChange={loginHandler}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'password' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
                                {/* <ErrorMessage>패스워드를 확인해 주세요</ErrorMessage> */}
                            </InputItem>
                            <ManagerWapper>
                                <RememberId>
                                    <CheckBoxWapper>
                                        <RememberCheckBox
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            required={false}
                                            checked={pageState.loginState.idRemember}
                                            onChange={() => {
                                                setPageState(prev => ({
                                                    ...prev,
                                                    loginState: {
                                                        ...prev.loginState,
                                                        idRemember: !prev.loginState.idRemember,
                                                    },
                                                }));
                                            }}
                                        />
                                    </CheckBoxWapper>
                                    <RememberTextWapper>
                                        <RememberTextLabel htmlFor="remember">아이디 기억</RememberTextLabel>
                                    </RememberTextWapper>
                                </RememberId>
                                <AuthText
                                    onClick={() => {
                                        navigate('/auth/password-change');
                                    }}>
                                    비밀번호를 잊으셨나요?
                                </AuthText>
                            </ManagerWapper>
                            <Button
                                onClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        checkState: pageInitializeState.checkState,
                                    }));
                                    login();
                                }}>
                                로그인
                            </Button>
                            <AuthButton>
                                아직 계정이 없으신가요?
                                <AuthText
                                    onClick={() => {
                                        navigate('/auth/register');
                                    }}>
                                    회원 가입
                                </AuthText>
                            </AuthButton>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default LoginSection;

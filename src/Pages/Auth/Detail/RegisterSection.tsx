import { PageStyles } from '@Styles';
import { /*useEffect,*/ useState } from 'react';
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
    AuthButton,
    Button,
    AuthText,
    ErrorMessage,
} = PageStyles.Auth.AuthStyles;

const { EmailCheckStatus, NicknameCheckStatus, joinupStatus } = AuthService;

const pageInitializeState = {
    // loading: false,
    checkState: {
        status: false,
        type: null,
        message: ``,
    },
    joinupState: {
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
    },
};

const RegisterSection = () => {
    const navigate = useNavigate();

    const [pageState, setPageState] = useState<{
        // loading: boolean;
        checkState: {
            status: boolean;
            type: null | string | `email` | `password` | `passwordConfirm` | `nickname`;
            message: string;
        };
        joinupState: {
            email: string;
            password: string;
            passwordConfirm: string;
            nickname: string;
        };
    }>(pageInitializeState);

    const joinupHandler = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setPageState(prev => ({
            ...prev,
            joinupState: {
                ...prev.joinupState,
                [name]: value,
            },
        }));
    };

    const emailCheck = async () => {
        const email = pageState.joinupState.email;

        const { status, payload } = await EmailCheckStatus(email);

        if (status) {
            if (payload.exist) {
                setPageState(prev => ({
                    ...prev,
                    checkState: {
                        ...prev.checkState,
                        status: true,
                        type: `email`,
                        message: `이미 사용중인 이메일 주소 입니다.`,
                    },
                }));
            }
            return;
        }
    };

    const nicknameCheck = async () => {
        const nickname = pageState.joinupState.nickname;

        const { status, payload } = await NicknameCheckStatus(nickname);

        if (status) {
            if (payload.exist) {
                setPageState(prev => ({
                    ...prev,
                    checkState: {
                        ...prev.checkState,
                        status: true,
                        type: `nickname`,
                        message: `이미 사용중인 닉네임 입니다.`,
                    },
                }));
                return;
            } else {
                joinupCheck();
            }
        }
    };

    const joinupCheck = async () => {
        const email = pageState.joinupState.email;
        const password = pageState.joinupState.password;
        const nickname = pageState.joinupState.nickname;

        const { status, payload, message } = await joinupStatus(email, password, nickname);

        if (status) {
            if (!payload) {
                setPageState(prev => ({
                    ...prev,
                    checkState: {
                        ...prev.checkState,
                        status: true,
                        message: message,
                    },
                }));
                return;
            } else {
                setPageState(prevState => ({
                    ...prevState,
                    joinupState: pageInitializeState.joinupState,
                }));
                alert('회원가입이 완료되었습니다.');
                navigate('/bora/messenger');
            }
        }
    };

    const joinUp = () => {
        if (!pageState.joinupState.email) {
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

        const email = pageState.joinupState.email;
        const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

        if (exptext.test(email) === false) {
            //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `email`,
                    message: `정확한 이메일을 입력해 주세요`,
                },
            }));
            return;
        }

        emailCheck();

        if (!pageState.joinupState.password) {
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

        if (pageState.joinupState.password.length < 4 || pageState.joinupState.password.length > 15) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `password`,
                    message: `비밀번호는 4~15자 이내여야 합니다.`,
                },
            }));
            return;
        }

        if (!pageState.joinupState.passwordConfirm) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `passwordConfirm`,
                    message: `비밀번호를 입력해 주세요.`,
                },
            }));
            return;
        }

        if (pageState.joinupState.password !== pageState.joinupState.passwordConfirm) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `passwordConfirm`,
                    message: `비밀번호가 일치하지 않습니다.`,
                },
            }));
            return;
        }

        if (!pageState.joinupState.nickname) {
            setPageState(prev => ({
                ...prev,
                checkState: {
                    ...prev.checkState,
                    status: true,
                    type: `nickname`,
                    message: `닉네임을 입력헤주세요.`,
                },
            }));
            return;
        }

        nicknameCheck();
    };

    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>회원 가입</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    required={false}
                                    value={pageState.joinupState.email}
                                    onChange={joinupHandler}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'email' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="password">비밀 번호</InputLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.joinupState.password}
                                    onChange={joinupHandler}
                                    minLength={4}
                                    maxLength={15}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'password' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="passwordConfirm">비밀 번호 확인</InputLabel>
                                <Input
                                    type="password"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.joinupState.passwordConfirm}
                                    onChange={joinupHandler}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'passwordConfirm' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">닉네임</InputLabel>
                                <Input
                                    type="nickname"
                                    name="nickname"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.joinupState.nickname}
                                    onChange={joinupHandler}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'nickname' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
                                {/* {duplicateCheck.nickname ? <ErrorMessage>이미 사용중인 닉네임 입니다.</ErrorMessage> : null} */}
                            </InputItem>
                            <Button
                                onClick={() => {
                                    setPageState(prevState => ({
                                        ...prevState,
                                        checkState: pageInitializeState.checkState,
                                    }));
                                    joinUp();
                                }}>
                                회원 가입
                            </Button>
                            <AuthButton>
                                아이디가 존재 한가요?
                                <AuthText
                                    onClick={() => {
                                        navigate('/auth/login');
                                    }}>
                                    로그인
                                </AuthText>
                            </AuthButton>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default RegisterSection;

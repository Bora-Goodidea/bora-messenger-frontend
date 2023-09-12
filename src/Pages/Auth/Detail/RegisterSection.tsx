import { PageStyles } from '@Styles';
import { /*useEffect,*/ useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { axiosDefaultHeader } from '../../../Common/Axios';

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

const pageInitializeState = {
    // loading: false,
    category: '',
    checkState: {
        email: false,
        password: false,
        passwordConfirm: false,
        nickname: false,
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
        category: string;
        checkState: {
            email: boolean;
            password: boolean;
            passwordConfirm: boolean;
            nickname: boolean;
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

    const joinUp = () => {
        if (!pageState.joinupState.email) {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    email: true,
                },
            }));
            return false;
        } else {
            setPageState(prev => ({
                ...prev,
                category: 'emptyCheck',
                checkState: {
                    ...prev.checkState,
                    email: false,
                },
            }));
            const email = pageState.joinupState.email;
            const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

            if (exptext.test(email) === false) {
                //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
                setPageState(prev => ({
                    ...prev,
                    category: 'validCheck',
                    checkState: {
                        ...prev.checkState,
                        email: true,
                    },
                }));
                // setDuplicateCheck(prev => ({ ...prev, email: true }));
                return false;
            } else {
                setPageState(prev => ({
                    ...prev,
                    category: 'validCheck',
                    checkState: {
                        ...prev.checkState,
                        email: false,
                    },
                }));
                // setDuplicateCheck(prev => ({ ...prev, email: false }));
            }
        }

        if (!pageState.joinupState.password) {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    password: true,
                },
            }));
        } else {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    password: false,
                },
            }));
            if (pageState.joinupState.password.length < 4 || pageState.joinupState.password.length > 15) {
                setPageState(prev => ({
                    ...prev,
                    category: 'validCheck',
                    checkState: {
                        ...prev.checkState,
                        password: true,
                    },
                }));
            } else {
                setPageState(prev => ({
                    ...prev,
                    category: 'validCheck',
                    checkState: {
                        ...prev.checkState,
                        password: false,
                    },
                }));
            }
        }

        if (!pageState.joinupState.passwordConfirm) {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    passwordConfirm: true,
                },
            }));
        } else {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    passwordConfirm: false,
                },
            }));

            if (pageState.joinupState.password !== pageState.joinupState.passwordConfirm) {
                setPageState(prev => ({
                    ...prev,
                    category: 'duplicate',
                    checkState: {
                        ...prev.checkState,
                        passwordConfirm: true,
                    },
                }));
            } else {
                setPageState(prev => ({
                    ...prev,
                    category: 'duplicate',
                    checkState: {
                        ...prev.checkState,
                        passwordConfirm: false,
                    },
                }));
            }
        }

        if (!pageState.joinupState.nickname) {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    nickname: true,
                },
            }));
        } else {
            setPageState(prev => ({
                ...prev,
                category: 'empty',
                checkState: {
                    ...prev.checkState,
                    nickname: false,
                },
            }));

            // if(){
            //     setDuplicateCheck(prev => ({ ...prev, nickname: true }));
            // }else{
            //     setDuplicateCheck(prev => ({ ...prev, nickname: false }));
            // }
        }

        // const payload = {
        //     email: pageState.joinupState.email,
        //     password: pageState.joinupState.password,
        //     passwordConfirm: pageState.joinupState.passwordConfirm,
        //     nickname: pageState.joinupState.nickname,
        // };
    };

    // useEffect(() => {
    //     console.log(joinInfo);
    // }, [joinInfo]);

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
                                {pageState.category === 'empty' && pageState.checkState.email ? (
                                    <ErrorMessage>이메일을 입력헤주세요.</ErrorMessage>
                                ) : null}
                                {pageState.category === 'valid' && pageState.checkState.email ? (
                                    <ErrorMessage>이메일형식이 올바르지 않습니다.</ErrorMessage>
                                ) : null}
                                {pageState.category === 'duplicate' && pageState.checkState.email ? (
                                    <ErrorMessage>이미 사용중인 이메일 주소 입니다.</ErrorMessage>
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
                                {pageState.category === 'empty' && pageState.checkState.password ? (
                                    <ErrorMessage>패스워드를 입력헤주세요.</ErrorMessage>
                                ) : null}
                                {pageState.category === 'valid' && pageState.checkState.password ? (
                                    <ErrorMessage>패스워드는 4~15자 이내여야 합니다.</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="passwordConfirm">비밀 번호 확인</InputLabel>
                                <Input
                                    type="passwordConfirm"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.joinupState.passwordConfirm}
                                    onChange={joinupHandler}
                                />
                                {pageState.category === 'empty' && pageState.checkState.passwordConfirm ? (
                                    <ErrorMessage>패스워드를 입력헤주세요.</ErrorMessage>
                                ) : null}
                                {pageState.category === 'duplicate' && pageState.checkState.passwordConfirm ? (
                                    <ErrorMessage>패스워드가 일치하지 않습니다.</ErrorMessage>
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
                                {pageState.category === 'empty' && pageState.checkState.nickname ? (
                                    <ErrorMessage>닉네임을 입력헤주세요.</ErrorMessage>
                                ) : null}
                                {/* {duplicateCheck.nickname ? <ErrorMessage>이미 사용중인 닉네임 입니다.</ErrorMessage> : null} */}
                            </InputItem>
                            <Button onClick={joinUp}>회원 가입</Button>
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

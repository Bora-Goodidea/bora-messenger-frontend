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

interface JoinUpPropsType {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
}

interface inputFlagPropsType {
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
    nickname: boolean;
}

const RegisterSection = () => {
    const navigate = useNavigate();
    const joinupInitialState = {
        email: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
    };

    const initialEmptyCheckState: inputFlagPropsType = {
        email: false,
        password: false,
        passwordConfirm: false,
        nickname: false,
    };

    const [joinInfo, setJoinInfo] = useState<JoinUpPropsType>(joinupInitialState);
    const [emptyCheck, setEmptyCheck] = useState<inputFlagPropsType>(initialEmptyCheckState);
    const [validCheck, setValidCheck] = useState<inputFlagPropsType>(initialEmptyCheckState);
    const [duplicateCheck, setDuplicateCheck] = useState<inputFlagPropsType>(initialEmptyCheckState);

    const joinupHandler = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setJoinInfo(prev => ({ ...prev, [name]: value }));
    };

    const joinUp = () => {
        if (!joinInfo.email) {
            setEmptyCheck(prev => ({ ...prev, email: true }));
            return false;
        } else {
            setEmptyCheck(prev => ({ ...prev, email: false }));
            const email = joinInfo.email;
            const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

            if (exptext.test(email) === false) {
                //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
                setValidCheck(prev => ({ ...prev, email: true }));
                // setDuplicateCheck(prev => ({ ...prev, email: true }));
                return false;
            } else {
                setValidCheck(prev => ({ ...prev, email: false }));
                // setDuplicateCheck(prev => ({ ...prev, email: false }));
            }
        }

        if (!joinInfo.password) {
            setEmptyCheck(prev => ({ ...prev, password: true }));
        } else {
            setEmptyCheck(prev => ({ ...prev, password: false }));
            if (joinInfo.password.length < 4 || joinInfo.password.length > 15) setValidCheck(prev => ({ ...prev, password: true }));
            else setValidCheck(prev => ({ ...prev, password: false }));
        }

        if (!joinInfo.passwordConfirm) {
            setEmptyCheck(prev => ({ ...prev, passwordConfirm: true }));
        } else {
            setEmptyCheck(prev => ({ ...prev, passwordConfirm: false }));
            if (joinInfo.password !== joinInfo.passwordConfirm) {
                setDuplicateCheck(prev => ({ ...prev, passwordConfirm: true }));
            } else {
                setDuplicateCheck(prev => ({ ...prev, passwordConfirm: false }));
            }
        }

        if (!joinInfo.nickname) {
            setEmptyCheck(prev => ({ ...prev, nickname: true }));
        } else {
            setEmptyCheck(prev => ({ ...prev, nickname: false }));
            // if(){
            //     setDuplicateCheck(prev => ({ ...prev, nickname: true }));
            // }else{
            //     setDuplicateCheck(prev => ({ ...prev, nickname: false }));
            // }
        }

        const param = {
            email: joinInfo.email,
            password: joinInfo.password,
            passwordConfirm: joinInfo.passwordConfirm,
            nickname: joinInfo.nickname,
        };
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
                                    value={joinInfo.email}
                                    onChange={joinupHandler}
                                />
                                {emptyCheck.email ? <ErrorMessage>이메일을 입력헤주세요.</ErrorMessage> : null}
                                {validCheck.email ? <ErrorMessage>이메일형식이 올바르지 않습니다.</ErrorMessage> : null}
                                {duplicateCheck.email ? <ErrorMessage>이미 사용중인 이메일 주소 입니다.</ErrorMessage> : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="password">비밀 번호</InputLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required={false}
                                    value={joinInfo.password}
                                    onChange={joinupHandler}
                                    minLength={4}
                                    maxLength={15}
                                />
                                {emptyCheck.password ? <ErrorMessage>패스워드를 입력헤주세요.</ErrorMessage> : null}
                                {validCheck.password ? <ErrorMessage>패스워드는 4~15자 이내여야 합니다.</ErrorMessage> : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="passwordConfirm">비밀 번호 확인</InputLabel>
                                <Input
                                    type="passwordConfirm"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    placeholder="••••••••"
                                    required={false}
                                    value={joinInfo.passwordConfirm}
                                    onChange={joinupHandler}
                                />
                                {emptyCheck.passwordConfirm ? <ErrorMessage>패스워드를 입력헤주세요.</ErrorMessage> : null}
                                {duplicateCheck.passwordConfirm ? <ErrorMessage>패스워드가 일치하지 않습니다.</ErrorMessage> : null}
                            </InputItem>
                            <InputItem>
                                <InputLabel htmlFor="nickname">닉네임</InputLabel>
                                <Input
                                    type="nickname"
                                    name="nickname"
                                    id="nickname"
                                    placeholder="••••••••"
                                    required={false}
                                    value={joinInfo.nickname}
                                    onChange={joinupHandler}
                                />
                                {emptyCheck.nickname ? <ErrorMessage>닉네임을 입력헤주세요.</ErrorMessage> : null}
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

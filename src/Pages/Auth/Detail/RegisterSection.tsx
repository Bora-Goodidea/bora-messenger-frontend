import { PageStyles } from '@Styles';
import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { ButtonSpinnerIcon } from '@Icons';

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

const RegisterSection = ({
    Loading,
    InputValue,
    JoinupHandler,
    CheckState,
    HandleJoinupButtonClick,
    LoginButtonClick,
    EnterRef,
    HandleOnKeyDown,
}: {
    Loading: boolean;
    InputValue: { email: string; password: string; passwordConfirm: string; nickname: string };
    JoinupHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    CheckState: { status: boolean; type: null | string | `email` | `password` | `passwordConfirm` | `nickname`; message: string };
    HandleJoinupButtonClick: () => void;
    LoginButtonClick: () => void;
    EnterRef: MutableRefObject<HTMLInputElement[]>;
    HandleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}) => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>회원 가입</TitleBox>
                        <AuthForm onSubmit={e => e.preventDefault()}>
                            <InputItem>
                                <InputLabel form="email">이메일 주소</InputLabel>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    required={false}
                                    value={InputValue.email}
                                    onChange={e => JoinupHandler(e)}
                                    ref={el => (EnterRef.current[0] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                />
                                {CheckState.status && CheckState.type === 'email' ? (
                                    <ErrorMessage>{`${CheckState.message}`}</ErrorMessage>
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
                                    value={InputValue.password}
                                    onChange={e => JoinupHandler(e)}
                                    minLength={4}
                                    maxLength={15}
                                    ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                    autoComplete={`off`}
                                />
                                {CheckState.status && CheckState.type === 'password' ? (
                                    <ErrorMessage>{`${CheckState.message}`}</ErrorMessage>
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
                                    value={InputValue.passwordConfirm}
                                    onChange={e => JoinupHandler(e)}
                                    ref={el => (EnterRef.current[2] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                    autoComplete={`off`}
                                />
                                {CheckState.status && CheckState.type === 'passwordConfirm' ? (
                                    <ErrorMessage>{`${CheckState.message}`}</ErrorMessage>
                                ) : null}
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
                                    onChange={e => JoinupHandler(e)}
                                    ref={el => (EnterRef.current[3] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                />
                                {CheckState.status && CheckState.type === 'nickname' ? (
                                    <ErrorMessage>{`${CheckState.message}`}</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <Button onClick={() => HandleJoinupButtonClick()}>{Loading ? <ButtonSpinnerIcon /> : `회원 가입`}</Button>
                            <AuthButton>
                                아이디가 존재 한가요?
                                <AuthText onClick={() => LoginButtonClick()}>로그인</AuthText>
                            </AuthButton>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default RegisterSection;

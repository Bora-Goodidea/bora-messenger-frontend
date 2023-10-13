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

const LoginSection = ({
    Loading,
    InputValue,
    CheckState,
    LoginHandler,
    HandleIdRemember,
    PasswordResetClick,
    LoginButtonClick,
    JoinButtonClick,
    EnterRef,
    HandleOnKeyDown,
}: {
    Loading: boolean;
    InputValue: { email: string; password: string; idRemember: boolean };
    CheckState: { status: boolean; type: null | string | `email` | `password`; message: string };
    LoginHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    HandleIdRemember: (check: boolean) => void;
    PasswordResetClick: () => void;
    LoginButtonClick: () => void;
    JoinButtonClick: () => void;
    EnterRef: MutableRefObject<HTMLInputElement[]>;
    HandleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}) => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>로그인</TitleBox>
                        <AuthForm onSubmit={e => e.preventDefault()}>
                            <InputItem>
                                <InputLabel htmlFor="email">이메일</InputLabel>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    required={false}
                                    value={InputValue.email}
                                    onChange={e => LoginHandler(e)}
                                    ref={el => (EnterRef.current[0] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                />
                                {CheckState.status && CheckState.type === 'email' ? (
                                    <ErrorMessage>{`${CheckState.message}`}</ErrorMessage>
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
                                    value={InputValue.password}
                                    onChange={e => LoginHandler(e)}
                                    ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                    autoComplete={`off`}
                                />
                                {CheckState.status && CheckState.type === 'password' ? (
                                    <ErrorMessage>{`${CheckState.message}`}</ErrorMessage>
                                ) : null}
                            </InputItem>
                            <ManagerWapper>
                                <RememberId>
                                    <CheckBoxWapper>
                                        <RememberCheckBox
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            required={false}
                                            checked={InputValue.idRemember}
                                            onChange={e => {
                                                HandleIdRemember(e.target.checked);
                                            }}
                                        />
                                    </CheckBoxWapper>
                                    <RememberTextWapper>
                                        <RememberTextLabel htmlFor="remember">아이디 기억</RememberTextLabel>
                                    </RememberTextWapper>
                                </RememberId>
                                <AuthText onClick={() => PasswordResetClick()}>비밀번호를 잊으셨나요?</AuthText>
                            </ManagerWapper>
                            <Button onClick={() => LoginButtonClick()} disabled={Loading}>
                                {Loading ? <ButtonSpinnerIcon /> : `로그인`}
                            </Button>
                            <AuthButton>
                                아직 계정이 없으신가요?
                                <AuthText onClick={() => JoinButtonClick()}>회원 가입</AuthText>
                            </AuthButton>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default LoginSection;

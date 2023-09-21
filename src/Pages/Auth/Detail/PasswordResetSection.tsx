import { KeyboardEvent } from 'react';
import { PageStyles } from '@Styles';
import { ButtonSpinnerIcon } from '@Icons';

const { Container, Wapper, FormWapper, FormBox, TitleBox, AuthForm, InputItem, InputLabel, Input, Button } = PageStyles.Auth.AuthStyles;

const PasswordResetSection = ({
    Loading,
    InputValue,
    HandleOnChange,
    HandleClickButton,
    HandleOnKeyDown,
}: {
    Loading: boolean;
    InputValue: string;
    HandleOnChange: (Value: string) => void;
    HandleClickButton: () => void;
    HandleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}) => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>비밀번호 변경 요청</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel htmlFor="email">이메일</InputLabel>
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    required={false}
                                    value={InputValue}
                                    onChange={e => HandleOnChange(e.target.value)}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                />
                            </InputItem>
                            <Button onClick={() => HandleClickButton()} disabled={Loading}>
                                {Loading ? <ButtonSpinnerIcon /> : `요청`}
                            </Button>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default PasswordResetSection;

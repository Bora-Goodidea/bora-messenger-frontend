import { PageStyles } from '@Styles';

const { Container, Wapper, FormWapper, FormBox, TitleBox, AuthForm, InputItem, InputLabel, Input, Button, ErrorMessage } =
    PageStyles.Auth.AuthStyles;

const PasswordChangeSection = () => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>비밀 번호 변경</TitleBox>
                        <AuthForm>
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
                            <Button>변경</Button>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default PasswordChangeSection;

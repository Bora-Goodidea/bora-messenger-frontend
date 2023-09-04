import { PageStyles } from '@Styles';

const { Container, Wapper, FormWapper, FormBox, TitleBox, AuthForm, InputItem, InputLabel, Input, Button } = PageStyles.Auth.AuthStyles;

const PasswordResetSection = () => {
    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>비밀번호 변경 요청</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel htmlFor="email">이메일</InputLabel>
                                <Input type="email" name="email" id="email" placeholder="name@company.com" required={false} />
                            </InputItem>
                            <Button>요청</Button>
                        </AuthForm>
                    </FormBox>
                </FormWapper>
            </Wapper>
        </Container>
    );
};

export default PasswordResetSection;

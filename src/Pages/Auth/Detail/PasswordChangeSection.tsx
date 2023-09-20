import { PageStyles } from '@Styles';
import { /*useEffect, */ useEffect, useState } from 'react';

const { Container, Wapper, FormWapper, FormBox, TitleBox, AuthForm, InputItem, InputLabel, Input, Button, ErrorMessage } =
    PageStyles.Auth.AuthStyles;

const pageInitializeState = {
    checkState: {
        status: false,
        type: null,
        message: '',
    },
    changeState: {
        password: '',
        passwordConfirm: '',
    },
};

const PasswordChangeSection = () => {
    const [pageState, setPageState] = useState<{
        checkState: {
            status: boolean;
            type: null | string | `email` | `password` | `passwordConfirm` | `nickname`;
            message: string;
        };
        changeState: {
            password: string;
            passwordConfirm: string;
        };
    }>(pageInitializeState);

    const passwordChangeHandler = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setPageState(prev => ({
            ...prev,
            changeState: {
                ...prev.changeState,
                [name]: value,
            },
        }));
    };

    return (
        <Container>
            <Wapper>
                <FormWapper>
                    <FormBox>
                        <TitleBox>비밀 번호 변경</TitleBox>
                        <AuthForm>
                            <InputItem>
                                <InputLabel htmlFor="password">비밀 번호</InputLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required={false}
                                    value={pageState.changeState.password}
                                    onChange={e => passwordChangeHandler(e)}
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
                                    value={pageState.changeState.passwordConfirm}
                                    onChange={e => passwordChangeHandler(e)}
                                />
                                {pageState.checkState.status && pageState.checkState.type === 'nickname' ? (
                                    <ErrorMessage>{`${pageState.checkState.message}`}</ErrorMessage>
                                ) : null}
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

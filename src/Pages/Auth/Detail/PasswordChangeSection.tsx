import { PageStyles } from '@Styles';
import React, { ChangeEvent, MutableRefObject, KeyboardEvent } from 'react';
import { ButtonSpinnerIcon, DefaultSpinner } from '@Icons';

const { Container, Wapper, FormWapper, FormBox, TitleBox, AuthForm, InputItem, InputLabel, Input, Button, ErrorMessage } =
    PageStyles.Auth.AuthStyles;

const PasswordChangeSection = ({
    PageLoading,
    ChangeLoading,
    PasswordValue,
    PasswordConfirmValue,
    HandleOnChange,
    InputError,
    EnterRef,
    HandleOnKeyDown,
    HandleClickButton,
}: {
    PageLoading: boolean;
    ChangeLoading: boolean;
    PasswordValue: string;
    PasswordConfirmValue: string;
    HandleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    InputError: {
        status: boolean;
        type: null | string | `email` | `password` | `passwordConfirm` | `nickname`;
        message: string;
    };
    EnterRef: MutableRefObject<HTMLInputElement[]>;
    HandleOnKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    HandleClickButton: () => void;
}) => {
    return (
        <Container>
            <Wapper>
                {PageLoading ? (
                    <DefaultSpinner />
                ) : (
                    <FormWapper>
                        <FormBox>
                            <TitleBox>비밀 번호 변경</TitleBox>
                            <AuthForm onSubmit={e => e.preventDefault()}>
                                <InputItem>
                                    <InputLabel htmlFor="password">비밀 번호</InputLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required={false}
                                        value={PasswordValue}
                                        onChange={e => HandleOnChange(e)}
                                        minLength={4}
                                        maxLength={15}
                                        ref={el => (EnterRef.current[0] = el as HTMLInputElement)}
                                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                        autoComplete={`off`}
                                    />
                                    {InputError.status && InputError.type === 'password' ? (
                                        <ErrorMessage>{`${InputError.message}`}</ErrorMessage>
                                    ) : null}
                                </InputItem>
                                <InputItem>
                                    <InputLabel htmlFor="passwordConfirm">비밀 번호 확인</InputLabel>
                                    <Input
                                        type="password"
                                        name="passwordConfirm"
                                        placeholder="••••••••"
                                        required={false}
                                        value={PasswordConfirmValue}
                                        onChange={e => HandleOnChange(e)}
                                        minLength={4}
                                        maxLength={15}
                                        ref={el => (EnterRef.current[1] = el as HTMLInputElement)}
                                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown(e)}
                                        autoComplete={`off`}
                                    />
                                    {InputError.status && InputError.type === 'passwordConfirm' ? (
                                        <ErrorMessage>{`${InputError.message}`}</ErrorMessage>
                                    ) : null}
                                </InputItem>
                                <Button onClick={() => HandleClickButton()} disabled={ChangeLoading}>
                                    {ChangeLoading ? <ButtonSpinnerIcon /> : `변경`}
                                </Button>
                            </AuthForm>
                        </FormBox>
                    </FormWapper>
                )}
            </Wapper>
        </Container>
    );
};

export default PasswordChangeSection;

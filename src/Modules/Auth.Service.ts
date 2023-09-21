import { Axios } from '@Commons';
import { ServicesResult } from '@CommonType';

export default {
    EmailCheckStatus: (
        email: string
    ): Promise<
        ServicesResult<{
            //api 호출한 후 값들이 이런타입으로 넘어온다
            email: string;
            exist: string;
        }>
    > => {
        return Axios({
            method: 'get',
            url: `/api/auth/${email}/email-exists`,
            payload: null,
        });
    },

    NicknameCheckStatus: (
        nickname: string
    ): Promise<
        ServicesResult<{
            nickname: string;
            exist: string;
        }>
    > => {
        return Axios({
            method: 'get',
            url: `/api/auth/${nickname}/nickname-exists`,
            payload: null,
        });
    },

    joinupStatus: (
        email: string,
        password: string,
        nickname: string
    ): Promise<
        ServicesResult<{
            email: string;
            nickname: string;
        }>
    > => {
        return Axios({
            method: 'post',
            url: `/api/auth/register`,
            payload: {
                email: email,
                password: password,
                nickname: nickname,
            },
        });
    },

    EmailAuth: ({ AuthCode }: { AuthCode: string }): Promise<ServicesResult<null>> => {
        return Axios({
            method: 'get',
            url: `/api/auth/${AuthCode}/email-auth`,
            payload: null,
        });
    },

    loginStatus: (
        email: string,
        password: string
    ): Promise<
        ServicesResult<{
            access_token: string;
            refresh_token: string;
        }>
    > => {
        return Axios({
            method: 'post',
            url: `/api/auth/login`,
            payload: {
                email: email,
                password: password,
            },
        });
    },

    PasswordReset: ({
        email,
    }: {
        email: string;
    }): Promise<
        ServicesResult<{
            email: string;
            resetcode: string;
            resetlink: string;
        }>
    > => {
        // 비밀 번호 변경 요청
        return Axios({
            method: 'get',
            url: `/api/auth/${email}/password-reset`,
            payload: null,
        });
    },

    PasswordResetCodeCheck: ({ resetCode }: { resetCode: string }): Promise<ServicesResult<null>> => {
        // 패스워드 변경 코드 확인
        return Axios({
            method: 'get',
            url: `/api/auth/${resetCode}/password-reset-code-check`,
            payload: null,
        });
    },

    PasswordChange: ({ resetCode, password }: { resetCode: string; password: string }): Promise<ServicesResult<null>> => {
        // 비밀번호 변경
        return Axios({
            method: 'post',
            url: `/api/auth/${resetCode}/password-change`,
            payload: {
                password: password,
            },
        });
    },
};

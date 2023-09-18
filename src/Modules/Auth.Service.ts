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
};

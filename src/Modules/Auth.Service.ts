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
};

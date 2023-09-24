import { Axios } from '@Commons';
import { ServicesResult } from '@CommonType';

export default {
    MyProfile: (): Promise<
        ServicesResult<{
            email: string;
            nickname: string;
            profile_image: {
                id: number;
                url: string;
            };
        }>
    > => {
        return Axios({
            method: 'get',
            url: `/api/member/my-profile`,
            payload: null,
        });
    },
};

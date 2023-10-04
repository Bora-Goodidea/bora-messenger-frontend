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
    ImageCreate: (
        formData: FormData
    ): Promise<
        ServicesResult<{
            status: boolean;
            data: {
                id: number;
                original_name: string;
                mimetype: string;
                filename: string;
                media_url: string;
            };
        }>
    > => {
        console.log('Payload:', formData); // 추가
        return Axios({
            method: 'post',
            url: `/api/media/image-create`,
            payload: formData,
        });
    },
};

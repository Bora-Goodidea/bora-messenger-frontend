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
            url: `/api/user/my-profile`,
            payload: null,
        });
    },
    ImageCreate: (
        formData: FormData
    ): Promise<
        ServicesResult<{
            id: number | null;
            media_url: string;
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
        return Axios({
            method: 'post',
            url: `/api/media/image-create`,
            payload: formData,
        });
    },
    ProfileUpdate: (
        profileImage: number | null,
        nickname: string
    ): Promise<
        ServicesResult<{
            media_url: string;
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
        return Axios({
            method: 'post',
            url: `/api/user/profile-update`,
            payload: {
                profileImage: profileImage,
                nickname: nickname,
            },
        });
    },
    YourProfile: ({
        profileUid,
    }: {
        profileUid: string;
    }): Promise<
        ServicesResult<{
            email: string;
            nickname: string;
            profile_image: {
                id: number;
                url: string;
            };
            active: string;
        }>
    > => {
        return Axios({
            method: 'get',
            url: `/api/user/${profileUid}/profile`,
            payload: null,
        });
    },
};

import { Axios } from '@Commons';
import { ServicesResult } from '@CommonType';
import { BaseDataResultInterface } from '@ServiceInterface';

export default {
    ServiceCheckStatus: (): Promise<ServicesResult<null>> => {
        // 서버 체크
        return Axios({
            method: 'get',
            url: `/api/system/check-status`,
            payload: null,
        });
    },
    ServiceGetBaseData: (): Promise<ServicesResult<BaseDataResultInterface>> => {
        // 서버 기본 데이터
        return Axios({
            method: 'get',
            url: `/api/system/base-data`,
            payload: null,
        });
    },
    ServiceGeSystemNotice: (): Promise<
        ServicesResult<{
            notice: string;
        }>
    > => {
        // 서버 기본 데이터
        return Axios({
            method: 'get',
            url: `/api/system/notice`,
            payload: null,
        });
    },
};

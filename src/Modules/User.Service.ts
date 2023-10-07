import { Axios } from '@Commons';
import { ServicesResult, CommonCodesItemInterface, CommonSimplyTimeFormatInterface } from '@CommonType';

export default {
    ServiceUserList: (): Promise<
        ServicesResult<
            Array<{
                uid: string;
                type: CommonCodesItemInterface;
                level: CommonCodesItemInterface;
                status: CommonCodesItemInterface;
                email: string;
                nickname: string;
                profile: {
                    image: string;
                };
                active: {
                    state: `Y` | `N`;
                    updated_at: CommonSimplyTimeFormatInterface | null;
                };
                created_at: CommonSimplyTimeFormatInterface;
                updated_at: CommonSimplyTimeFormatInterface;
            }>
        >
    > => {
        return Axios({
            method: 'get',
            url: `/api/member/member-list`,
            payload: null,
        });
    },
};

import { useEffect, useState } from 'react';
import { colorDebug, DEBUG } from '@Helper';
import SystemService from '@Module/System.Service';

const { ServiceGetBaseData, ServiceCheckStatus } = SystemService;

/**
 * 최초 서버 상태 체크 -> 공지사항 체크 -> 데이터 조회
 */
export default function useRoot(): boolean {
    const [appStatus, setAppStatus] = useState<boolean>(false);
    const [checkState, setCheckState] = useState<{
        server: boolean;
        notice: boolean;
        data: boolean;
    }>({
        server: false,
        notice: false,
        data: false,
    });

    useEffect(() => {
        const endCheck = () => {
            colorDebug('success', ':: App Init End :: ');
            setAppStatus(true);
        };

        if (checkState.server && checkState.notice && checkState.data) {
            endCheck();
        }
    }, [checkState]);

    useEffect(() => {
        const dataCheck = async () => {
            const { status, payload } = await ServiceGetBaseData();
            if (status) {
                DEBUG(payload); // TODO: 공통 데이터를 어떻게 담을 건지?
                setCheckState(prevState => ({
                    ...prevState,
                    data: true,
                }));
            } else {
                // 에러 처리
            }
        };

        if (checkState.notice) {
            dataCheck().then();
        }
    }, [checkState.notice]);

    useEffect(() => {
        const noticeCheck = () => {
            setCheckState(prevState => ({
                ...prevState,
                notice: true,
            }));
        };

        if (checkState.server) {
            noticeCheck();
        }
    }, [checkState.server]);

    useEffect(() => {
        const startCheck = async () => {
            colorDebug('info', ':: App Init Start :: ');

            const { status } = await ServiceCheckStatus();
            if (status) {
                setCheckState(prevState => ({
                    ...prevState,
                    server: true,
                }));
            } else {
                // 서버 에러시 어떻게 할껀지?
            }
        };

        startCheck().then();
    }, []);

    return appStatus;
}

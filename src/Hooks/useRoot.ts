import { useEffect, useState } from 'react';
import { colorDebug } from '@Helper';
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
            setTimeout(() => {
                setAppStatus(true);
            }, 2000);
        };

        if (checkState.server && checkState.notice && checkState.data) {
            endCheck();
        }
    }, [checkState]);

    useEffect(() => {
        const dataCheck = () => {
            setCheckState(prevState => ({
                ...prevState,
                data: true,
            }));
        };

        if (checkState.notice) {
            dataCheck();
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
        const startCheck = () => {
            colorDebug('info', ':: App Init Start :: ');
            setCheckState(prevState => ({
                ...prevState,
                server: true,
            }));
        };

        startCheck();
    }, []);

    return appStatus;
}

import { LayoutStyles } from '@Styles';
import { DefaultSpinner } from '@Icons';
import { useEffect } from 'react';
import { colorDebug } from '@Helper';
import { useRecoilState } from 'recoil';
import { AtomRootState } from '@Recoil/AppRootState';
import SystemService from '@Module/System.Service';
import { useAuth } from '@Hooks';

const { ServiceGetBaseData, ServiceCheckStatus } = SystemService;

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Wapper, Text } = LayoutStyles.SplashComponentStyle;

/**
 * 최초 서버 상태 체크 -> 공지사항 체크 -> 데이터 조회
 */
const SplashComponent = ({ LodingControl }: { LodingControl: (state: boolean | `under`) => void }) => {
    const [rootState, setRootState] = useRecoilState(AtomRootState);
    const { handleAuthCkeck } = useAuth();

    useEffect(() => {
        const dataCheck = async () => {
            const { status, payload } = await ServiceGetBaseData();
            if (status) {
                setRootState(prevState => ({
                    ...prevState,
                    systemStatus: {
                        ...prevState.systemStatus,
                        data: true,
                    },
                    rootData: {
                        ...prevState.rootData,
                        code: payload.code,
                    },
                }));
            } else {
                // 에러 처리 (페이지 이동해서 서버에 문제가 생겼다고 알려줘야함)
            }
        };

        if (rootState.systemStatus.notice) {
            dataCheck().then();
        }
    }, [rootState.systemStatus.notice, setRootState]);

    useEffect(() => {
        if (rootState.systemStatus.data) {
            const loginCheck = handleAuthCkeck();
            console.debug('loginCheck', loginCheck);
        }

        // FIXME : 종속성에서 Data1, Data2 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootState.systemStatus.data]);

    useEffect(() => {
        const noticeCheck = () => {
            setRootState(prevState => ({
                ...prevState,
                systemStatus: {
                    ...prevState.systemStatus,
                    notice: true,
                },
            }));
        };

        if (rootState.systemStatus.server) {
            noticeCheck();
        }
    }, [rootState.systemStatus.server, setRootState]);

    // 모두 체크후
    useEffect(() => {
        const endCheck = () => {
            colorDebug('success', ':: App Init End :: ');
            setRootState(prevState => ({
                ...prevState,
                appState: true,
            }));
            LodingControl(false);
        };

        const { server, notice, data, login } = rootState.systemStatus;
        if (server && notice && data && login) {
            endCheck();
        }
    }, [rootState.systemStatus, LodingControl, setRootState]);

    useEffect(() => {
        const startCheck = async () => {
            colorDebug('info', ':: App Init Start :: ');

            const { status } = await ServiceCheckStatus();
            if (status) {
                setRootState(prevState => ({
                    ...prevState,
                    systemStatus: {
                        ...prevState.systemStatus,
                        server: true,
                    },
                }));
            } else {
                LodingControl(`under`);
            }
        };

        startCheck().then();
    }, [LodingControl, setRootState]);

    return (
        <MainContainer>
            <Wapper role="status">
                <DefaultSpinner />
                <Text>Loading...</Text>
            </Wapper>
        </MainContainer>
    );
};

export default SplashComponent;

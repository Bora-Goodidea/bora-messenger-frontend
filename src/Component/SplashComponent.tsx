import { LayoutStyles, ElementStyles } from '@Styles';
import { DefaultSpinner } from '@Icons';
import { useEffect } from 'react';
import { colorDebug } from '@Helper';
import { useRecoilState } from 'recoil';
import { AtomRootState } from '@Recoil/AppRootState';
import SystemService from '@Module/System.Service';
import { useAuth } from '@Hooks';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const { ServiceGetBaseData, ServiceCheckStatus, ServiceGeSystemNotice } = SystemService;

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Wapper, Text } = LayoutStyles.SplashComponentStyle;
const { Title, Content } = ElementStyles.Sweetalert;

/**
 * 최초 서버 상태 체크 -> 공지사항 체크 -> 데이터 조회
 */
const SplashComponent = ({ LodingControl }: { LodingControl: (state: boolean | `under`) => void }) => {
    const [rootState, setRootState] = useRecoilState(AtomRootState);
    const { handleAuthCkeck } = useAuth();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const dataCheck = async () => {
            const { status, payload } = await ServiceGetBaseData();
            if (status) {
                setRootState(prevState => ({
                    ...prevState,
                    appCheckStatus: {
                        ...prevState.appCheckStatus,
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

        if (rootState.appCheckStatus.notice) {
            dataCheck().then();
        }
    }, [rootState.appCheckStatus.notice, setRootState]);

    useEffect(() => {
        const authCheck = async () => {
            await handleAuthCkeck({ tokenCheck: true });
        };

        if (rootState.appCheckStatus.data) {
            authCheck().then();
        }

        // FIXME : 종속성에서 Data1, Data2 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootState.appCheckStatus.data]);

    useEffect(() => {
        const noticeCheck = async () => {
            const { payload } = await ServiceGeSystemNotice();
            if (payload) {
                MySwal.fire({
                    title: <Title>공지 사항</Title>,
                    html: <Content>{payload.notice}</Content>,
                }).then();
            }

            setRootState(prevState => ({
                ...prevState,
                appCheckStatus: {
                    ...prevState.appCheckStatus,
                    notice: true,
                },
            }));
        };

        if (rootState.appCheckStatus.server) {
            noticeCheck().then();
        }

        // FIXME : 종속성에서 MySwal 업데이트 되면 무한 로딩이 걸려서 disable 리펙토링시에 수정 필요.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootState.appCheckStatus.server, setRootState]);

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

        const { server, notice, data, login } = rootState.appCheckStatus;
        if (server && notice && data && login) {
            endCheck();
        }
    }, [rootState.appCheckStatus, LodingControl, setRootState]);

    useEffect(() => {
        const startCheck = async () => {
            colorDebug('info', ':: App Init Start :: ');

            const { status } = await ServiceCheckStatus();
            if (status) {
                setRootState(prevState => ({
                    ...prevState,
                    appCheckStatus: {
                        ...prevState.appCheckStatus,
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

import { Outlet } from 'react-router';
import { useRecoilValue } from 'recoil';
import { AtomLayoutState } from '@Recoil/LayoutState';
import { LayoutStyles } from '@Styles';
import { BoraAlert } from '@Elements';
import { useLayout } from '@Hooks';
import { useNavigate } from 'react-router-dom';

const { MainContainer, MainWapper } = LayoutStyles.DafalutLayoutStyle;
const { Wapper } = LayoutStyles.DafalutLayoutStyle.BoraLayoutStyle;

const BlankLayout = () => {
    const atomLayoutState = useRecoilValue(AtomLayoutState);
    const { HandleMainAlert } = useLayout();
    const navigate = useNavigate();

    return (
        <MainContainer>
            <Wapper>
                <MainWapper>
                    <Outlet />
                </MainWapper>
                <BoraAlert
                    AlertState={atomLayoutState.mainAlert.state}
                    AlertMessage={atomLayoutState.mainAlert.message}
                    ButtonClick={() => {
                        const { type, action } = atomLayoutState.mainAlert;
                        HandleMainAlert({ state: false });
                        if (type === `move` && action) {
                            navigate({
                                pathname: `${process.env.PUBLIC_URL}${action}`,
                            });
                        }
                    }}
                />
            </Wapper>
        </MainContainer>
    );
};

export default BlankLayout;

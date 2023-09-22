import { Outlet } from 'react-router';
import { useRecoilValue } from 'recoil';
import { AtomLayoutState } from '@Recoil/LayoutState';
import { LayoutStyles } from '@Styles';
import { BoraAlert } from '@Elements';
import { useLayout } from '@Hooks';
import { useNavigate } from 'react-router-dom';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const BlankLayout = () => {
    const atomLayoutState = useRecoilValue(AtomLayoutState);
    const { HandleMainAlert } = useLayout();
    const navigate = useNavigate();

    return (
        <MainContainer>
            <Outlet />

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
        </MainContainer>
    );
};

export default BlankLayout;

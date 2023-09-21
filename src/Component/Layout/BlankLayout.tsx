import { Outlet } from 'react-router';
import { useRecoilValue } from 'recoil';
import { AtomLayoutState } from '@Recoil/LayoutState';
import { LayoutStyles } from '@Styles';
import { BoraAlert } from '@Elements';
import { useLayout } from '@Hooks';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const BlankLayout = () => {
    const atomLayoutState = useRecoilValue(AtomLayoutState);
    const { HandleMainAlert } = useLayout();

    return (
        <MainContainer>
            <Outlet />

            <BoraAlert
                AlertState={atomLayoutState.mainAlert.state}
                AlertMessage={atomLayoutState.mainAlert.message}
                ButtonClick={() => HandleMainAlert({ state: false })}
            />
        </MainContainer>
    );
};

export default BlankLayout;

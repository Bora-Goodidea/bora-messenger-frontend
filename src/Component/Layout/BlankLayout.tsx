import { Outlet } from 'react-router';
import { LayoutStyles } from '@Styles';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const BlankLayout = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};

export default BlankLayout;

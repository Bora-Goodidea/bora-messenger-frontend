import { Outlet } from 'react-router';
import { ElementStyles } from '@Styles';

const { Container } = ElementStyles.LayoutStyle.BlankLayoutStyle;

const BlankLayout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default BlankLayout;

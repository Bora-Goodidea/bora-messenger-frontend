import { Outlet } from 'react-router';
import { ElementStyles } from '@Styles';

const { Container, Wapper, IconWapper, MainWapper, IconStep1, IconStep2, IconStep3 } = ElementStyles.LayoutStyle.BoraLayoutStyle;

const BoraLayout = () => {
    return (
        <Container>
            <Wapper>
                <IconWapper>
                    <IconStep1></IconStep1>
                    <IconStep2></IconStep2>
                    <IconStep3></IconStep3>
                </IconWapper>
                <MainWapper>
                    <Outlet />
                </MainWapper>
            </Wapper>
        </Container>
    );
};

export default BoraLayout;

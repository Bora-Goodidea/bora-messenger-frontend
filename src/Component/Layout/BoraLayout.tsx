import { Outlet } from 'react-router';
import { LayoutStyles } from '@Styles';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Wapper, IconWapper, MainWapper, IconStep1, IconStep2, IconStep3 } = LayoutStyles.DafalutLayoutStyle.BoraLayoutStyle;

const BoraLayout = () => {
    return (
        <MainContainer>
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
        </MainContainer>
    );
};

export default BoraLayout;

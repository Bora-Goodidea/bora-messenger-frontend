import { LayoutStyles } from '@Styles';
import { LoginSection } from '.';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;

const LoginMain = () => {
    return (
        <MainContainer>
            <LoginSection />
        </MainContainer>
    );
};

export default LoginMain;

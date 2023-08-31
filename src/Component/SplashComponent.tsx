import { LayoutStyles } from '@Styles';
import { DefaultSpinner } from '@Icons';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Wapper, Text } = LayoutStyles.SplashComponentStyle;

const SplashComponent = () => {
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

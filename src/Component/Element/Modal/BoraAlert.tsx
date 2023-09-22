import { ElementStyles } from '@Styles';

const {
    Container,
    Wapper,
    Opacity,
    HiddenScreen,
    AlertWapper,
    AlertBox,
    AlertGrid,
    AlertCenterWapper,
    AlertItem,
    AlertMessage: AlertMessageStyle,
    AlertButtonWapper,
    AlertButton,
} = ElementStyles.BoraAlertStyle;

const BoraAlert = ({ AlertState, AlertMessage, ButtonClick }: { AlertState: boolean; AlertMessage: string; ButtonClick: () => void }) => {
    console.debug('AlertState: ', AlertState);
    return (
        <>
            {AlertState && (
                <Container>
                    <Wapper>
                        <Opacity></Opacity>
                        <HiddenScreen></HiddenScreen>
                        <AlertWapper>
                            <AlertBox>
                                <AlertGrid>
                                    <AlertCenterWapper>
                                        <AlertItem>
                                            <AlertMessageStyle>{`${AlertMessage}`}</AlertMessageStyle>
                                            <AlertButtonWapper>
                                                <AlertButton onClick={() => ButtonClick()}>확인</AlertButton>
                                            </AlertButtonWapper>
                                        </AlertItem>
                                    </AlertCenterWapper>
                                </AlertGrid>
                            </AlertBox>
                        </AlertWapper>
                    </Wapper>
                </Container>
            )}
        </>
    );
};

export default BoraAlert;

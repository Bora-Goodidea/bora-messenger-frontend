import { ElementStyles } from '@Styles';

const { Container, MainWapper, Wapper, MessageWapper, MessageBox, ButtonWapper, Button } = ElementStyles.BoraAlertStyle;

const BoraAlert = ({ AlertState, AlertMessage, ButtonClick }: { AlertState: boolean; AlertMessage: string; ButtonClick: () => void }) => {
    return (
        <>
            {AlertState && (
                <Container>
                    <MainWapper>
                        <Wapper>
                            <MessageWapper>
                                <MessageBox>{`${AlertMessage}`}</MessageBox>
                            </MessageWapper>
                            <ButtonWapper>
                                <Button type="button" onClick={() => ButtonClick()}>
                                    확인
                                </Button>
                            </ButtonWapper>
                        </Wapper>
                    </MainWapper>
                </Container>
            )}
        </>
    );
};

export default BoraAlert;

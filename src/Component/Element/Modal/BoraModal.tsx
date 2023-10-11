import { ReactNode } from 'react';
import { ElementStyles } from '@Styles';

const { Container, MainWapper, Wapper, ButtonWapper, Button } = ElementStyles.BoraModalStyle;

const BoraAlert = ({ OkButtonClick, Children }: { OkButtonClick: () => void; Children: ReactNode }) => {
    return (
        <Container>
            <MainWapper>
                <Wapper>{Children}</Wapper>
                <ButtonWapper>
                    <Button type="button" onClick={() => OkButtonClick()}>
                        확인
                    </Button>
                </ButtonWapper>
            </MainWapper>
        </Container>
    );
};

export default BoraAlert;

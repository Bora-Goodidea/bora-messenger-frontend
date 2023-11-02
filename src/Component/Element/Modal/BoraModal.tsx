import { ReactNode } from 'react';
import { ElementStyles } from '@Styles';

const { Container, MainWapper, Wapper, ButtonWapper, Button } = ElementStyles.BoraModalStyle;

const BoraAlert = ({
    OkButtonClick,
    CancleButtonClick,
    Children,
}: {
    OkButtonClick: () => void;
    CancleButtonClick?: () => void;
    Children: ReactNode;
}) => {
    return (
        <Container>
            <MainWapper>
                <Wapper>{Children}</Wapper>
                <ButtonWapper>
                    <Button type="button" onClick={() => OkButtonClick()}>
                        확인
                    </Button>
                    <Button type="button" onClick={() => CancleButtonClick && CancleButtonClick()}>
                        취소
                    </Button>
                </ButtonWapper>
            </MainWapper>
        </Container>
    );
};

export default BoraAlert;

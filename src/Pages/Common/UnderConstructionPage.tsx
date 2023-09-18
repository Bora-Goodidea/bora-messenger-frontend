import { Helmet } from 'react-helmet-async';
import Const from '@Const';
import { LayoutStyles } from '@Style/index';
import { ReloadIcon, XIcon } from '@Icons';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Section, Container, Wapper, IconWapper, TitleText, SubText, BackIcon, BackButton } = LayoutStyles.UnderConstructionPageStyle;

const pageName = `공사중`;

const UnderConstructionPage = () => {
    return (
        <>
            <Helmet>
                <title>{`${Const.Site.title} | ${pageName}`}</title>
                <meta name="description" content={`${pageName} 페이지`} />
            </Helmet>

            <MainContainer>
                <Section>
                    <Container>
                        <Wapper>
                            <IconWapper>
                                <XIcon />
                            </IconWapper>
                            <TitleText>서버 작업중....</TitleText>
                            <SubText>서버 작업중 입니다 잠시후 다시 이용해 주세요.</SubText>

                            <BackIcon onClick={() => window.location.replace(`/`)}>
                                <BackButton>
                                    <ReloadIcon />

                                    <span>새로고침</span>
                                </BackButton>
                            </BackIcon>
                        </Wapper>
                    </Container>
                </Section>
            </MainContainer>
        </>
    );
};

export default UnderConstructionPage;

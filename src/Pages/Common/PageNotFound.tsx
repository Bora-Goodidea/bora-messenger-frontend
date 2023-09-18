import { useNavigate } from 'react-router-dom';
import { ExclamationMarkIcon, BackIcon as BackIconSvg } from '@Icons';
import { LayoutStyles } from '@Styles';
import { Helmet } from 'react-helmet-async';
import Const from '@Const';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Section, Container, Wapper, IconWapper, TitleText, SubText, BackIcon, BackButton } = LayoutStyles.NotFoundPageStyle;

const pageName = `존재 하지 않은`;

const PageNotFound = () => {
    const navigate = useNavigate();

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
                                <ExclamationMarkIcon />
                            </IconWapper>
                            <TitleText>페이지가 존재 하지 않아요</TitleText>
                            <SubText>찾고 계신 페이지가 존재하지 않습니다.</SubText>

                            <BackIcon onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}>
                                <BackButton>
                                    <BackIconSvg />

                                    <span>뒤로</span>
                                </BackButton>
                            </BackIcon>
                        </Wapper>
                    </Container>
                </Section>
            </MainContainer>
        </>
    );
};

export default PageNotFound;

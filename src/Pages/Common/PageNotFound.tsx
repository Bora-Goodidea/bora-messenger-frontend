import { useNavigate } from 'react-router-dom';
import { LayoutStyles } from '@Styles';

const { MainContainer } = LayoutStyles.DafalutLayoutStyle;
const { Section, Container, Wapper, IconWapper, TitleText, SubText, BackIcon, BackButton } = LayoutStyles.NotFoundPageStyle;

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <Section>
                <Container>
                    <Wapper>
                        <IconWapper>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                            </svg>
                        </IconWapper>
                        <TitleText>페이지가 존재 하지 않아요</TitleText>
                        <SubText>찾고 계신 페이지가 존재하지 않습니다.</SubText>

                        <BackIcon onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}>
                            <BackButton>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 rtl:rotate-180">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>

                                <span>뒤로</span>
                            </BackButton>
                        </BackIcon>
                    </Wapper>
                </Container>
            </Section>
        </MainContainer>
    );
};

export default PageNotFound;

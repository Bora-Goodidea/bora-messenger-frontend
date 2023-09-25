import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthService } from '@Modules';
import { LayoutStyles } from '@Style/index';
import { DefaultSpinner, LoginIcon } from '@Icons';
import Messages from '@Messages';

const { Section, Container, Wapper, SubText, BackIcon, BackButton } = LayoutStyles.EmailAutPageStyle;

const { EmailAuth: EmailAuthService } = AuthService;
const pageInitializeState = {
    loading: true,
    message: ``,
};

const EmailAuthMain = () => {
    const { AuthCode } = useParams();
    const navigate = useNavigate();

    const [pageState, setPageState] = useState<{
        loading: boolean;
        message: string;
    }>(pageInitializeState);

    const handleEmailAuth = async (AuthCode: string) => {
        const { status, message } = await EmailAuthService({ AuthCode: AuthCode });
        if (status) {
            setPageState(prevState => ({
                ...prevState,
                loading: false,
                message: Messages.Common.success,
            }));
        } else {
            setPageState(prevState => ({
                ...prevState,
                loading: false,
                message: message,
            }));
        }
    };

    useEffect(() => {
        const pageStart = (authCode: string) => {
            handleEmailAuth(authCode).then();
        };

        if (AuthCode) {
            pageStart(AuthCode);
        }
    }, [AuthCode]);

    return (
        <>
            {pageState.loading ? (
                <DefaultSpinner />
            ) : (
                <Section>
                    <Container>
                        <Wapper>
                            <SubText>{pageState.message}</SubText>

                            <BackIcon onClick={() => navigate(`${process.env.PUBLIC_URL}/auth/login`)}>
                                <BackButton>
                                    <LoginIcon />

                                    <span>로그인</span>
                                </BackButton>
                            </BackIcon>
                        </Wapper>
                    </Container>
                </Section>
            )}
        </>
    );
};

export default EmailAuthMain;

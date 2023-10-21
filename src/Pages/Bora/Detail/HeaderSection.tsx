import { BoraAvatar, BoraModal } from '@Elements';
import { NewMessageIcon } from '@Icons';
import { PageStyles } from '@Styles';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { MessengerUserListState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import Messages from '@Messages';
import { useLayout } from '@Hooks';

const { Title, NewMessage, UserList } = PageStyles.Bora.MessengerStyles.HeaderSection;

const pageInitializeState = {
    loading: false,
    users: [],
    selectList: [],
    modal: {
        createChat: false,
    },
};

const HeaderSection = ({
    MessengerCreate,
    ResetMessenger,
}: {
    MessengerCreate: (uid: Array<string>) => void;
    ResetMessenger: () => void;
}) => {
    const navigate = useNavigate();
    const { HandleMainAlert } = useLayout();
    const messengerUserListState = useRecoilValue(MessengerUserListState);
    const [pageState, setPageState] = useState<{
        loading: boolean;
        users: Array<{
            active: boolean;
            profileImage: string;
            name: string;
            email: string;
            uid: string;
        }>;
        modal: {
            createChat: boolean;
        };
        selectList: Array<{ uid: string }>;
    }>(pageInitializeState);

    // 사용자 아바타 클릭시 선택 상태 표시
    const handleUserSelection = ({ uid }: { uid: string }) => {
        if (lodash.findIndex(pageState.selectList, { uid: uid }) === -1) {
            setPageState(prevState => ({
                ...prevState,
                selectList: [...prevState.selectList, { uid: uid }],
            }));
        } else {
            setPageState(prevState => ({
                ...prevState,
                selectList: lodash.filter(prevState.selectList, e => e.uid !== uid),
            }));
        }
    };

    const handleClickYourStoryButton = () => {
        if (pageState.selectList.length === 0) {
            HandleMainAlert({
                state: true,
                message: Messages.Common.emptySelectUser,
            });
            return;
        }

        setPageState(prevState => ({
            ...prevState,
            selectList: [],
        }));

        MessengerCreate(lodash.map(pageState.selectList, e => e.uid));

        setPageState(prevState => ({
            ...prevState,
            modal: {
                ...prevState.modal,
                createChat: false,
            },
        }));
    };

    useEffect(() => {
        const fnSetUserList = () => {
            const { loading, users } = messengerUserListState;
            setPageState(prevState => ({
                ...prevState,
                loading: loading,
                users: lodash.map(users, user => {
                    return {
                        active: user.active.state === 'Y',
                        profileImage: user.profile.image,
                        name: user.nickname,
                        email: user.email,
                        uid: user.uid,
                    };
                }),
            }));
        };

        fnSetUserList();
    }, [messengerUserListState]);

    return (
        <>
            <BoraAvatar
                AvatarShadow={true}
                AvatarImage={[{ url: `https://avatars3.githubusercontent.com/u/22351907?s=60`, alt: `ravisankarchinnam` }]}
                AvatarSize={`default`}
                AvatarOnclick={() => navigate({ pathname: `${process.env.PUBLIC_URL}/bora/profile-update` })}
            />
            <Title
                onClick={() => {
                    navigate({ pathname: `${process.env.PUBLIC_URL}/bora/messenger` });
                    ResetMessenger();
                }}>
                Bora-Messenger
            </Title>
            <NewMessage
                onClick={() =>
                    setPageState(prevState => ({
                        ...prevState,
                        modal: {
                            ...prevState.modal,
                            createChat: true,
                        },
                    }))
                }>
                <NewMessageIcon />
            </NewMessage>

            {pageState.modal.createChat && (
                <BoraModal
                    Children={
                        <UserList.Container>
                            <UserList.Title>
                                <UserList.TitleText>대화 친구</UserList.TitleText>
                            </UserList.Title>
                            <UserList.ListFlow>
                                <UserList.ListWapper>
                                    {lodash.map(pageState.users, (user, index) => {
                                        return (
                                            <UserList.ListRow
                                                key={`header-section-create-chat-modal-item-${index}`}
                                                onClick={() => handleUserSelection({ uid: user.uid })}>
                                                <UserList.ListCard>
                                                    <UserList.ListCardImageWapper>
                                                        <UserList.ListCardImage src={user.profileImage} alt={user.name} />
                                                    </UserList.ListCardImageWapper>
                                                    <UserList.ListCardNameWapper>
                                                        <UserList.ListCardName>{user.name}</UserList.ListCardName>
                                                        <UserList.ListCardEmail>{user.email}</UserList.ListCardEmail>
                                                    </UserList.ListCardNameWapper>
                                                    <UserList.ListCardDate>방금전</UserList.ListCardDate>
                                                </UserList.ListCard>
                                            </UserList.ListRow>
                                        );
                                    })}
                                </UserList.ListWapper>
                            </UserList.ListFlow>
                        </UserList.Container>
                    }
                    OkButtonClick={() => handleClickYourStoryButton()}
                />
            )}
        </>
    );
};

export default HeaderSection;

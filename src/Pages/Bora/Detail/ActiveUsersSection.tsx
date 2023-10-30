import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MessengerUserListState, MessengerChatSearchState } from '@Recoil/MessengerState';
import lodash from 'lodash';
import { BoraButton, BoraAvatar } from '@Elements';
import { YourStoryIcon } from '@Icons';
import { PageStyles } from '@Styles';
import { DefaultSpinner } from '@Icons';
import { useLayout } from '@Hooks';
import Messages from '@Messages';

const { IconWapper, LoadingWapper, AvatarWapper, AvatarBox } = PageStyles.Bora.MessengerStyles.ActiveUsersSection;

const pageInitializeState = {
    loading: false,
    users: [],
    selectList: [],
};

const ActiveUsersSection = ({
    CreateLoading,
    MessengerCreate,
}: {
    CreateLoading: boolean;
    MessengerCreate: (uid: Array<string>) => void;
}) => {
    const messengerUserListState = useRecoilValue(MessengerUserListState);
    const messengerChatSearchState = useRecoilValue(MessengerChatSearchState);
    const { HandleMainAlert } = useLayout();

    const [pageState, setPageState] = useState<{
        loading: boolean;
        users: Array<{
            active: boolean;
            profileImage: string;
            name: string;
            uid: string;
        }>;
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

    // your story 버튼 클릭 처리
    // 사용자 선택후.
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
    };

    useEffect(() => {
        const fnSetUserList = () => {
            const { loading, users } = messengerUserListState;
            const { searchStr } = messengerChatSearchState;

            setPageState(prevState => ({
                ...prevState,
                loading: loading,
                users: lodash.map(
                    (() => {
                        if (searchStr.length > 0) {
                            return lodash.filter(users, el => lodash.includes(el.nickname, searchStr));
                        }
                        return users;
                    })(),
                    user => {
                        return {
                            active: user.active.state === 'Y',
                            profileImage: user.profile.image,
                            name: user.nickname,
                            uid: user.uid,
                        };
                    }
                ),
            }));
        };

        fnSetUserList();
    }, [messengerChatSearchState, messengerUserListState]);

    return (
        <>
            {pageState.loading ? (
                <DefaultSpinner />
            ) : (
                <>
                    {CreateLoading ? (
                        <LoadingWapper>
                            <DefaultSpinner />
                        </LoadingWapper>
                    ) : (
                        <>
                            <IconWapper onClick={() => handleClickYourStoryButton()}>
                                <BoraButton ButtonType={`RoundIcon`} ButtonChildren={<YourStoryIcon />} />
                                <p>Your Story</p>
                            </IconWapper>
                        </>
                    )}

                    {lodash.map(pageState.users, (user, index) => {
                        return (
                            <AvatarBox key={`Active-Users-avatar-item-${index}`} onClick={() => handleUserSelection({ uid: user.uid })}>
                                <AvatarWapper SelectStyle={lodash.findIndex(pageState.selectList, { uid: user.uid }) > -1}>
                                    <BoraAvatar
                                        AvatarActive={user.active}
                                        AvatarSelect={false}
                                        AvatarImage={[{ url: user.profileImage, alt: user.name }]}
                                        AvatarShadow={false}
                                        AvatarSize={`default`}
                                    />
                                </AvatarWapper>
                                <p>{`${user.name}`}</p>
                            </AvatarBox>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default ActiveUsersSection;

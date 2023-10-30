import { SearchIcon } from '@Icons';
import { BoraInput } from '@Elements';
import { PageStyles } from '@Styles';
import { ChangeEvent } from 'react';
import { MessengerChatSearchState } from '@Recoil/MessengerState';
import { useRecoilState } from 'recoil';

const { Container, Wapper, Label, Icon } = PageStyles.Bora.MessengerStyles.SearchSection;

const SearchSection = () => {
    const [messengerChatSearchState, setMessengerChatSearchState] = useRecoilState(MessengerChatSearchState);

    const handleOnchangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setMessengerChatSearchState(prevState => ({
            ...prevState,
            searchStr: e.target.value,
        }));
    };

    return (
        <Container>
            <Wapper>
                <Label>
                    <BoraInput
                        StyleType={`search`}
                        InputType={`text`}
                        InputValue={messengerChatSearchState.searchStr}
                        Placeholder={`Search Messenger`}
                        OnChange={e => handleOnchangeEvent(e)}
                    />
                    <Icon>
                        <SearchIcon />
                    </Icon>
                </Label>
            </Wapper>
        </Container>
    );
};

export default SearchSection;

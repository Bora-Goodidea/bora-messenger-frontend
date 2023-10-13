import { SearchIcon } from '@Icons';
import { BoraInput } from '@Elements';
import { PageStyles } from '@Styles';

const { Container, Wapper, Label, Icon } = PageStyles.Bora.MessengerStyles.SearchSection;

const SearchSection = () => {
    return (
        <Container>
            <Wapper>
                <Label>
                    <BoraInput
                        StyleType={`search`}
                        InputType={`text`}
                        InputValue={``}
                        Placeholder={`Search Messenger`}
                        OnChange={e => console.debug('SearchSection OnChange: ', e)}
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

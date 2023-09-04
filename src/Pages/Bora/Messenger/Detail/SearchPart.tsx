import { SearchIcon } from '@Icons';
import { BoraInput } from '@Elements';
import { PageStyles } from '@Styles';

const { Container, Wapper, Label, Icon } = PageStyles.Bora.MessengerStyles.SearchPart;

const SearchPart = () => {
    return (
        <Container>
            <Wapper>
                <Label>
                    <BoraInput StyleType={`search`} InputType={`text`} InputValue={``} Placeholder={`Search Messenger`} />
                    <Icon>
                        <SearchIcon />
                    </Icon>
                </Label>
            </Wapper>
        </Container>
    );
};

export default SearchPart;

import { SearchIcon } from '@Icons';
import { BoraInput } from '@Elements';

const SearchPart = () => {
    return (
        <label>
            <BoraInput StyleType={`search`} InputType={`text`} InputValue={``} Placeholder={`Search Messenger`} />
            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                <SearchIcon />
            </span>
        </label>
    );
};

export default SearchPart;

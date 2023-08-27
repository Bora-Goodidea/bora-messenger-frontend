import HeaderPart from './HeaderPart';
import SearchPart from './SearchPart';
import ActiveUsers from './ActiveUsers';

const MainContainer = () => {
    return (
        <>
            <section className="flex flex-col flex-none overflow-auto w-24 lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
                <div className="header p-4 flex flex-row justify-between items-center flex-none">
                    <HeaderPart />
                </div>
                <div className="search-box p-4 flex-none">
                    <div>
                        <div className="relative">
                            <SearchPart />
                        </div>
                    </div>
                </div>
                <div className="active-users flex flex-row p-2 overflow-auto w-0 min-w-full">
                    <ActiveUsers />
                </div>
            </section>
            <section className="flex flex-col flex-auto border-l"></section>
        </>
    );
};

export default MainContainer;

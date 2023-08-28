import { HeaderPart, ActiveUsersPart, SearchPart, ContactsPart, MessagePart } from '.';

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
                    <ActiveUsersPart />
                </div>
                <div className="contacts p-2 flex-1 overflow-y-scroll border-t">
                    <ContactsPart />
                </div>
            </section>
            <section className="flex flex-col flex-auto border-l">
                <MessagePart />
            </section>
        </>
    );
};

export default MainContainer;

import lodash from 'lodash';
import { TemporaryData } from '@Commons';
import tw, { styled } from 'twin.macro';

const Container = styled.div(({ SelectStyle }: { SelectStyle: boolean }) => {
    const twStyled = [tw`flex justify-between items-center p-3 rounded-lg relative cursor-pointer`];

    if (SelectStyle) {
        twStyled.push(tw`bg-gray-200`);
    } else {
        twStyled.push(tw`hover:bg-gray-100`);
    }

    return twStyled;
});

const ContactsPart = () => {
    return (
        <>
            {lodash.map(TemporaryData.Contacts, (c, index) => {
                return (
                    <Container SelectStyle={c.select} key={`contacts-part-item-${index}`}>
                        <div className="w-16 h-16 relative flex flex-shrink-0">
                            <img className="shadow-md rounded-full w-full h-full object-cover" src={`${c.profileImage}`} alt="" />
                            {c.now && (
                                <div className="absolute bg-white p-1 rounded-full bottom-0 right-0">
                                    <div className="bg-green-500 rounded-full w-3 h-3"></div>
                                </div>
                            )}
                        </div>
                        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block">
                            <p>{`${c.name}`}</p>
                            <div className="flex items-center text-sm text-gray-600">
                                <div className="min-w-0">
                                    <p className="truncate">{`${c.message}`}</p>
                                </div>
                            </div>
                            <p className="whitespace-no-wrap text-xs">{`${c.time}`}</p>
                        </div>
                    </Container>
                );
            })}
        </>
    );
};

export default ContactsPart;

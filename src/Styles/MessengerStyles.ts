import tw, { styled } from 'twin.macro';

export default {
    Container: {
        LeftContainer: tw.section`flex flex-col flex-none overflow-auto w-24 lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out`,
        RightContainer: tw.section`flex flex-col flex-auto border-l`,
        HeaderBox: tw.div`p-4 flex flex-row justify-between items-center flex-none`,
        SearchBox: tw.div`p-4 flex-none`,
        ActiveUsersBox: tw.div`flex flex-row p-2 overflow-auto w-0 min-w-full`,
        ContactsBox: tw.div`p-2 flex-1 overflow-y-scroll border-t`,
    },
    HeaderPart: {
        Title: tw.p`font-bold hidden md:block`,
        NewMessage: tw.div`block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2`,
    },
    SearchPart: {
        Container: tw.div``,
        Wapper: tw.div`relative`,
        Label: tw.label``,
        Icon: tw.span`absolute top-0 left-0 mt-2 ml-3 inline-block`,
    },
    ActiveUsersPart: {
        IconWapper: tw.div`text-sm text-center mr-4`,
        AvatarBox: tw.div`text-sm text-center mr-4`,
        AvatarWapper: styled.div(({ ActiveStyle }: { ActiveStyle: boolean }) => {
            const twStyled = [tw`p-1 border-4 rounded-full`];

            if (ActiveStyle) {
                twStyled.push(tw`border-blue-600`);
            } else {
                twStyled.push(tw`border-transparent`);
            }

            return twStyled;
        }),
    },
    ContactsPart: {
        Wapper: styled.div(({ SelectStyle }: { SelectStyle: boolean }) => {
            const twStyled = [tw`flex justify-between items-center p-3 rounded-lg relative cursor-pointer`];

            if (SelectStyle) {
                twStyled.push(tw`bg-gray-200`);
            } else {
                twStyled.push(tw`hover:bg-gray-100`);
            }

            return twStyled;
        }),
        AvatarBox: tw.div`w-16 h-16 relative flex flex-shrink-0`,
        AvatarImage: tw.img`shadow-md rounded-full w-full h-full object-cover`,
        AvatarActive: tw.div`absolute bg-white p-1 rounded-full bottom-0 right-0`,
        AvatarActiveMark: tw.div`bg-green-500 rounded-full w-3 h-3`,
        MessageWapper: tw.div`flex-auto min-w-0 ml-4 mr-6 hidden md:block`,
        MessageName: tw.p``,
        MessageBox: tw.div`flex items-center text-sm text-gray-600`,
        MessageMin: tw.div`min-w-0`,
        Message: tw.p`truncate`,
        MessageTime: tw.p`text-xs`,
    },
    MessagePart: {
        HeaderBox: tw.div`px-6 py-4 flex flex-row flex-none justify-between items-center shadow`,
        MessageBox: tw.div`p-4 flex-1 overflow-y-scroll`,
        FooterBox: tw.div`flex-none`,
    },
};

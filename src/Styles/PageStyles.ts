import tw, { styled } from 'twin.macro';

export default {
    Bora: {
        MessengerStyles: {
            Container: {
                LeftContainer: tw.section`flex flex-col flex-none overflow-auto w-24 lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out`,
                RightContainer: tw.section`flex flex-col flex-auto border-l`,
                HeaderBox: tw.div`p-4 flex flex-row justify-between items-center flex-none`,
                SearchBox: tw.div`p-4 flex-none`,
                ActiveUsersBox: tw.div`flex flex-row p-2 overflow-auto w-0 min-w-full`,
                ContactsBox: tw.div`p-2 flex-1 overflow-y-scroll border-t`,
            },
            HeaderSection: {
                Title: tw.p`font-bold hidden md:block`,
                NewMessage: tw.div`block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2`,
            },
            SearchSection: {
                Container: tw.div``,
                Wapper: tw.div`relative`,
                Label: tw.label``,
                Icon: tw.span`absolute top-0 left-0 mt-2 ml-3 inline-block`,
            },
            ActiveUsersSection: {
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
            ContactsSection: {
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
            MessageSection: {
                HeaderBox: tw.div`px-6 py-4 flex flex-row flex-none justify-between items-center shadow`,
                MessageBox: tw.div`p-4 flex-1 overflow-y-scroll`,
                MessageDate: tw.p`p-4 text-center text-sm text-gray-500`,
                FooterBox: tw.div`flex-none`,
            },
        },
        ProfileUpdateStyles: {
            Container: tw.section`w-full bg-gray-50 dark:bg-gray-900`,
            Wapper: tw.div`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`,
            FormWapper: tw.div`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`,
            FormBox: tw.div`p-6 space-y-4 md:space-y-6 sm:p-8`,
            TitleBox: tw.h1`flex justify-center text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`,
            AuthForm: tw.div`space-y-4 md:space-y-6`,
            InputItem: tw.div``,
            InputLabel: tw.label`block mb-2 text-sm font-medium text-gray-900 dark:text-white`,
            Input: tw.input`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
            Button: tw.button`w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`,
            ErrorMessage: tw.span`pt-1 font-medium text-xs text-red-500`,
            ProfileImageForm: tw.div`mt-1 flex items-center`,
            ProfileImage: tw.span`inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100`,
            DefaultProfileImage: tw.img``,
            ProfileInputItem: tw.input`absolute w-0 h-0 mx-0.5`,
            ProfileInputLabel: tw.label`ml-5 bg-gray-50 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
        },
    },
    Auth: {
        AuthStyles: {
            Container: tw.section`w-full bg-gray-50 dark:bg-gray-900`,
            Wapper: tw.div`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`,
            FormWapper: tw.div`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`,
            FormBox: tw.div`p-6 space-y-4 md:space-y-6 sm:p-8`,
            TitleBox: tw.h1`flex justify-center text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`,
            AuthForm: tw.form`space-y-4 md:space-y-6`,
            InputItem: tw.div``,
            InputLabel: tw.label`block mb-2 text-sm font-medium text-gray-900 dark:text-white`,
            Input: tw.input`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
            Button: tw.button`w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`,
            AuthButton: tw.span`flex text-sm font-light text-gray-500 dark:text-gray-400`,
            AuthText: tw.div`ml-2 font-medium text-sky-600 dark:text-blue-500 cursor-pointer`,
            ErrorMessage: tw.span`pt-1 font-medium text-xs text-red-500`,
            ManagerWapper: tw.div`flex items-center justify-between`,
            RememberId: tw.div`flex items-start`,
            CheckBoxWapper: tw.div`flex items-center h-5`,
            RememberTextWapper: tw.div`ml-3 text-sm`,
            RememberTextLabel: tw.label`text-gray-500 dark:text-gray-300`,
            RememberCheckBox: tw.input`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-4 focus:ring-sky-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-sky-600 dark:ring-offset-gray-800`,
        },
    },
};

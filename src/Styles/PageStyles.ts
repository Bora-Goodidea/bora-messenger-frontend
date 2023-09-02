import tw from 'twin.macro';

export default {
    AuthStyles: {
        RegisterPageStyle: {
            Container: tw.section`w-full bg-gray-50 dark:bg-gray-900`,
            Wapper: tw.div`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`,
            FormWapper: tw.div`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`,
            FormBox: tw.div`p-6 space-y-4 md:space-y-6 sm:p-8`,
            TitleBox: tw.h1`flex justify-center text-xl  font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white`,
            RegisterForm: tw.div`space-y-4 md:space-y-6`,
            InputItem: tw.div``,
            InputLabel: tw.label`block mb-2 text-sm font-medium text-gray-900 dark:text-white`,
            Input: tw.input`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
            RegisterButton: tw.button`w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`,
            LoginButton: tw.p`flex text-sm font-light text-gray-500 dark:text-gray-400`,
            LoginText: tw.div`ml-2 font-medium text-sky-600 dark:text-blue-500 cursor-pointer`,
            ErrorMessage: tw.p`pt-1 font-medium text-xs text-red-500`,
        },
    },
};

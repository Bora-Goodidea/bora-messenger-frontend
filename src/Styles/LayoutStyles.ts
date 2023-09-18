import tw from 'twin.macro';

export default {
    DafalutLayoutStyle: {
        MainContainer: tw.div`h-screen w-full flex antialiased text-gray-800 bg-white overflow-hidden`,
        BoraLayoutStyle: {
            Wapper: tw.div`flex-1 flex flex-col`,
            IconWapper: tw.div`border-b-2 p-2 flex flex-row z-20`,
            IconStep1: tw.div`bg-red-600 w-3 h-3 rounded-full mr-2`,
            IconStep2: tw.div`bg-yellow-500 w-3 h-3 rounded-full mr-2`,
            IconStep3: tw.div`bg-green-500 w-3 h-3 rounded-full mr-2`,
            MainWapper: tw.main`flex-grow flex flex-row min-h-0`,
        },
        BlankLayoutStyle: {},
    },
    NotFoundPageStyle: {
        Section: tw.div`w-full bg-white dark:bg-gray-900`,
        Container: tw.div`container flex items-center min-h-screen px-6 py-12 mx-auto`,
        Wapper: tw.div`flex flex-col items-center max-w-sm mx-auto text-center`,
        IconWapper: tw.div`p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800`,
        TitleText: tw.h1`mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl`,
        SubText: tw.p`mt-4 text-gray-500 dark:text-gray-400`,
        BackIcon: tw.div`flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto`,
        BackButton: tw.button`flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700`,
    },
    UnderConstructionPageStyle: {
        Section: tw.div`w-full bg-white dark:bg-gray-900`,
        Container: tw.div`container flex items-center min-h-screen px-6 py-12 mx-auto`,
        Wapper: tw.div`flex flex-col items-center max-w-sm mx-auto text-center`,
        IconWapper: tw.div`p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800`,
        TitleText: tw.h1`mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl`,
        SubText: tw.p`mt-4 text-gray-500 dark:text-gray-400`,
        BackIcon: tw.div`flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto`,
        BackButton: tw.button`flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700`,
    },
    SplashComponentStyle: {
        Wapper: tw.div`flex h-full w-full items-center justify-center`,
        Text: tw.span`sr-only`,
    },
};

import tw, { styled } from 'twin.macro';
import { BoraButtonType, LocationStyleType, AvatarStyleSizeType, BoraInputType } from '@CommonType';

export default {
    BoraAvatarStyle: {
        Wapper: styled.div(({ AvatarSize, AvatarSelect }: { AvatarSelect: boolean; AvatarSize: AvatarStyleSizeType }) => {
            const twStyled = [tw`relative flex flex-shrink-0`];

            if (AvatarSelect) {
                twStyled.push(tw`border-4 border-blue-600 rounded-full`);
            }

            if (AvatarSize === 'default') {
                twStyled.push(tw`w-16 h-16`);
            } else if (AvatarSize === 'middle') {
                twStyled.push(tw`w-12 h-12 mr-4`);
            } else if (AvatarSize === 'small') {
                twStyled.push(tw`w-8 h-8 mr-4`);
            }

            return twStyled;
        }),
        AvatarImage1: styled.img(({ Shadow }: { Shadow: boolean }) => {
            const twStyled = [tw`rounded-full w-full h-full object-cover`];

            if (Shadow) {
                twStyled.push(tw`shadow-md`);
            }

            return twStyled;
        }),
        AvatarImage: styled.img(({ Index, Multiple, Shadow }: { Shadow: boolean; Multiple: boolean; Index: number }) => {
            const twStyled = [tw`shadow-md rounded-full object-cover`];

            if (Multiple) {
                twStyled.push(tw`w-10 h-10 absolute`);
            } else {
                twStyled.push(tw`w-full h-full`);
            }

            if (Multiple && Index === 0) {
                twStyled.push(tw`ml-6`);
            } else if (Multiple && Index !== 0) {
                twStyled.push(tw`mt-6`);
            }

            if (Shadow) {
                twStyled.push(tw`shadow-md`);
            }

            return twStyled;
        }),
    },
    BoraButtonStyle: {
        Button: styled.button(({ ButtonType }: { ButtonType: BoraButtonType }) => {
            const twStyled = [tw`flex`];

            if (ButtonType === `RoundIcon`) {
                twStyled.push(tw`focus:outline-none bg-gray-200 text-gray-500 rounded-full w-20 h-20`);
            } else if (ButtonType === `MessageInputButton`) {
                twStyled.push(tw`focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6`);
            } else if (ButtonType === `MessageInInputButton`) {
                twStyled.push(tw`focus:outline-none absolute top-0 right-0 mt-2 mr-3 text-blue-600 hover:text-blue-700 w-6 h-6`);
            } else if (ButtonType === `MessageBoxMessageButton`) {
                twStyled.push(
                    tw`flex group-hover:block focus:outline-none mx-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 bg-gray-100 w-8 h-8 p-2`
                );
            }

            twStyled.push(tw`dark:bg-gray-800 dark:text-gray-600`);

            return twStyled;
        }),
    },
    IconStyle: {
        DefaultSvg: tw.svg`w-full h-full fill-current dark:text-white`,
        DefaultBlueSvg: tw.svg`w-full h-full fill-current text-blue-600`,
        DefaultWHSvg: tw.svg`w-6 h-6`,
        DefaultWHSvgAni: tw.svg`w-6 h-6 animate-bounce dark:text-white`,
        DefaultXSvg: tw.svg`text-red-600 w-6 h-6`,
        DefaultSpinnerSvg: tw.svg`inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-purple-600`,
        MessageInfoSvg: tw.svg`w-full h-full fill-current text-blue-600`,
        SearchSvg: tw.svg`w-6 h-6`,
        BackInfoSvg: tw.svg`w-5 h-5 rtl:rotate-180`,
        ButtonSpinnerSvg: tw.svg`inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600`,
    },
    BoraInputStyle: {
        Input: styled.input(({ StyleType }: { StyleType: BoraInputType }) => {
            const twStyled = [
                tw`pl-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:shadow-md transition duration-300 ease-in dark:bg-gray-800 dark:border-gray-800 dark:focus:border-gray-700 dark:focus:bg-gray-900 dark:focus:outline-none dark:text-gray-200`,
            ];

            if (StyleType === `search`) {
                twStyled.push(tw`rounded-full py-2 pr-6`);
            } else if (StyleType === `send`) {
                twStyled.push(tw`rounded-full py-2 pl-3`);
            }

            return twStyled;
        }),
    },
    MessageStyle: {
        MessageBox: {
            Container: styled.div(({ LocationStyle }: { LocationStyle: LocationStyleType }) => {
                const twStyled = [tw`flex flex-row`];

                if (LocationStyle === `left`) {
                    twStyled.push(tw`justify-start`);
                } else if (LocationStyle === `right`) {
                    twStyled.push(tw`justify-end`);
                }

                return twStyled;
            }),
            MessageWapper: styled.div(({ LocationStyle }: { LocationStyle: LocationStyleType }) => {
                const twStyled = [tw`text-sm grid grid-flow-row gap-2`];

                if (LocationStyle === `left`) {
                    twStyled.push(tw`text-gray-700`);
                } else if (LocationStyle === `right`) {
                    twStyled.push(tw`text-white`);
                }

                return twStyled;
            }),
            MessageTextItemWapper: styled.div(({ LocationStyle }: { LocationStyle: LocationStyleType }) => {
                const twStyled = [tw`cursor-pointer`];

                if (LocationStyle === `left`) {
                    twStyled.push(tw`flex items-center`);
                } else if (LocationStyle === `right`) {
                    twStyled.push(tw`flex items-center flex-row-reverse`);
                }

                return twStyled;
            }),
        },
        MessageFooterBox: {
            Container: tw.div`flex flex-row items-center p-4`,
            InputBox: tw.div`relative flex-grow`,
            InputWapper: tw.label``,
        },
        MessageHeader: {
            Wapper: tw.div`flex`,
            TextWapper: tw.div`text-sm dark:text-white`,
            Name: tw.p`font-bold`,
            Time: tw.p``,
            IconWapper: tw.div`block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2 ml-4 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer`,
        },
        MessageItem: {
            MessageTextWapper: styled.p(
                ({ IndexStyle, LocationStyle }: { IndexStyle: string | `first` | `middle` | `last`; LocationStyle: LocationStyleType }) => {
                    const twStyled = [];

                    if (IndexStyle === `first`) {
                        twStyled.push(tw`px-6 py-3 rounded-t-full max-w-xs lg:max-w-md`);
                    } else if (IndexStyle === `last`) {
                        twStyled.push(tw`px-6 py-3 rounded-b-full max-w-xs lg:max-w-md`);
                    } else {
                        twStyled.push(tw`px-6 py-3 max-w-xs lg:max-w-md`);
                    }

                    if (LocationStyle === `left`) {
                        twStyled.push(tw`bg-gray-200 rounded-r-full dark:bg-gray-800 dark:text-gray-200`);
                    } else if (LocationStyle === `right`) {
                        twStyled.push(tw`bg-blue-500 rounded-l-full dark:bg-blue-700`);
                    }
                    return twStyled;
                }
            ),
            MessageImageWapper: tw.div`w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md cursor-pointer`,
            MessageImage: tw.img`absolute shadow-md w-full h-full rounded-l-lg object-cover`,
        },
    },
    BoraAlertStyle: {
        Container: tw.div`flex fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen items-center justify-center`,
        MainWapper: tw.div`relative w-full max-w-2xl max-h-full`,
        Wapper: tw.div`relative bg-white rounded-lg shadow dark:bg-gray-700`,
        MessageWapper: tw.div`p-6 space-y-6`,
        MessageBox: tw.p`text-base leading-relaxed text-gray-500 dark:text-gray-400`,
        ButtonWapper: tw.div`flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600`,
        Button: tw.button`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
    },
    BoraModalStyle: {
        Container: tw.div`flex fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen items-center justify-center`,
        MainWapper: tw.div`relative bg-white w-full max-w-2xl max-h-full rounded-lg shadow dark:bg-gray-700`,
        Wapper: tw.div`relative bg-white p-4 rounded-lg shadow dark:bg-gray-700 max-h-60 overflow-x-hidden overflow-y-auto`,
        ButtonWapper: tw.div`flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600`,
        Button: tw.button`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
    },
    Sweetalert: {
        Title: tw.p`text-2xl`,
        Content: tw.p`text-sm whitespace-pre-line text-left`,
    },
};

import tw, { styled } from 'twin.macro';
import { BoraButtonType, LocationStyleType, AvatarStyleSizeType, BoraInputType } from '@CommonType';

export default {
    BoraAvatarStyle: {
        Wapper: styled.div(({ AvatarSize }: { AvatarSize: AvatarStyleSizeType }) => {
            const twStyled = [tw`relative flex flex-shrink-0`];

            if (AvatarSize === 'default') {
                twStyled.push(tw`w-16 h-16`);
            } else if (AvatarSize === 'middle') {
                twStyled.push(tw`w-12 h-12 mr-4`);
            } else if (AvatarSize === 'small') {
                twStyled.push(tw`w-8 h-8 mr-4`);
            }

            return twStyled;
        }),
        AvatarImage: styled.img(({ Shadow }: { Shadow: boolean }) => {
            const twStyled = [tw`rounded-full w-full h-full object-cover`];

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

            return twStyled;
        }),
    },
    IconStyle: {
        DefaultSvg: tw.svg`w-full h-full fill-current`,
        DefaultWHSvg: tw.svg`w-6 h-6`,
        DefaultXSvg: tw.svg`text-red-600 w-6 h-6`,
        DefaultSpinnerSvg: tw.svg`inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-purple-600`,
        MessageInfoSvg: tw.svg`w-full h-full fill-current text-blue-600`,
        SearchSvg: tw.svg`w-6 h-6`,
        BackInfoSvg: tw.svg`w-5 h-5 rtl:rotate-180`,
        ButtonSpinnerSvg: tw.svg`inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600`,
    },
    BoraInputStyle: {
        Input2: tw.input`rounded-full py-2 pr-6 pl-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in`,
        Input: styled.input(({ StyleType }: { StyleType: BoraInputType }) => {
            const twStyled = [];

            if (StyleType === `search`) {
                twStyled.push(
                    tw`rounded-full py-2 pr-6 pl-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in`
                );
            } else if (StyleType === `send`) {
                twStyled.push(
                    tw`rounded-full py-2 pl-3 pr-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in`
                );
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
            TextWapper: tw.div`text-sm`,
            Name: tw.p`font-bold`,
            Time: tw.p``,
            IconWapper: tw.div`block rounded-full hover:bg-gray-200 bg-gray-100 w-10 h-10 p-2 ml-4`,
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
                        twStyled.push(tw`bg-gray-200 rounded-r-full`);
                    } else if (LocationStyle === `right`) {
                        twStyled.push(tw`bg-blue-500 rounded-l-full`);
                    }

                    return twStyled;
                }
            ),
            MessageImageWapper: tw.div`w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md cursor-pointer`,
            MessageImage: tw.img`absolute shadow-md w-full h-full rounded-l-lg object-cover`,
        },
    },
    BoraAlertStyle: {
        Container: tw.div`overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-gray-800`,
        Wapper: tw.div`flex justify-center items-end text-center min-h-screen sm:block`,
        Opacity: tw.div`bg-gray-500 transition-opacity bg-opacity-75`,
        HiddenScreen: tw.span`hidden sm:inline-block sm:align-middle sm:h-screen`,
        AlertWapper: tw.div`inline-block bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full`,
        AlertBox: tw.div`items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24`,
        AlertGrid: tw.div`grid grid-cols-1`,
        AlertCenterWapper: tw.div`mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg`,
        AlertItem: tw.div`flex flex-col items-center`,
        AlertMessage: tw.p`mt-3 text-base leading-relaxed text-center text-gray-200`,
        AlertButtonWapper: tw.div`w-full mt-10`,
        AlertButton: tw.div`text-white bg-sky-600 font-medium rounded-lg text-sm py-2.5 px-5 text-center hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-blue-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`,
    },
    Sweetalert: {
        Title: tw.p`text-2xl`,
        Content: tw.p`text-sm whitespace-pre-line text-left`,
    },
};

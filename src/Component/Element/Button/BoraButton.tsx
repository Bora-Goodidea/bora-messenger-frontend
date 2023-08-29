import React from 'react';
import tw, { styled } from 'twin.macro';

type ButtonType = `RoundIcon` | `MessageInputButton` | `MessageInInputButton` | `MessageBoxMessageButton`;

const Button = styled.button(({ ButtonType }: { ButtonType: ButtonType }) => {
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
});

const BoraButton = ({ ButtonType, ButtonChildren }: { ButtonType: ButtonType; ButtonChildren?: React.ReactNode }) => {
    return (
        <Button type="button" ButtonType={ButtonType}>
            {ButtonChildren ?? ButtonChildren}
        </Button>
    );
};

export default BoraButton;

import React from 'react';
import { BoraButtonType } from '@CommonType';
import { ElementStyles } from '@Styles';

const { Button } = ElementStyles.BoraButtonStyle;

const BoraButton = ({
    ButtonType,
    ButtonChildren,
    HandleOnClick,
}: {
    ButtonType: BoraButtonType;
    ButtonChildren?: React.ReactNode;
    HandleOnClick?: () => void;
}) => {
    return (
        <Button type="button" ButtonType={ButtonType} onClick={() => HandleOnClick && HandleOnClick()}>
            {ButtonChildren ?? ButtonChildren}
        </Button>
    );
};

export default BoraButton;

import React from 'react';
import { BoraButtonType } from '@CommonType';
import { ElementStyles } from '@Styles';

const { Button } = ElementStyles.BoraButtonStyle;

const BoraButton = ({ ButtonType, ButtonChildren }: { ButtonType: BoraButtonType; ButtonChildren?: React.ReactNode }) => {
    return (
        <Button type="button" ButtonType={ButtonType}>
            {ButtonChildren ?? ButtonChildren}
        </Button>
    );
};

export default BoraButton;

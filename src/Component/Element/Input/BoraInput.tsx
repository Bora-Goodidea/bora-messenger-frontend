import { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { ElementStyles } from '@Styles';
import { BoraInputType } from '@CommonType';

const { Input } = ElementStyles.BoraInputStyle;

const BoraInput = ({
    StyleType,
    InputType,
    InputValue,
    Placeholder,
    OnChange,
    EnterInputRef,
    HandleOnKeyDown,
}: {
    StyleType: BoraInputType;
    InputType: string;
    InputValue: string;
    Placeholder: string;
    OnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    EnterInputRef?: MutableRefObject<HTMLInputElement>;
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}) => {
    return (
        <Input
            ref={el => EnterInputRef && (EnterInputRef.current = el as HTMLInputElement)}
            StyleType={StyleType}
            type={InputType}
            value={InputValue}
            placeholder={Placeholder}
            onChange={(e: ChangeEvent<HTMLInputElement>) => OnChange(e)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => HandleOnKeyDown && HandleOnKeyDown(e)}
        />
    );
};

export default BoraInput;

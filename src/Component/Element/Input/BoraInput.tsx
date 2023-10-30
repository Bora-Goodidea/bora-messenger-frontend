import { ChangeEvent, KeyboardEvent, MutableRefObject, FocusEvent } from 'react';
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
    HandleOnInput,
    HandleOnBlur,
    HandleDisabled,
}: {
    StyleType: BoraInputType;
    InputType: string;
    InputValue: string;
    Placeholder: string;
    OnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    EnterInputRef?: MutableRefObject<HTMLInputElement>;
    HandleOnKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    HandleOnInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    HandleOnBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    HandleDisabled?: boolean;
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
            onInput={(e: ChangeEvent<HTMLInputElement>) => HandleOnInput && HandleOnInput(e)}
            onBlur={(e: FocusEvent<HTMLInputElement>) => HandleOnBlur && HandleOnBlur(e)}
            disabled={HandleDisabled}
        />
    );
};

export default BoraInput;

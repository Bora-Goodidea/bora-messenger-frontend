import { ElementStyles } from '@Styles';
import { BoraInputType } from '@CommonType';

const { Input } = ElementStyles.BoraInputStyle;

const BoraInput = ({
    StyleType,
    InputType,
    InputValue,
    Placeholder,
}: {
    StyleType: BoraInputType;
    InputType: string;
    InputValue: string;
    Placeholder: string;
}) => {
    return (
        <Input
            StyleType={StyleType}
            type={InputType}
            value={InputValue}
            placeholder={Placeholder}
            onChange={() => console.debug('BoraInput onChange')}
        />
    );
};

export default BoraInput;

const BoraInput = ({ InputType, InputValue, Placeholder }: { InputType: string; InputValue: string; Placeholder: string }) => {
    return (
        <input
            className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in"
            type={InputType}
            value={InputValue}
            placeholder={Placeholder}
            onChange={() => console.debug('BoraInput onChange')}
        />
    );
};

export default BoraInput;

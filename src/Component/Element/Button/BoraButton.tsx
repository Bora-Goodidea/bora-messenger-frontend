import React from 'react';

const BoraButton = ({ Icon }: { Icon: React.ReactNode }) => {
    return (
        <button className="flex flex-shrink-0 focus:outline-none bg-gray-200 text-gray-500 rounded-full w-20 h-20" type="button">
            {Icon ? Icon : `Button`}
        </button>
    );
};

export default BoraButton;

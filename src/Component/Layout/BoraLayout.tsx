import { Outlet } from 'react-router';

const BoraLayout = () => {
    return (
        <div className="h-screen w-full flex antialiased text-gray-800 bg-white overflow-hidden">
            <div className="flex-1 flex flex-col">
                <div className="border-b-2 p-2 flex flex-row z-20">
                    <div className="bg-red-600 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
                    <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                </div>
                <main className="flex-grow flex flex-row min-h-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default BoraLayout;

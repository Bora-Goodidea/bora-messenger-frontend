import { BoraButton } from '@Elements';
import { MessageBoxHamburgerIcon, MessageBoxReplayIcon, MessageBoxOptionIcon } from '@Icons';

const MessageBox = () => {
    return (
        <>
            <div className="flex flex-row justify-start">
                <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                    <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/women/33.jpg"
                        alt=""
                    />
                </div>
                <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                    <div className="flex items-center group">
                        <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Hey! How are you?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center group">
                        <p className="px-6 py-3 rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Shall we go for Hiking this weekend?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center group">
                        <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Volutpat lacus laoreet non curabitur gravida.
                        </p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                </div>
            </div>
            <p className="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>
            <div className="flex flex-row justify-end">
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse group">
                        <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Hey! How are you?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                        <p className="px-6 py-3 rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Shall we go for Hiking this weekend?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                        <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Volutpat lacus laoreet non curabitur gravida.
                        </p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                </div>
            </div>
            <p className="p-4 text-center text-sm text-gray-500">SAT 2:10 PM</p>
            <div className="flex flex-row justify-start">
                <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                    <img
                        className="shadow-md rounded-full w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/women/33.jpg"
                        alt=""
                    />
                </div>
                <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                    <div className="flex items-center group">
                        <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Hey! How are you?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center group">
                        <p className="px-6 py-3 rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">Shall we go for Hiking this weekend?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center group">
                        <p className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-100 max-w-xs lg:max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Volutpat lacus laoreet non curabitur gravida.
                        </p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                </div>
            </div>
            <p className="p-4 text-center text-sm text-gray-500">12:40 PM</p>
            <div className="flex flex-row justify-end">
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse group">
                        <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Hey! How are you?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                        <p className="px-6 py-3 rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">Shall we go for Hiking this weekend?</p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                        <a className="w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md" href="#">
                            <img
                                className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                                src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
                                alt="hiking"
                            />
                        </a>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                    <div className="flex items-center flex-row-reverse group">
                        <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-500 max-w-xs lg:max-w-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Volutpat lacus laoreet non curabitur gravida.
                        </p>
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxHamburgerIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxReplayIcon />} />
                        <BoraButton ButtonType={`MessageBoxMessageButton`} ButtonChildren={<MessageBoxOptionIcon />} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageBox;

const MessageAvatar = ({
    AvatarUrl,
    AvataAltString,
    AvatarName,
    MessageTime,
}: {
    AvatarUrl: string;
    AvataAltString: string;
    AvatarName: string;
    MessageTime: string;
}) => {
    return (
        <>
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover" src={AvatarUrl} alt={AvataAltString} />
            </div>
            <div className="text-sm">
                <p className="font-bold">{`${AvatarName}`}</p>
                <p>{`${MessageTime}`}</p>
            </div>
        </>
    );
};

export default MessageAvatar;

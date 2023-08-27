const UserAvatar = ({ AvatarUrl, AvataAltString }: { AvatarUrl: string; AvataAltString: string }) => {
    return (
        <div className="w-16 h-16 relative flex flex-shrink-0">
            <img className="rounded-full w-full h-full object-cover" alt={`${AvataAltString}`} src={`${AvatarUrl}`} />
        </div>
    );
};

export default UserAvatar;

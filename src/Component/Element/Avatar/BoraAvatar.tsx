import tw, { styled } from 'twin.macro';

const Container = styled.div(({ ActiveStyle }: { ActiveStyle: boolean }) => {
    const twStyled = [tw`p-1 border-4 rounded-full`];

    if (ActiveStyle) {
        twStyled.push(tw`border-blue-600`);
    } else {
        twStyled.push(tw`border-transparent`);
    }

    return twStyled;
});

const BoraAvatar = ({
    Active,
    AvatarName,
    AvatarUrl,
    AvataAltString,
}: {
    Active: boolean;
    AvatarName?: string;
    AvatarUrl: string;
    AvataAltString: string;
}) => {
    return (
        <>
            <Container ActiveStyle={Active}>
                <div className="w-16 h-16 relative flex flex-shrink-0">
                    <img className="shadow-md rounded-full w-full h-full object-cover" src={AvatarUrl} alt={AvataAltString} />
                </div>
            </Container>
            {AvatarName && <p>{`${AvatarName}`}</p>}
        </>
    );
};

export default BoraAvatar;

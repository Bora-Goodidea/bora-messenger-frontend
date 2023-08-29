import tw, { styled } from 'twin.macro';

const Wapper = styled.div(({ SmallSize }: { SmallSize: boolean }) => {
    const twStyled = [tw`relative flex flex-shrink-0`];

    if (SmallSize) {
        twStyled.push(tw`w-12 h-12 mr-4`);
    } else {
        twStyled.push(tw`w-16 h-16`);
    }

    return twStyled;
});

const AvatarImage = styled.img(({ Shadow }: { Shadow: boolean }) => {
    const twStyled = [tw`rounded-full w-full h-full object-cover`];

    if (Shadow) {
        twStyled.push(tw`shadow-md`);
    }

    return twStyled;
});

const BoraAvatar = ({
    AvatarUrl,
    AvataAltString,
    AvatarShadow,
    SmallSize,
}: {
    AvatarShadow: boolean;
    AvatarUrl: string;
    AvataAltString: string;
    SmallSize: boolean;
}) => {
    return (
        <Wapper SmallSize={SmallSize ? SmallSize : false}>
            <AvatarImage Shadow={AvatarShadow ? AvatarShadow : false} src={AvatarUrl} alt={AvataAltString} />
        </Wapper>
    );
};

export default BoraAvatar;

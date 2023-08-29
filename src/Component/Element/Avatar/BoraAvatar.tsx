import { ElementStyles } from '@Styles';
import { AvatarStyleSizeType } from '@CommonType';

const { Wapper, AvatarImage } = ElementStyles.BoraAvatarStyle;

const BoraAvatar = ({
    AvatarUrl,
    AvataAltString,
    AvatarShadow,
    AvatarSize,
}: {
    AvatarShadow: boolean;
    AvatarUrl: string;
    AvataAltString: string;
    AvatarSize: AvatarStyleSizeType;
}) => {
    return (
        <Wapper AvatarSize={AvatarSize ? AvatarSize : `default`}>
            <AvatarImage Shadow={AvatarShadow ? AvatarShadow : false} src={AvatarUrl} alt={AvataAltString} />
        </Wapper>
    );
};

export default BoraAvatar;

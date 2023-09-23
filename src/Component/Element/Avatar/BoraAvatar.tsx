import { ElementStyles } from '@Styles';
import { AvatarStyleSizeType } from '@CommonType';

const { Wapper, AvatarImage } = ElementStyles.BoraAvatarStyle;

const BoraAvatar = ({
    AvatarUrl,
    AvataAltString,
    AvatarShadow,
    AvatarSize,
    AvatarOnclick,
}: {
    AvatarShadow: boolean;
    AvatarUrl: string;
    AvataAltString: string;
    AvatarSize: AvatarStyleSizeType;
    AvatarOnclick?: () => void;
}) => {
    return (
        <Wapper AvatarSize={AvatarSize ? AvatarSize : `default`}>
            <AvatarImage
                Shadow={AvatarShadow ? AvatarShadow : false}
                src={AvatarUrl}
                alt={AvataAltString}
                onClick={() => AvatarOnclick && AvatarOnclick()}
            />
        </Wapper>
    );
};

export default BoraAvatar;

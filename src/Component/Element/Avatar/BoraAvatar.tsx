import { ElementStyles } from '@Styles';
import { AvatarStyleSizeType } from '@CommonType';

const { Wapper, AvatarImage } = ElementStyles.BoraAvatarStyle;

const BoraAvatar = ({
    AvatarUrl,
    AvataAltString,
    AvatarShadow,
    AvatarSize,
    AvatarOnclick,
    AvatarSelect,
}: {
    AvatarShadow: boolean;
    AvatarUrl: string;
    AvataAltString: string;
    AvatarSize: AvatarStyleSizeType;
    AvatarOnclick?: () => void;
    AvatarSelect?: boolean;
}) => {
    return (
        <Wapper AvatarSize={AvatarSize ? AvatarSize : `default`} AvatarSelect={AvatarSelect ? AvatarSelect : false}>
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

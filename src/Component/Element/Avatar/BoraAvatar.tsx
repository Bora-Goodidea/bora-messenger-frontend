import { ElementStyles } from '@Styles';
import { AvatarStyleSizeType } from '@CommonType';
import lodash from 'lodash';

const { Wapper, AvatarImage: AvatarImageStyle } = ElementStyles.BoraAvatarStyle;

const BoraAvatar = ({
    AvatarImage,
    AvatarShadow,
    AvatarSize,
    AvatarOnclick,
    AvatarSelect,
}: {
    AvatarShadow: boolean;
    AvatarImage: Array<{ url: string; alt: string }>;
    AvatarSize: AvatarStyleSizeType;
    AvatarOnclick?: () => void;
    AvatarSelect?: boolean;
}) => {
    return (
        <Wapper AvatarSize={AvatarSize ? AvatarSize : `default`} AvatarSelect={AvatarSelect ? AvatarSelect : false}>
            {lodash.map(AvatarImage, (image, i, list) => {
                return (
                    <AvatarImageStyle
                        key={`bora-avatar-avatar-image-item-${i}`}
                        Shadow={AvatarShadow ? AvatarShadow : false}
                        src={image.url}
                        alt={image.alt}
                        Multiple={list.length > 1}
                        Index={i}
                        onClick={() => AvatarOnclick && AvatarOnclick()}
                    />
                );
            })}
        </Wapper>
    );
};

export default BoraAvatar;

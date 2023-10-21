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
    AvatarActive,
}: {
    AvatarShadow: boolean;
    AvatarImage: Array<{ url: string; alt: string }>;
    AvatarSize: AvatarStyleSizeType;
    AvatarOnclick?: () => void;
    AvatarSelect?: boolean;
    AvatarActive?: boolean;
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
                        className="cursor-pointer"
                    />
                );
            })}
            {AvatarActive && (
                <div className="absolute bg-white p-1 rounded-full bottom-0 right-0">
                    <div className="bg-green-500 rounded-full w-3 h-3"></div>
                </div>
            )}
        </Wapper>
    );
};

export default BoraAvatar;

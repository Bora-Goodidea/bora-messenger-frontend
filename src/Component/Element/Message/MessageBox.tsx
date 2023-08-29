import lodash from 'lodash';
import tw, { styled } from 'twin.macro';
import MessageItem from './MessageItem';

type LocationStyleType = string | `left` | `right`;

const Container = styled.div(({ LocationStyle }: { LocationStyle: LocationStyleType }) => {
    const twStyled = [tw`flex flex-row`];

    if (LocationStyle === `left`) {
        twStyled.push(tw`justify-start`);
    } else if (LocationStyle === `right`) {
        twStyled.push(tw`justify-end`);
    }

    return twStyled;
});

const MessageWapper = styled.div(({ LocationStyle }: { LocationStyle: LocationStyleType }) => {
    const twStyled = [tw`text-sm grid grid-flow-row gap-2`];

    if (LocationStyle === `left`) {
        twStyled.push(tw`text-gray-700`);
    } else if (LocationStyle === `right`) {
        twStyled.push(tw`text-white`);
    }

    return twStyled;
});

const MessageTextItemWapper = styled.div(({ LocationStyle }: { LocationStyle: LocationStyleType }) => {
    const twStyled = [tw`cursor-pointer`];

    if (LocationStyle === `left`) {
        twStyled.push(tw`flex items-center`);
    } else if (LocationStyle === `right`) {
        twStyled.push(tw`flex items-center flex-row-reverse`);
    }
    return twStyled;
});

const MessageBox = ({
    MessageLocation,
    ProfileImage,
    MessageList,
}: {
    MessageLocation: LocationStyleType;
    ProfileImage: string | null;
    MessageList: Array<{ type: string | `text` | `image`; message: string }>;
}) => {
    return (
        <Container LocationStyle={MessageLocation}>
            {MessageLocation === `left` && ProfileImage && (
                <>
                    <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                        <img className="shadow-md rounded-full w-full h-full object-cover" src={ProfileImage} alt="" />
                    </div>
                </>
            )}
            <MessageWapper LocationStyle={MessageLocation}>
                {lodash.map(MessageList, (m, index, mList) => {
                    return (
                        <MessageTextItemWapper key={`message-box-message-item-${index}`} LocationStyle={MessageLocation}>
                            <MessageItem
                                MessageLocation={MessageLocation}
                                Message={m.message}
                                MessageType={m.type}
                                MessageStyle={
                                    mList.length === 1 ? 'middle' : index === 0 ? `first` : index === mList.length - 1 ? `last` : `middle`
                                }
                            />
                        </MessageTextItemWapper>
                    );
                })}
            </MessageWapper>
        </Container>
    );
};

export default MessageBox;

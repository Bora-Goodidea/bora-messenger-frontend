export type BoraButtonType = `RoundIcon` | `MessageInputButton` | `MessageInInputButton` | `MessageBoxMessageButton`;
export type LocationStyleType = string | `left` | `right`;
export type AvatarStyleSizeType = string | `default` | `middle` | `small`;
export type BoraInputType = string | `search` | `send`;
export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure';

export interface ServicesResult<T> {
    status: boolean;
    message: string;
    payload: T;
}

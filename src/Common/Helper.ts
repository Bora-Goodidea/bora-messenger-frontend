/**
 * 컬러 콘솔 디버그
 * @param color
 * @param message
 */
export const colorDebug = (color: 'success' | 'info' | 'error' | 'warning', message: string): void => {
    switch (color) {
        case 'success':
            console.debug('%c' + message, 'color: Green');
            break;
        case 'info':
            console.debug('%c' + message, 'color: #42FF33');
            break;
        case 'error':
            console.debug('%c' + message, 'color: Red');
            break;
        case 'warning':
            console.debug('%c' + message, 'color: Orange');
            break;
        default:
            console.debug('%c' + message, 'color: Green');
    }

    return;
};

/**
 * 개발 디버그
 * @param e
 * @constructor
 */
export const DEBUG = (e: any) => {
    console.debug('%c::DEBUG::', 'color: green; font-weight: bold;', e);
};

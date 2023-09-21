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
    console.debug('%c::DEBUG::', 'color: #EE82EE; font-weight: lighter;', e);
};

/**
 * localStorage 체크
 */
export const isLocalStorageEnabled = (): boolean => {
    try {
        const key = `__storage__test`;
        window.localStorage.setItem(key, '');
        window.localStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * 로컬 스토리지 매니저.
 */
export const storageManager = {
    set: (key: string, object: any) => {
        if (!localStorage) return;
        localStorage[key] = typeof object === 'string' ? object : JSON.stringify(object);
    },
    get: (key: string) => {
        if (!localStorage) return null;

        if (!localStorage[key]) {
            return null;
        }

        try {
            return JSON.parse(localStorage[key]);
        } catch (e) {
            return localStorage[key];
        }
    },
    remove: (key: string) => {
        if (!localStorage) return null;

        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
    },
};

/**
 * 로컬 쿠키 매니저.
 */
export const cookieManager = {
    set: (cname: string, cvalue: string, hours = 24) => {
        const d = new Date();
        d.setTime(d.getTime() + hours * 60 * 60 * 1000); // (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    },
    get: (cname: string) => {
        const name = cname + '=';
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return '';
    },
    remove: (cname: string) => {
        const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        document.cookie = cname + '=;' + expires + ';path=/';
    },
};

/**
 * localstorage, cookie 매니져
 */
export const storageMaster = {
    set: (key: string, object: any) => {
        if (isLocalStorageEnabled()) {
            storageManager.set(key, object);
        } else {
            cookieManager.set(key, object);
        }
    },
    get: (key: string) => {
        if (isLocalStorageEnabled()) {
            return storageManager.get(key);
        } else {
            return cookieManager.get(key);
        }
    },
    remove: (key: string) => {
        if (isLocalStorageEnabled()) {
            storageManager.remove(key);
        } else {
            cookieManager.remove(key);
        }
    },
};

/**
 * RefreshToken 저장
 * @param accessToken
 * @param refreshToken
 */
export const saveRefreshToken = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }): void => {
    storageMaster.set(`accessToken`, accessToken);
    storageMaster.set(`refreshToken`, refreshToken);

    return;
};

/**
 * RefreshToken 삭제
 */
export const removeLoginToken = (): void => {
    storageMaster.remove(`accessToken`);
    storageMaster.remove(`refreshToken`);

    return;
};

/**
 * RefreshToken 리턴
 */
export const getRefreshToken = (): string => storageMaster.get(`refreshToken`);

/**
 * AccessToken 저장
 */
export const getAccessToken = (): string => storageMaster.get(`accessToken`);

/**
 * 이메일 유효성 검사
 * @param emailString
 */
export const emailValidate = (emailString: string): boolean => /^[^@]+@\w+(\.\w+)+\w$/.test(emailString);

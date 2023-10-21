import { io } from 'socket.io-client';
import { getAccessToken } from '@Helper';

export const socketConnect = io(`${process.env.REACT_APP_API_URL}`, {
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        },
    },
});

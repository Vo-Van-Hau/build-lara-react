import { notification } from 'antd';

export default {
    Notification(type, message, description) {
        notification[type]({
            message: message,
            description: description,
        });
    }
}

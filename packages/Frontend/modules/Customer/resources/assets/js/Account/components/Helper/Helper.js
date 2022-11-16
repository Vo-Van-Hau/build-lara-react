import { notification } from 'antd';
import moment from 'moment';

export default {
    Notification(type, message, description) {
        notification[type]({
            message: message,
            description: description,
        });
    },
    formatTime(value, format = 'DD/MM/YYYY HH:mm:ss') {
        try {
            return moment(value).format(format);
        } catch(err) {
            return moment().format('YYYY-MM-DD');
        }
    },
}

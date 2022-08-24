import moment from 'moment';
import { notification } from 'antd';

export default {
    Noti(type, message, description){
        notification[type]({
            message: message,
            description: description,
        });
    }
}
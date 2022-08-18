import { notification } from 'antd';

export default {
    Noti(type, message, description) {
        notification[type]({
            message: message,
            description: description,
        });
    },
    
    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {*} str
     * @returns {string}
     */
    capitalize_first_letter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

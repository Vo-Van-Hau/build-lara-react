import { notification } from 'antd';

export default {
    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo: make the first letter of a string uppercase
     * @param {*} str
     * @returns {string}
     */
    capitalize_first_letter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @param {*} type
     * @param {*} message
     * @param {*} description
     * @returns {void}
     */
     Notification(type, message, description){
        notification[type]({
            message: message,
            description: description,
        });
    }
}

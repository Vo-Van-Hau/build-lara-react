import { notification } from 'antd';
import moment from 'moment';

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
    },
    /**
     * @author: <hauvo1709@gmail.com>
     * @param {string} value
     * @param {string} format
     * @returns {void}
     */
    formatTime(value, format = 'DD/MM/YYYY HH:mm:ss') {
        try {
            return moment(value).format(format);
        } catch(err) {
            return moment().format('YYYY-MM-DD');
        }
    },
}

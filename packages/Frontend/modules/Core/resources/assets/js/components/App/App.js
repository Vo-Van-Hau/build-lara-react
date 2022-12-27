import { useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import RoutesWeb from '../../routes/RoutesWeb';
import { CoreContext } from '../Contexts/CoreContext';

/**
 * i18next configuration
 */
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources_i18n = {
    vi: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next",
            appName: 'Fanthbol Shopping'
        }
    },
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            appName: 'Fanthbol Shopping'
        }
    },
    ja: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next",
            appName: 'Fanthbol Shopping'
        }
    }
};
i18n
.use(initReactI18next) // passes i18n down to react-i18next
.init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: resources_i18n,
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
});

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns {void}
 */
const App = (props) => {

    const { data, get_module, get_user, setRouter, logout } = useContext(CoreContext);
    const { history } = props;
    const { mouted } = data;
    const { t } = useTranslation();

    useEffect(() => {
        if(mouted) {
            get_module();
            get_user();
        }
    }, [props]);

    return RoutesWeb({
        data, get_user, t, i18n, setRouter, history, logout
    });
};

export default App;

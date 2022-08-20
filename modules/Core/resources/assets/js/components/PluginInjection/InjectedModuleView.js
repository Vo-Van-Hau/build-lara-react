import React, { useState, useEffect, useContext } from 'react';
import axios from '../../helpers/api';
import InjectedComponent from '../Injected/InjectedComponent';
import { CoreContext } from '../Contexts/CoreContext';

const InjectedModuleView = ({ history, ...props }) => {

    const { data } = useContext(CoreContext);
    const { language } = data;
    const [moduleComponent, setModuleComponent] = useState({
        module: null
    });
    const [Error, setError] = useState(null);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {string} modName
     * @param {string} comName
     * @param {boolean} reload
     * @return {void}
     */
    const load_module = (modName, comName, reload = false) => {
        const moduleName = reload ? modName : modName || props.moduleName;
        const controllerName = reload ? comName : comName || props.controllerName;
        if (!window.winter || !window.winter[moduleName]) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = () => {
                script.onload = null;
                window.setTimeout(() => {
                    set_view_in_state(moduleName, controllerName);
                }, 0);
            };
            script.onerror = () => {
                script.onerror = null;
                window.winter[moduleName] = {};
                window.setTimeout(() => {
                    set_view_in_state(moduleName, controllerName);
                }, 0);
            };
            script.src = `${window.sparrowConfig.app.assetURL}/modules/${moduleName.toLowerCase()}/js/${"index.js"}?v=${props.version}`;
            document.getElementsByTagName('head')[0].appendChild(script);
        } else {
            setModuleComponent({
                module: null
            });
            window.setTimeout(() => {
                set_view_in_state(moduleName, controllerName);
            }, 0);
        }
    };

    useEffect(function(){
        load_module(props.moduleName, props.controllerName);
    }, [props.moduleName, props.controllerName]);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {string} moduleName
     * @param {boolean} isLite
     * @return {void}
     */
    const load_module_view = (moduleName, isLite) => {
        if (!window.winter || !window.winter[moduleName]) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `${window.sparrowConfig.app.assetURL}/modules/${moduleName.toLowerCase()}/js/${"index.js"}?v=${props.version}`;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {string} moduleName
     * @param {string} componentName
     * @return {void}
     */
    const set_view_in_state = (moduleName, controllerName) => {
        /**
         * @author <vanhau.vo@urekamedia.vn>
         * @todo:
         * @returns
         */
        const view_resolve = () => {
            const module = window.winter && window[`winter_${moduleName}`];
            if (controllerName == undefined) {
                return module ? module['default'] || window.winter['ViewDefault'] : window.winter['ViewDefault'];
            }
            return (
                module && (module[controllerName] || window.winter['ViewDefault'])
            );
        };
        const module = view_resolve();
        if (!module) {
            window.alert(`Component "${controllerName}" doesn't exist for module "${moduleName}"
                There was a breaking change in how module views are handled in Laravel 11.6
                Web bundles and liteViews were replaced by a more standardized method.`)
            setModuleComponent({
                module: null
            });
        } else {
            setModuleComponent({
                module: module
            });
            setError(null);
        }
    };

    if (!moduleComponent.module) {
        return null;
    }

    const bp = {
        axios: axios,
        getModuleInjector: () => InjectedModuleView,
        load_module_view: load_module_view
    };

    const extraProps = props.extraProps || {};

    return (
        <InjectedComponent
            component={moduleComponent.module}
            moduleName={props.moduleName}
            controllerName={props.controllerName}
            history={history}
            bp={bp}
            {...extraProps}
            language={language.locale}
        />
    );
};
export default InjectedModuleView;

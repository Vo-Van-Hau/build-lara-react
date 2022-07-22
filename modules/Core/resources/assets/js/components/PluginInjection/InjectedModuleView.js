import axios from '../../helpers/api';
import InjectedComponent from '../Injected';
import { useState, useEffect, useContext } from 'react';
import { CoreContext } from '../Contexts/CoreContext';

const InjectedModuleView = ({ history, ...props }) => {
    // const { t } = useTranslation("core");
    // const { data } = useContext(CoreContext);
    // //get from data
    // const { language } = data;

    // const [moduleComponent, setModuleComponent] = useState({
    //     module: null
    // });
    // const [Error, setError] = useState(null);

    // if (Error) {
    //     console.log("Error rendering plugin", Error);
    //     return (props.onNotFound && props.onNotFound(Error)) || null;
    // }

    // useEffect(() => {
    //     loadModule(props.moduleName, props.componentName);
    // }, [props.moduleName, props.componentName]);

    // const loadModule = (modName, comName, reload = false) => {
    //     const moduleName = reload ? modName : moduleName || props.moduleName;
    //     const componentName = reload ? comName : comName || props.componentName;
    //     if (!window.winter || !window.winter[moduleName]) {
    //         const script = document.createElement("script");
    //         script.type = "text/javascript";
    //         script.onload = () => {
    //             script.onload = null;
    //             setImmediate(() => {
    //                 setViewInState(moduleName, componentName);
    //             });
    //         };
    //         script.onerror = () => {
    //             script.onerror = null;
    //             window.winter[moduleName] = {};
    //             setImmediate(() => {
    //                 setViewInState(moduleName, componentName);
    //             });
    //         };
    //         script.src =
    //             window.sparrowConfig.app.assetURL +
    //             `/modules/${moduleName.toLowerCase()}/js/${"index.js"}?v=${
    //                 props.version
    //             }`;
    //         document.getElementsByTagName("head")[0].appendChild(script);
    //     } else {
    //         setModuleComponent({
    //             module: null
    //         });
    //         setImmediate(() => {
    //             setViewInState(moduleName, componentName);
    //         });
    //     }
    // };

    // const loadModuleView = (moduleName, isLite) => {
    //     if (!window.winter || !window.winter[moduleName]) {
    //         const script = document.createElement("script");
    //         script.type = "text/javascript";
    //         script.src =
    //             window.sparrowConfig.app.assetURL +
    //             `/modules/${moduleName.toLowerCase()}/js/${"index.js"}?v=${
    //                 props.version
    //             }`;
    //         document.getElementsByTagName("head")[0].appendChild(script);
    //     }
    // };

    // const setViewInState = (moduleName, componentName) => {
    //     const viewResolve = () => {
    //         const module = window.winter && window.winter[moduleName];
    //         if (componentName == undefined) {
    //             return module
    //                 ? module["default"] || window.winter["ViewDefault"]
    //                 : window.winter["ViewDefault"];
    //         }
    //         return (
    //             module &&
    //             (module[componentName] || window.winter["ViewDefault"])
    //         );
    //     };
    //     const module = viewResolve();
    //     if (!module) {
    //         // @deprecated : Update the error message
    //         setError(
    //             new Error(`
    //             Component "${componentName}" doesn't exist for module "${moduleName}"
    //             There was a breaking change in how module views are handled in Laravel 11.6
    //             Web bundles and liteViews were replaced by a more standardized method.
    //             `)
    //         );
    //         setModuleComponent({
    //             module: null
    //         });
    //     } else {
    //         setModuleComponent({
    //             module: module
    //         });
    //         setError(null);
    //     }
    // };
    // if (!moduleComponent.module) {
    //     return null;
    // }
    // const bp = {
    //     axios: axios,
    //     toast,
    //     sweetAlert,
    //     getModuleInjector: () => InjectedModuleView,
    //     loadModuleView: loadModuleView
    // };

    // const extraProps = props.extraProps || {};
    // return (
    //     <InjectedComponent
    //         t={t}
    //         component={moduleComponent.module}
    //         moduleName={props.moduleName}
    //         componentName={props.componentName}
    //         history={history}
    //         bp={bp}
    //         {...extraProps}
    //         language={language.locale}
    //     />
    // );

    return (
        <>Foke</>
    )
};

export default InjectedModuleView;

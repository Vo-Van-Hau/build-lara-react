import React, { Fragment, useContext } from 'react';
import _ from 'lodash';
import { CoreContext } from '../Contexts/CoreContext';
import { useParams } from 'react-router-dom';
import InjectedModuleView from '../PluginInjection/InjectedModuleView';

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const ModuleView = ({ history, ...props }) => {

    const { data } = useContext(CoreContext);
    const { modules } = data;

    const { moduleName, componentName } = useParams();

    if (!modules) return null;

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @param {*} str
     * @returns {string}
     */
    const capitalizeFirstLetter = (str) => {

        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const module = _.find(modules, {
        name: capitalizeFirstLetter(moduleName)
    });

    const contents = module ? (
        <InjectedModuleView
            moduleName={moduleName}
            componentName={componentName}
            version={module.version}
            history={history}
        />
    ) : <>There's nothing here!</>;

    return (
        <Fragment>
            { contents }
        </Fragment>
    );
};

export default ModuleView;

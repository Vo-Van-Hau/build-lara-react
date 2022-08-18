import React, { Fragment, useContext } from 'react';
import _ from 'lodash';
import { CoreContext } from '../Contexts/CoreContext';
import { useParams } from 'react-router-dom';
import InjectedModuleView from '../PluginInjection/InjectedModuleView';
import helper from '../../helpers/helper';

/**
 * @author: <vanhau.vo@urekamedia.vn>
 * @todo:
 * @param {*} param0
 * @returns
 */
const ModuleView = ({ history, ...props }) => {

    const { data } = useContext(CoreContext);
    const {} = props;
    const { modules } = data;
    const { capitalize_first_letter } = helper;

    const { moduleName, controllerName } = useParams();

    if (!modules) return null;

    const module = _.find(modules, function(module) {
        return module.name === capitalize_first_letter(moduleName);
    });

    const contents = module ? (
        <InjectedModuleView
            moduleName={moduleName}
            controllerName={controllerName}
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

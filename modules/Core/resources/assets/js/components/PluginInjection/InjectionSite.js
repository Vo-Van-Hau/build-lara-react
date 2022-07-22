import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InjectedModuleView from "~/components/PluginInjection/InjectedModuleView";
import { moduleViewNames } from "~/util/Modules";

class InjectionSite extends React.Component {
   static contextTypes = {
      router: PropTypes.object.isRequired
   };

   renderNotFound = () => {
      return <div />; // TODO Render something meaningful
   };

   render() {
      const { site: injectionSite, modules, language } = this.props;
      const plugins = moduleViewNames(modules, injectionSite);

      return (
         <div className="bp-plugins bp-injection-site">
            {plugins.map(({ moduleName, componentName }, i) => (
               <InjectedModuleView
                  key={i}
                  moduleName={moduleName}
                  componentName={componentName}
                  onNotFound={this.renderNotFound}
                  language={language}
               />
            ))}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   modules: state.modules,
   language: state.language
});

export default connect(mapStateToProps)(InjectionSite);

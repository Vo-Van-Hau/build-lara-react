require("./bootstrap");

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';
import { Index }                    from './components/ViewDefault/Index';
import CoreContextProvicer          from './components/Contexts/CoreContext';
import App                          from './components/App/App';

window.winter = typeof window.winter === 'object' ? window.winter : {};
window.winter['ViewDefault'] = Index;



/**
 * @var history from './routes/RoutesWeb.js
 */
if (document.getElementById('root')) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <CoreContextProvicer history={history}>
            <Suspense fallback={() => (<><span>Loading...</span></>)}>
                <App history={history} />
            </Suspense>
        </CoreContextProvicer>
    );
}

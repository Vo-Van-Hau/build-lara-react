require('./bootstrap');

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Index }                    from './components/ViewDefault/Index';
import CoreContextProvider          from './components/Contexts/CoreContext';
import App                          from './components/App/App';

window.React = React;
window.winter = typeof window.winter === 'object' ? window.winter : {};
window.winter['ViewDefault'] = Index;

/**
 * @var history from './routes/RoutesWeb.js
 */
if (document.getElementById('root')) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <CoreContextProvider history={history}>
            <Suspense fallback={() => (<><span>Loading...</span></>)}>
                <App history={history} />
            </Suspense>
        </CoreContextProvider>
    );
}

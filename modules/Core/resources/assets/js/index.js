require("./bootstrap");

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { Index }                    from './components/ViewDefault/Index';
import CoreContextProvicer          from './components/Contexts/CoreContext';
import App                          from './components/App/App';

window.winter = typeof window.winter === "object" ? window.winter : {};
window.winter['ViewDefault'] = Index;


/**
 * @var history from './routes/index.js
 */

if (document.getElementById('root')) {

    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <CoreContextProvicer history={history}>
            <Suspense fallback={() => (<>Loading</>)}>
                <App history={history} />
            </Suspense>
        </CoreContextProvicer>
    );
}

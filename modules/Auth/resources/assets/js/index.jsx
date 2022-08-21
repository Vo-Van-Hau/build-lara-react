require('./bootstrap');

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import AuthContextProvicer from './components/Contexts/AuthContext';
import App from './components/App/App';
import Login from './Login';
/**
 * @var history from './routes/RoutesWeb.js
 */
 if (document.getElementById('root')) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <AuthContextProvicer history={history}>
            <Suspense fallback={() => (<><span>Loading...</span></>)}>
                <App history={history} />
            </Suspense>
        </AuthContextProvicer>
    );
}

export { Login as login }

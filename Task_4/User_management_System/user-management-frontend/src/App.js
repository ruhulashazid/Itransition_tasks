import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/admin" component={UserManagement} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

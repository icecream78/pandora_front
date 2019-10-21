import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { Component } from 'react';
import { MainPage, LoginPage, AddDevicePage } from './pages';

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/storeModel";
import initialState from './store/init.state';


const reduxStore = configureStore(initialState);

class App extends Component {
    render() {
        return (
            <ReduxProvider store={reduxStore}>
                <div className="routes">
                    <Router>
                        <Switch>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/newDevice" component={AddDevicePage} />
                            <Route path="/" component={MainPage} />
                        </Switch>
                    </Router>
                </div>
            </ReduxProvider>
        )
    }
}

export default App;
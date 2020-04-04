import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import Login from "./containers/login/login"
import Register from "./containers/login/register"
import Produce from "./containers/produce/produce";
import Transfer from "./containers/transfer/transfer";
import Trace from "./containers/customer/trace"
import AccountProducer from "./containers/produce/account_produce";
import AccountTransfer from "./containers/transfer/account_transfer";
import AccountCustomer from "./containers/customer/account_customer";
import InfoProducer from "./containers/produce/info_producer";
import InfoTransfer from "./containers/transfer/info_transfer";
import InfoCustomer from "./containers/customer/info_customer";



import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <Switch>
        <Route exact='true' path='/' component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/produce" component={Produce}/>r
        <Route path="/transfer" component={Transfer}/>
        <Route path="/trace" component={Trace}/>
        <Route path="/accountProducer" component={AccountProducer}/>
        <Route path="/accountTransfer" component={AccountTransfer}/>
        <Route path="/accountCustomer" component={AccountCustomer}/>
        <Route path="/infoProducer" component={InfoProducer}/>
        <Route path="/infoTransfer" component={InfoTransfer}/>
        <Route path="/infoCustomer" component={InfoCustomer}/>
        </Switch>
    </Router>
    </Provider>
    ,
    document.getElementById('root')
);

import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Landing from '../components/Landing'
import DashBoard from '../components/Dashboard'
import AddNew from "../components/AddNew";
import Detail from '../components/Detail'
import UpdateStub from '../components/UpdateStub'
import UserProfile from '../components/UserProfile'
export const history = createHistory()

export default class Routes extends React.Component{
    render(){
        return(
            <Router history = {history}>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/addnew" component={AddNew}/>
                    <Route path="/stub/:id" component = {Detail}/>
                    <Route path="/update/stub/:id" component={UpdateStub}/>
                    <Route path="/user/profile" component={UserProfile}/>
                </Switch>
            </Router>
        )
    }
}
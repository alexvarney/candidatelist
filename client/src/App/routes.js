import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Home from './views/Home';
import Policies from './views/PolicyView';

import CandidateList from './components/CandidateList';
import CandidateAddForm from './components/CandidateAddForm';
import SingleCandidateView from './views/SingleCandidateView';

const Routes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path='/candidates' component={CandidateList} />
                <Route exact path='/candidates/add' component={CandidateAddForm} />
                <Route exact path='/candidates/:id' component={SingleCandidateView} />
                <Route path="/policies" component={Policies} />
            </Switch>
        </div>
    )
}

export default Routes;
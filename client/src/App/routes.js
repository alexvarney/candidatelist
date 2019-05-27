import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Home from './views/Home';
import Policies from './views/PolicyView';

import CandidateList from './views/CandidateList';
import CandidateAddForm from './views/CandidateAddForm';
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
                <Route path='/candidates/:id' component={SingleCandidateView} />
                <Route path="/policies" component={Policies} />
            </Switch>
        </div>
    )
}

export default Routes;
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './views/Home';
import CandidateRoutes from './views/candidates/routes';
import IssueRoutes from './views/issues/routes';


const Routes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/" component={Home} />    
                <Route path='/candidates' component={CandidateRoutes} />
                <Route path="/issues" component={IssueRoutes} />
            </Switch>
        </div>
    )
}

export default Routes;
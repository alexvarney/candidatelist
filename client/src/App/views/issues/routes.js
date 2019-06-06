import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IssueList from './IssueList';
import IssueView from './IssueView';


const IssueRoutes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/issues" component={IssueList} />    
                <Route exact path="/issues/:id" component={IssueView} />
            </Switch>
        </div>
    )
}

export default IssueRoutes;
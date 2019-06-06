import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IssueList from './IssueList';
import IssueView from './IssueView';
import IssueAddForm from './IssueAddForm';


const IssueRoutes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/issues" component={IssueList} /> 
                <Route exact path="/issues/add" component={IssueAddForm} />
                <Route path="/issues/:id" component={IssueView} />
            </Switch>
        </div>
    )
}

export default IssueRoutes;
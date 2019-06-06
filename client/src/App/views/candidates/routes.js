import React from 'react';
import {Route, Switch} from 'react-router-dom';

import CandidateList from './CandidateList';
import SingleCandidateView from './CandidateView';
import CandidateAddForm from './CandidateAddForm';
import CandidateEditView from './CandidateEditView';

const CandidateRoutes = () => {
    return(
        <div>
            <Switch>
                <Route exact path="/candidates" component={CandidateList} />    
                <Route exact path="/candidates/add" component={CandidateAddForm} />
                <Route exact path="/candidates/edit" component={CandidateEditView} />
                <Route path='/candidates/:id' component={SingleCandidateView} />
            </Switch>
        </div>
    )
}

export default CandidateRoutes;
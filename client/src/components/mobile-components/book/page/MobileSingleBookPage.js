import React from 'react';
import {useParams,Switch,Route} from 'react-router-dom';
import MobileSingleBook from '../full/MobileSingleBook';

import MobileSummaryPage from '../../summary/page/MobileSummaryPage';
import MobileSummaryItemFull from '../../summary/full/MobileSummaryItemFull';
import MobileAddSummary from '../../summary/add/MobileAddSummary';
import MobileEditSummary from '../../summary/edit/MobileEditSummary';

export default function MobileSingleBookPage(props){
    let {id} = useParams();                                
                                        
    return <React.Fragment>
        <MobileSingleBook id = {id}></MobileSingleBook>
        <Switch>
            <Route path={"/book/"+id+"/summary/edit/:id"}>
                <MobileEditSummary BookID={id}></MobileEditSummary>
            </Route>
            <Route path={"/book/"+id+"/summary/:id"}>
                <MobileSummaryItemFull BookID={id}></MobileSummaryItemFull>
            </Route>
            <Route path={"/book/"+id+"/addsummary"}>
                <MobileAddSummary BookID={id}></MobileAddSummary>
            </Route>
            <Route path={"/book/"+id}>
                <MobileSummaryPage UserID={props.UserID} BookID={id}></MobileSummaryPage>
            </Route>                    
        </Switch>
        
    </React.Fragment>
            
}
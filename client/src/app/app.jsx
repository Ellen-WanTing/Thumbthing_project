import React,{useState,useEffect} from 'react';
import { hot } from 'react-hot-loader/root'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './app.css';

import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
//Tablet Components
import {AuthorDisplay, TabletHome,Header,NavigationBar,CategoryMain,PublisherTablet, SummariesTablet} from '../components'

//MobileComponents
import {MobileNavBar,MobileAuthor,MobileHome,MobileCategory,MobilePublisher} from '../components'

import * as Components from '../components';

import ApiHelper from '../components/ApiHelper.js';
import { SingleBookUI } from '../components/tablet-components/SingleBookUI/singleBookUI.jsx';
import MobileSingleBook from '../components/mobile-components/book/full/MobileSingleBook.js';
import { AuthorBookComponent } from '../components/tablet-components/author-tablet/authorBookComponent.jsx';
 function App(){


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(()=>{
        window.addEventListener('resize', handleWindowSizeChange);
        return ()=>{
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    },[]);


    const isMobile = windowWidth <= 550;


    // document.body.style.overflow=isMobile?"scroll":"hidden";

    var containerStyle = {};
    containerStyle.display = isMobile?"block":"flex";

    return <React.Fragment>
    <Router>
    {isMobile?

    <MobileNavBar/>
    :    
    <Header />    
    }
    <div className="containerBody" style={containerStyle}>
    {!isMobile?<NavigationBar/>:null}

      <Switch key="outerSwitch">
        <Route path="/home" key="home">
          <ApiHelper key="home" get URL="http://localhost:8000/api/book" MobileComponent={MobileHome} TabletComponent={TabletHome}/>
        </Route>

        <Route path="/popular" key="popular">
          <ApiHelper key="popular" get URL="http://localhost:8000/api/book/popular" MobileComponent={MobileHome} TabletComponent={TabletHome}/>
        </Route>

        <Route path="/author/:id" key="authorID" render={(props)=>{
          return <React.Fragment>
              <ApiHelper key={props.match.params.id} childkey={props.match.params.id} get URL={`http://localhost:8000/api/book?authorID=${props.match.params.id}`} 
                  MobileComponent={MobileHome} TabletComponent = {AuthorBookComponent}/>
          </React.Fragment>
        }}/>

        <Route path="/author" key="author">
          <ApiHelper key="author" get URL="http://localhost:8000/api/author" MobileComponent={MobileAuthor} TabletComponent={AuthorDisplay}/>
        </Route>

        <Route path="/category/:id" key="categoryID"  render={(props)=>{
          return <ApiHelper key={props.match.params.id} childkey={props.match.params.id} get URL={`http://localhost:8000/api/book?categoryID=${props.match.params.id}`} MobileComponent={MobileHome} TabletComponent = {AuthorBookComponent}/>
        }}/>

        <Route path="/category" key="category">
          <ApiHelper key="category" get URL="http://localhost:8000/api/category" MobileComponent={MobileCategory} TabletComponent={CategoryMain}/>
        </Route>

        <Route path="/publisher/:id" key="publisherID" render={(props)=>{
          return <ApiHelper key={props.match.params.id} childkey={props.match.params.id} get URL={`http://localhost:8000/api/book?publisherID=${props.match.params.id}`} MobileComponent={MobileHome} TabletComponent = {AuthorBookComponent}/>
        }}/>

        <Route path="/publisher" key="publisher">
          <ApiHelper key="publisher" get URL="http://localhost:8000/api/publisher" MobileComponent={MobilePublisher} TabletComponent={PublisherTablet}/>
        </Route>


        <Route path="/book/:id" render={props=>{
          return <React.Fragment>
          <div style={!isMobile?{ width: "74%", height: "92vh", overflow: "scroll" }:{}}>
          <ApiHelper key="singleBook" get singledata URL={`http://localhost:8000/api/book/${props.match.params.id}`} MobileComponent={MobileSingleBook} TabletComponent={SingleBookUI}/>

          <Switch key="innerSwitch">

          <Route key="summaryEdit" path={"/book/"+props.match.params.id+"/summary/edit/:id"} render = {propsEdit=>{            
              return <ApiHelper key="summaryEdit" get singledata URL={`http://localhost:8000/api/summary/${propsEdit.match.params.id}`} toastMessage="Summary Edited!" toastError="Please enter max 1000 characters!" props={{BookID:props.match.params.id}} MobileComponent={Components.MobileEditSummary} TabletComponent={Components.TabletEditSummary} />;
            }}/>   


            <Route key="summaryFull" path={"/book/"+props.match.params.id+"/summary/:id"} render={(props)=>{
              return <ApiHelper key="summaryFull" get singledata URL={`http://localhost:8000/api/summary/${props.match.params.id}`} MobileComponent={Components.MobileSummaryItemFull} TabletComponent={Components.TabletFullSummaryUI}/>
            }}/>

            <Route key="summaryAdd" path={"/book/"+props.match.params.id+"/addsummary"}>
                <ApiHelper toastMessage="Summary Added!" toastError="Unable to add Summary!" key="summaryAdd" props={{BookID:props.match.params.id}} MobileComponent={Components.MobileAddSummary} TabletComponent={Components.TabletAddSummary} />
            </Route>

            <Route key="summaryAll" path={"/book/"+props.match.params.id}>
                <ApiHelper key="summaryAll" get URL={`http://localhost:8000/api/summary?bookID=${props.match.params.id}`} props={{BookID:props.match.params.id}} MobileComponent={Components.MobileSummaryPage} TabletComponent={SummariesTablet}/>                            
            </Route>

        </Switch>
          </div>

          </React.Fragment>
        }} key="bookWithId"/>

        <Route key="signup" path="/signup"><Components.SignUp/></Route>
        <Route key="login" path="/login"><Components.LogIn/></Route>        

        <Route 
            key="searchBook" 
            path="/search/Books/:query" 
            render = {
            (props)=>{
            return <ApiHelper               
              key={props.match.params.query} 
              get 
              URL={`http://localhost:8000/api/search/books?keyword=${props.match.params.query}&activeAuthor=true&activePublisher=true`} 
              MobileComponent={MobileHome} TabletComponent = {AuthorBookComponent}/>}}/>

        <Route 
          key="searchSummary" 
          path="/search/Summaries/:query" 
          render={(props)=>{return <ApiHelper key={props.match.params.query} 
          get URL={`http://localhost:8000/api/search/summary?keyword=${props.match.params.query}`} 
          MobileComponent={Components.MobileSummaryPage} TabletComponent={SummariesTablet}></ApiHelper>; }}/>

      </Switch>

      </div>
    </Router>

    {isMobile?
    <ToastContainer
      position="bottom-center"
      autoClose={700}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      :
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />}

    </React.Fragment>
}
export default hot(App);

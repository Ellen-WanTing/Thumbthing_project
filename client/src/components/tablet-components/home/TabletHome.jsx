import './TabletHome.css';
import HorizontalScroll from 'react-scroll-horizontal';
import { BooksDisplay } from '../../../components';
import ApiHelper from '../../ApiHelper';

function TabletHome(props) {
  return <div className="bodyItems">
    <div className="booksHolder">
      <HorizontalScroll style={{ height: '40%' }} reverseScroll = {true}>
      <ApiHelper key="popularbooks" TabletComponent = {BooksDisplay} get URL="http://localhost:8000/api/book" /> 
      </HorizontalScroll>
      <h3 className="topBooksList">Weekly Top Rated Books</h3>
      <HorizontalScroll style={{ height: '40%' }} reverseScroll = {true}>
          <ApiHelper key="popularbooks" TabletComponent = {BooksDisplay} get URL="http://localhost:8000/api/book/popular" />              
      </HorizontalScroll>
    </div>
  </div>;
}
export { TabletHome };
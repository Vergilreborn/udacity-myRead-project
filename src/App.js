import React from 'react'
import {Route,Link} from 'react-router-dom'
import Shelf from './Shelf'
import Book from './Book'
import BookDetail from './BookDetail'
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import './App.css'

const shelfType =
  {'currentlyReading' : 'Currently Reading',
   'wantToRead' : 'Want to Read',
   'read' : 'Read'}


class BooksApp extends React.Component {
  state = { 
    shelves:[],
    myBookList: [],
    query : '',
    booksSearched:[],
    bookInfo : {}
  }

  componentDidMount(){
    this.shelfSetup(); 
    
  }

  shelfSetup(){
    BooksAPI.getAll().then((bookList) => {
      let bookListGrouped = _.groupBy(bookList,'shelf');
      let shelves = [];

      //Using Lodash .each function to generate a key pair for the shelves
      _.each(bookListGrouped,(value,key) =>{
        shelves.push({bookList : value, title : shelfType[key], key});
      });
    
      let savedBookDetail = localStorage.getItem('bookInfo');
      if(savedBookDetail)
        savedBookDetail = JSON.parse(savedBookDetail);
      this.setState({shelves, myBookList:bookList,bookInfo : savedBookDetail});
    });
  }

  detailBook = (bookInfo) =>{
    localStorage.setItem('bookInfo', JSON.stringify(bookInfo));
    this.setState({bookInfo})
  }

  updateQuery(newQuery){

    this.setState({query : newQuery});
    
    if(!newQuery){
      this.updateSearchResults();
    }else{
      BooksAPI.search(newQuery).then(books =>{
        if(books.error){
          this.updateSearchResults()
        }else{
          this.updateSearchResults(books);
        }
      });
    }
  }

  /*
  */
  updateSearchResults(books = []){
    books.map((book) => {
      let bookOnShelf = this.state.myBookList.filter((myBook) => myBook.id === book.id);
      book.shelf = bookOnShelf.length > 0 ?  bookOnShelf[0].shelf : 'none';
      return book;
    });
    this.setState({booksSearched : books})
  }

  moveBook = (shelfName,book)=>{

    BooksAPI.update(book,shelfName);

    let newState = this.state.shelves;
    let newShelf = newState.find((shelfInfo) => shelfInfo.key === shelfName);
    console.log(book.shelf);
    if(book.shelf !== 'none'){
      let oldShelf = newState.find((shelfInfo) => shelfInfo.key === book.shelf);
      oldShelf.bookList= oldShelf.bookList.filter((b) => b.id !== book.id);  
    }
    
    if(shelfName !=='none'){ 
      book.shelf = shelfName;
      newShelf.bookList.push(book);
    }
    
    this.setState({shelves : newState});
  }

  render() {

    const {query,booksSearched} = this.state;

    return (
      <div className="app">
        <Route path="/search" render={({history}) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  booksSearched &&  booksSearched.map(book =>(
                    <Book key={book.id} info={book} history={history} detailBook={this.detailBook} moveBook={this.moveBook}/>  
                  ))
                }
              </ol>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={({history}) =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {this.state.shelves.length > 0 && this.state.shelves.map(shelf =>
                    <Shelf key={shelf.key} bookList={shelf.bookList} title={shelf.title} history={history} detailBook={this.detailBook} moveBook={this.moveBook}/>
                  )}
              </div>
            </div>
          
            <div className="open-search">
              <a onClick={() =>  history.push('/search')}>Add a book</a>
            </div>
          </div>
        )}/>
        { <Route exact path="/Detail" render={({history}) => (
          <div className="book-detail">
            <div className="book-detail-header">
              <Link to="/" className="close-search close-search-detail" >Close</Link>
            </div>
           
            <div className="book-detail-content">
              <BookDetail bookInfo={this.state.bookInfo}/>
            </div>
          </div>
        )}/> }
      </div>
    )
  }
}

export default BooksApp

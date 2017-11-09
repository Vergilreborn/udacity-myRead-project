import Book from './Book.js';
import React from 'react';

class Shelf extends React.Component{

    render(){
      const {moveBook,title,bookList,detailBook,history} = this.props;
        return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  bookList.map(book => 
                    <li key={book.id}><Book history={history} info={book} detailBook={detailBook} moveBook={moveBook}/></li>
                  )
                }
              </ol>
            </div>
          </div>
        )
    }
}

export default Shelf;
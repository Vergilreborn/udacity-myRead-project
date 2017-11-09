import React from 'react'
import Book from './Book'

class BookDetail extends React.Component{
    
    render(){
        console.log(this.props.bookInfo);
        const {description,averageRating,ratingsCount,pageCount,publishedDate,subtitle,publisher,previewLink} = this.props.bookInfo;
       
        return (
            <div className="book-detail">
                <h2 className="bookshelf-title">Book Detail</h2>
                <ol className="books-grid">
                    <Book info={this.props.bookInfo} />
                </ol>
                { previewLink && (
                <div>
                    <a href={previewLink}>Preview</a>
                </div>)}
                <DetailValue title="SubTitle" value={subtitle}/>
                <DetailValue title="Average Rating" value={averageRating ? averageRating + " out of 5" : 'Unknown Rating'}/>
                <DetailValue title="Number of Ratings" value={ratingsCount}/>                 
                <DetailValue title="Page Count" value={pageCount}/> 
                <DetailValue title="Published" value={publishedDate}/>
                <DetailValue title="Publisher" value={publisher}/>
                <div className="book-detail-field">
                    <div className="book-detail-field-title">Description:</div>
                    <p className="book-detail-field-content">{description ? description : 'No description'}</p>
                </div>
            </div>)
    }
}

const DetailValue = (props) => (
    <div className="book-detail-field">
        <div className="book-detail-field-title book-detail-field-inline">{props.title}:</div>
        <div className="book-detail-field-content book-detail-field-inline">{props.value ? props.value : "None"}</div>
    </div>
    
  );
export default BookDetail
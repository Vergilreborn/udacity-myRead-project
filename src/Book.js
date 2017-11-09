import React from 'react'

class Book extends React.Component{
    

    render(){
        
        const {shelf,imageLinks,title,authors} = this.props.info;
        const {detailBook,moveBook,history} = this.props;
        
        let shelfDefault = shelf;
        
        if(!shelfDefault)
            shelfDefault = 'none';

        return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")` }}></div>
            
            {detailBook && (<a onClick={() => {detailBook(this.props.info); history.push('./detail'); }}  className="book-shelf-detail"></a>)}

            {moveBook && (
                <div className="book-shelf-changer">
                    <select onChange={(event) => moveBook(event.target.value,this.props.info)} defaultValue={shelfDefault}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
            )}
            
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors[0]}</div>
        </div>)
    }
}
export default Book
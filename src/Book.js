import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
      book: PropTypes.object.isRequired
    }

    render() {

      const { book, onChangeShelf } = this.props;

      let authors = ['Uknown Author'],
          smallThumbnail = 'no_book_cover.jpg';

      if ( book.hasOwnProperty( 'authors' ) ) {
        authors = book.authors;
      }

      if ( book.hasOwnProperty( 'imageLinks' ) ) {
        smallThumbnail = book.imageLinks.smallThumbnail;
      }

      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundSize: 'cover',  backgroundImage: 'url(' + smallThumbnail + ')' }}></div>
            <div className="book-shelf-changer">
              <select value={ book.shelf } onChange={ event => onChangeShelf( book, event.target.value ) }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ book.title }</div>
          { authors && (
            <div className="book-authors">{ authors.map( ( author, index, array ) => index === ( array.length - 1 ) ? author : author + ', ' ) }</div>
          )}
        </div>
      );
    }
}

export default Book

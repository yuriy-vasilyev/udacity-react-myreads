import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
      book: PropTypes.object.isRequired
    }

    render() {

      const { book, onChangeShelf } = this.props;
      const authors  = book.authors.map( ( author, index, array ) => index === ( array.length - 1 ) ? author : author + ', ' );

      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
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
          <div className="book-authors">{ authors }</div>
        </div>
      );
    }
}

export default Book

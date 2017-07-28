import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  state = {
    books: []
  }

  searchBooks( query ) {
    if ( query ) {
      BooksAPI.search( query, 20 ).then( books => {
        if ( books.hasOwnProperty( 'error' ) ) {
          this.setState({ books: [] });
        } else {
          this.setState({ books });
        }
      });
    } else {
      this.setState({ books: [] });
    }
  }

  render() {

    const { books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input onChange={ ( event ) => this.searchBooks( event.target.value ) } type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          { books.map( book =>
            <li key={ book.id }>
              <Book book={ book } onChangeShelf={ this.props.onChangeShelf } />
            </li>
          )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListBooks extends Component {

  constructor( props ) {
  	super( props );
  	// this.clearQuery = this.clearQuery.bind( this );
  }

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: ''
  }

  updateQuery( query ) {
    this.setState({
      query: query.trim()
    });
  }

  clearQuery() {
    this.setState({
      query: ''
    });
  }

  render() {

    // const { books, onRemoveContact } = this.props;
    // const { query } = this.state;
    //
    // let showingBooks;
    //
    // if ( query ) {
    //   const match = new RegExp( escapeRegExp( query ), 'i' );
    //   showingBooks = contacts.filter( contact => match.test( contact.name ) );
    // } else {
    //   showingBooks = contacts;
    // }

    // showingBooks.sort( sortBy( 'name' ) );

    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { books.filter( book => book.shelf === 'currentlyReading' ).map( book =>
                  <li key={ book.id }>
                    <Book book={ book } onChangeShelf={ this.props.onChangeShelf } />
                  </li>
                ) }
              </ol>
            </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { books.filter( book => book.shelf === 'wantToRead' ).map( book =>
                    <li key={ book.id }>
                      <Book book={ book } onChangeShelf={ this.props.onChangeShelf } />
                    </li>
                  ) }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.filter( book => book.shelf === 'read' ).map( book =>
                      <li key={ book.id }>
                        <Book book={ book } onChangeShelf={ this.props.onChangeShelf } />
                      </li>
                    ) }
                  </ol>
                </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks

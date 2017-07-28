import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      console.dir(books);
      this.setState({ books });
    })
  }

  handleChangeShelf = ( book, shelf ) => {
    this.setState({
      books: this.state.books.map( item => {
        if ( item.id === book.id ) {
          item.shelf = shelf
        }

        return item;
      })
    });

    BooksAPI.update( book, shelf );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
              <ListBooks books={ this.state.books } onChangeShelf={ this.handleChangeShelf } />
            )
          }
        />
        <Route path="/search" render={ () => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/" className="close-search">Close</Link>
                  <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"/>
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>
            )
          }
        />
      </div>
    )
  }
}

export default BooksApp

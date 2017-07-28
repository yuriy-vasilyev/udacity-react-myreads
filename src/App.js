import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      // console.dir(books);
      this.setState({ books });
    })
  }

  handleChangeShelf = ( book, shelf ) => {
    let isNewBook = true;

    this.setState({
      books: this.state.books.map( item => {
        if ( item.id === book.id ) {
          item.shelf = shelf;
          isNewBook  = false;
        }

        return item;
      })
    });

    if ( isNewBook ) {
      book.shelf = shelf;
      this.setState( prevState => {
        let newBooks = prevState.books;
        newBooks.push( book );
        return {
          books: newBooks
        }
      });
    }

    BooksAPI.update( book, shelf );
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <ListBooks books={ this.state.books } onChangeShelf={ this.handleChangeShelf } />
        )}/>
        <Route path="/search" render={ () => (
          <SearchBooks books={ this.state.books } onChangeShelf={ this.handleChangeShelf } />
        )}/>
      </div>
    )
  }
}

export default BooksApp

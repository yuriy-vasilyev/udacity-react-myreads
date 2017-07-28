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
        )}/>
        <Route path="/search" render={ () => (
          <SearchBooks books={ this.state.books } onChangeShelf={ this.handleChangeShelf } />
        )}/>
      </div>
    )
  }
}

export default BooksApp

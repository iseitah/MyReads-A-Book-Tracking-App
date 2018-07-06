import React from 'react'
import * as BooksAPI from './BooksAPI'
import HomePage from './HomePage.js'
import BooksSearch from './BooksSearch.js'
import {Route} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'

import './App.css'

class BooksApp extends React.Component {
  state = {
    data : []
  }
componentDidMount() {
  BooksAPI.getAll().then(data => {
    this.setState({
      data : data
    });
  });
}
update = (book, shelf) =>{
  BooksAPI.update(book,shelf).then(() =>{
    book.shelf = shelf;
    this.setState((state) => ({
      data : state.data.filter(b => b.id !== book.id).concat([book])}));
  })
}

  render(){
    return(
      <BrowserRouter>
      <div className="app">
      <Route exact path = '/search' render = {() => (
        <BooksSearch data = {this.state.data} onChange = {this.update}/>
      ) } />
      <Route exact path = '/' render = {() => (
        <HomePage data = {this.state.data} onChange = {this.update} />
      )} />
      </div>
      </BrowserRouter>
    )
  }
}
export default BooksApp

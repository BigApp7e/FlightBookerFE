import React, { Component } from 'react';
import './App.css';
import './SearchBar';
import SearchBar from './SearchBar';
import HorizontalMenu from './HorizontalMenu';
import ResultContent from './ResultContent';

import Footer from './Footer';
import Popup from './Popup';


class App extends Component {

  constructor(props) {
    super(props);

    this.resultContent = React.createRef();
   
    this.state = {
        searchResult: null,
        clearForm: false
    };

  
   
}

handleAfterRenderResult = (data) => {
  this.setState({ searchResult: null, clearForm: true }, () => {
    setTimeout(() => {
      this.setState({ clearForm: false });
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }, 100);
  });
};

handleSearchResult = (data) => {
  this.setState({ searchResult: data },() =>{
    setTimeout(() => {
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }, 100);
  });
};



render() {

 const { searchResult } = this.state;

    return (
      <div className="App">
        <HorizontalMenu   />
        <header className="App-header">
          <SearchBar onSearchResult={this.handleSearchResult} clearForm={this.state.clearForm}  />
          <div className="empty-div"></div>
        </header>
        <ResultContent searchData={searchResult}  clearResult={this.handleAfterRenderResult} ref={this.resultContent}/>
        <Footer/>
        <Popup/>
      </div>
    );
  }
}

export default App;

import React, { Component, createRef } from 'react';
import './searchBar.css';
import DateSelector from './dataPicker/DateSelector';
import axios from 'axios';

import { cities } from './data/CityList';


class SearchBar extends Component {

  constructor(props) {

    super(props);

    this.state = {
      fromQuery: '',
      toQuery: '',
      fromSuggestions: [],
      toSuggestions: [],
      oneWay: false,
      fromDate: null,
      toDate: null,
      passengers: 1,
      data:[],
      error:null,
      toClear:false
    };

    this.inputFromRef = createRef();
    this.suggestionsFromRef = createRef();
    this.inputToRef = createRef();
    this.suggestionsToRef = createRef();
  }



  handleFromChange = (e) => {
    const value = e.target.value;
    this.setState({ fromQuery: value });

    if (value.length > 0) {
      const filteredSuggestions = cities.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      this.setState({ fromSuggestions: filteredSuggestions });
    } else {
      this.setState({ fromSuggestions: [] });
    }
  };

  handleToChange = (e) => {
    const value = e.target.value;
    this.setState({ toQuery: value });

    if (value.length > 0) {
      const filteredSuggestions = cities.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      this.setState({ toSuggestions: filteredSuggestions });
    } else {
      this.setState({ toSuggestions: [] });
    }
  };

  handlePersonsToChange = (e) => {
    const value = e.target.value;
    if (value <= 0) {
      this.setState({ passengers: 1 });
      alert("Please enter a valid number of passengers!");
    } else {
      this.setState({ passengers: value });
    }
  };

  handleRadioChange = (e) => {
    const value = e.target.value;
    this.setState({ oneWay: value === 'oneWay' });
  };

  handleFromSuggestionClick = (city) => {
    this.setState({ fromQuery: city, fromSuggestions: [] });
  };

  handleToSuggestionClick = (city) => {
    this.setState({ toQuery: city, toSuggestions: [] });
  };



  updateFromSuggestionsPosition = () => {
    if (this.inputFromRef.current && this.suggestionsFromRef.current) {
      const inputRect = this.inputFromRef.current.getBoundingClientRect();
      this.suggestionsFromRef.current.style.top = `${inputRect.bottom}px`;
      this.suggestionsFromRef.current.style.left = `${inputRect.left}px`;
      this.suggestionsFromRef.current.style.width = `${inputRect.width}px`;
    }
  };

  updateToSuggestionsPosition = () => {
    if (this.inputToRef.current && this.suggestionsToRef.current) {
      const inputRect = this.inputToRef.current.getBoundingClientRect();
      this.suggestionsToRef.current.style.top = `${inputRect.bottom}px`;
      this.suggestionsToRef.current.style.left = `${inputRect.left}px`;
      this.suggestionsToRef.current.style.width = `${inputRect.width}px`;
    }
  };


  clearForm = () =>{

    this.setState(
      {fromQuery: '',
      toQuery: '',
      fromSuggestions: [],
      toSuggestions: [],
      fromDate: null,
      toDate: null,
      oneWay: false,
      passengers: 1,
      data:[],
      error:null,
      toClear:true});

  }
  handleDateChange = ({ startDate, endDate }) => {   
    this.setState({ fromDate: startDate  || null , toDate: endDate || null});
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateFromSuggestionsPosition);
    window.addEventListener('resize', this.updateToSuggestionsPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFromSuggestionsPosition);
    window.removeEventListener('resize', this.updateToSuggestionsPosition);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.fromQuery !== this.state.fromQuery) {
      this.updateFromSuggestionsPosition();
    }
    if (prevState.toQuery !== this.state.toQuery) {
      this.updateToSuggestionsPosition();
    }
    if (this.props.clearForm && !prevProps.clearForm) {
      this.clearForm();
    }
  }

  handleClick = async (e) => {

    e.preventDefault();

    const { fromQuery, toQuery, oneWay, passengers, fromDate, toDate } = this.state;


    try {

      const response = await axios.post('http://localhost:8080/api/search', {
        from: fromQuery,
        to: toQuery,
        oneWay,
        passengers,
        fromDate,
        toDate
      });

      this.props.onSearchResult(response.data);

    } catch (error) {
      if (error.response) {
        this.setState({ error: error.response.data }, () => {
            Object.values(this.state.error).forEach(value => {
              alert(value);
          });

        });
        } else if (error.request) {
          this.setState({ error: 'No response received from server' }, () => {
            alert(this.state.error);
        });
        } else {
          this.setState({ error: 'Error: ' + error.message }, () => {
            alert(this.state.error);
          });
        }

    }
  };

showResult(response){
    console.log(response);
}
  render() {

    return (
      <form className="searchbar-container" noValidate>
        <h1 className='searchbar-header'>Where would you like to go?</h1>
        <div className="input-wrapper">
          <label>From:</label>
          <input
            type="text"
            id="from-city"
            placeholder="From:"
            title='From'
            value={this.state.fromQuery}
            onChange={this.handleFromChange}
            ref={this.inputFromRef}
            onFocus={this.updateFromSuggestionsPosition}
            autoComplete='off'
          />
          {this.state.fromSuggestions.length > 0 && (
            <ul className="autocomplete-suggestions" ref={this.suggestionsFromRef}>
              {this.state.fromSuggestions.map((city, index) => (
                <li key={index} onClick={() => this.handleFromSuggestionClick(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="input-wrapper">
          <label>To:</label>
          <input
            type="text"
            id="to"
            placeholder="To:"
            autoComplete='off'
            value={this.state.toQuery}
            onChange={this.handleToChange}
            ref={this.inputToRef}
            onFocus={this.updateToSuggestionsPosition}
          />
          {this.state.toSuggestions.length > 0 && (
            <ul className="autocomplete-suggestions" ref={this.suggestionsToRef}>
              {this.state.toSuggestions.map((city, index) => (
                <li key={index} onClick={() => this.handleToSuggestionClick(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='row-inputs-container'>
          <div>
            <label>Date:</label>
            <DateSelector
              oneWay={this.state.oneWay}
              toClear={this.state.toClear}
              startDate={this.state.fromDate}
              endDate={this.state.toDate}
              onDateChange={this.handleDateChange}
            />
          </div>
          <div>
            <label>Persons:</label>
            <input
              type='number'
              className='persons-input'
              min="1"
              max="100"
              value={this.state.passengers}
              onChange={this.handlePersonsToChange}
            />
          </div>
        </div>

        <div className="radio-buttons-container">
          <div className="radio-holder">
            <input
              type="radio"
              id="option1"
              name="option"
              value="oneWay"
              checked={this.state.oneWay}
              onChange={this.handleRadioChange}
            />
            <label>One Way</label>
          </div>
          <div className="radio-holder">
            <input
              type="radio"
              id="option2"
              name="option"
              value="roundTrip"
              checked={!this.state.oneWay}
              onChange={this.handleRadioChange}
            />
            <label>Round Trip</label>
          </div>
        </div>
        <button type="button" className='blue-button' onClick={this.handleClick}>Search Flight</button>
      </form>
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomInput from './CustomInput';

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };

   
  }

  componentDidMount() {
    // Listen for custom event 'clearDateSelector'
    document.addEventListener('clearDateSelector', this.clearDate);
  }

  componentWillUnmount() {
    // Clean up event listener when component unmounts
    document.removeEventListener('clearDateSelector', this.clearDate);
  }

  clearDate = () =>{
    this.setState({
      startDate: null,
      endDate: null
    });
  }

  handleDateChange = (date) => {
    const { onDateChange, oneWay, toClear } = this.props;

    if(toClear){
        this.setState({startDate: null, endDate: null });
    }
    if (oneWay) {
      this.setState({ startDate: date, endDate: null }, () => {
        onDateChange && onDateChange({ startDate: this.state.startDate, endDate: this.state.endDate });
      });
    } else {
      this.setState({ startDate: date, endDate: date }, () => {
        onDateChange && onDateChange({ startDate: this.state.startDate, endDate: this.state.endDate });
      });
    }
  };

  handleSelect = (dates) => {
    const { onDateChange } = this.props;
    const [start, end] = dates;
    this.setState({ startDate: start, endDate: end }, () => {
      onDateChange && onDateChange({ startDate: this.state.startDate, endDate: this.state.endDate });
    });
  };

  render() {
    const { oneWay } = this.props;
    const { startDate, endDate } = this.state;

    return (
      <div>
        {oneWay ? (
          <DatePicker
            selected={startDate}
            onChange={this.handleDateChange}
            customInput={<CustomInput />}
            placeholderText="Select a date"
          />
        ) : (
          <DatePicker
            selected={startDate}
            onChange={this.handleSelect}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={<CustomInput />}
            placeholderText="Select a date range"
          />
        )}
      </div>
    );
  }
}

export default DateSelector;

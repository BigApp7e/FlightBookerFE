import React, { Component } from 'react';
import './result.css';
import ResultItem from './ResultItem';

class ResultContent extends Component {

    constructor(props) {
        super(props);

        // Bind the method to the component instance
        this.clickNewSearch = this.clickNewSearch.bind(this);
      }


    clickNewSearch() {
          // Trigger custom event 'clearDateSelector'
            const clearEvent = new Event('clearDateSelector');
            document.dispatchEvent(clearEvent);

            // Optionally, notify App component to clear other form data
            this.props.clearResult(null);
    }

    render() {
        
        const { searchData } = this.props;

        return (
            <div>
                {searchData ? (
                    <><h2 className='result-header'>Search Result</h2><button button className='newSearchBtn' onClick={this.clickNewSearch} >New Search</button><ul>
                        {searchData.map((item, index) => (
                            <ResultItem key={index} data={item} />
                        ))}
                    </ul></>
                ) : (
                    console.log('No results yet')              
                )}
            </div>
        );
    }
}

export default ResultContent;

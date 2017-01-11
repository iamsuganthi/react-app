import React, {Component} from 'react';

class NextButton extends React.Component {
  render() {
    return <button className="nextButton" onClick={this.props.nextSection}>Next</button>;
  }
}

module.exports = NextButton;
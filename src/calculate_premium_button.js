import React, {Component} from 'react';


class CalculatePremiumButton extends React.Component {
	

  render() {
    return <button className="calculateButton" onClick={this.props.calculatePremium}>Calculate</button>;
  }
}

module.exports = CalculatePremiumButton;
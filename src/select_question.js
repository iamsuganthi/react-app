import React, {Component} from 'react';

class SelectQuestion extends Component {
  render() {
    const options = this.props.options.map(option => <option>{option}</option>);
    return (
	    <div><label>{this.props.name}</label><select>
	      {options}
	    </select></div>
    );
  }
};

module.exports = SelectQuestion;
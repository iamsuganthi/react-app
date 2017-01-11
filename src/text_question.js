import React, {Component} from 'react';

class TextQuestion extends Component {

 update(event) {
    console.log(event.target.value);
  }
  
	render() {
		return <div><label>{this.props.name}</label><input type="text" onChange={this.update.bind(this)}/></div>
   }
}
module.exports = TextQuestion;
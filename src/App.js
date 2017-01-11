import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      address: "67 John Downs Drive, Browns Bay, Auckland 0630",
      currentSection: 0,
      sections: [{
        id: 1,
        name: "Property Details",
        questions: [
          {
            id: 1,
            name: "Style of construction",
            type: "select",
            options: ["Contemporary", "Mid Century", "Bungalow"]
          },
          {id: 2, name: "Year of construction", type: "text"},
          {
            id: 3,
            name: "Standard of construction",
            type: "select",
            options: ["Standard", "Quality", "Prestige"]
          },
          {id: 4, name: "Number of levels ", type: "text"}
        ]
      },
        {
          id: 2,
          name: "Property Details",
          questions: [
            {id: 5, name: "Walls", type: "select", options: ["Blockwork", "Double brick"]},
            {id: 6, name: "Roof", type: "select", options: ["Flat", "Pitched", "Other"]}
          ]
        }]
    }
  }

  update(event) {
    console.log(event.target.value);
  }

  nextSection() {
    this.setState({currentSection: this.state.currentSection + 1});
  }

  calculatePremium() {
    const questions = [];
    for (let i = 0; i < this.state.sections.length; i++) {
      for (let j = 0; j < this.state.sections[i].questions.length; j++) {
        questions.push(this.state.sections[i].questions[j]);
      }
    }
    console.log(JSON.stringify(questions));
    fetch("http://localhost:8080/calculate", {
      mode: 'cors',
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questions)
    }).then(response => response.text())
      .then(text => console.log(text))
  }

  render() {
    const questions = this.state.sections[this.state.currentSection].questions.map(
      question => {
        if (question.type === 'text') {
          return <TextQuestion name={question.name} update={this.update.bind(this)}/>
        } else {
          return <SelectQuestion name={question.name} options={question.options} update={this.update.bind(this)}/>
        }
      }
    );
    return (
      <div>
        <h1>{this.props.txt}</h1>
        <h2>{this.state.address}</h2>
        {questions}
        <NextButton nextSection={this.nextSection.bind(this)}/>
        <CalculatePremiumButton calculatePremium={this.calculatePremium.bind(this)}/>
      </div>
    );
  }
}

App.propTypes = {
  profile: React.PropTypes.string
};

App.defaultProps = {
  profile: "This is the default text"
};

const TextQuestion = (props) => <div><label>{props.name}</label><input type="text" onChange={props.update}/></div>;

class SelectQuestion extends React.Component {
  render() {
    const options = this.props.options.map(option => <option>{option}</option>);
    return (<div><label>{this.props.name}</label><select>
      {options}
    </select></div>);
  }
}

class NextButton extends React.Component {
  render() {
    return <button className="nextButton" onClick={this.props.nextSection}>Next</button>;
  }
}

class CalculatePremiumButton extends React.Component {
  render() {
    return <button className="calculateButton" onClick={this.props.calculatePremium}>Calculate</button>;
  }
}

export default App
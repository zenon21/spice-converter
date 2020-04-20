import React from 'react';
import { WholeUnits, ConversionRatios } from './SpiceConfig';

import StyledSelect from './components/StyledSelect';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSpice: 'allspice',
      conversionRatio: ConversionRatios['allspice'],
      wholeUnits: 0,
      groundUnits: 0,
    };
  }

  selectSpice = (event) => {
    let value = event.target.value;

    this.setState(
      {
        selectedSpice: value,
        conversionRatio: ConversionRatios[value],
        groundUnits: this.state.wholeUnits / ConversionRatios[value],
      },
      () => console.log('ratio', this.state.conversionRatio)
    );
  };

  convertToGround = (event) => {
    let value = event.target.value;

    this.setState({
      wholeUnits: value,
      groundUnits: value / this.state.conversionRatio,
    });
  };

  convertToWhole = (event) => {
    let value = event.target.value;

    this.setState({
      groundUnits: value,
      wholeUnits: value * this.state.conversionRatio,
    });
  };

  renderOptions = () => {
    let spices = Object.keys(WholeUnits);

    const options = spices.map(
      (spice) => (
        <option key={spice} value={spice}>
          {WholeUnits[spice]}
        </option>
      )
      //console.log(WholeUnits[spice])
    );

    return options;
  };

  render() {
    return (
      <main>
        <div>
          <input
            type="number"
            onChange={this.convertToGround}
            value={this.state.wholeUnits}
            min="0"
          />
          <br />
          <StyledSelect
            value={this.state.selectedSpice}
            onChange={this.selectSpice}
          >
            {this.renderOptions()}
          </StyledSelect>
        </div>
        <div> = </div>
        <div>
          <input
            type="number"
            onChange={this.convertToWhole}
            value={this.state.groundUnits}
            min="0"
          />
        </div>
        <div>tsp ground {this.state.selectedSpice}</div>
      </main>
    );
  }
}

export default App;

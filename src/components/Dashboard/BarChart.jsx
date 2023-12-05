import { Chart, registerables } from "chart.js";
import React from "react";
import { getSeparatedCostRange } from "./analytics";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    Chart.register(...registerables);
  }
  componentDidMount() {
    const pets = this.props.pets;
    const reports = this.props.reports;
    let colors = this.props.color;
    let filteredData = getSeparatedCostRange(reports);
    filteredData.data.forEach(petData => {
      const color = colors.shift();
      petData.label = pets.filter((pet) => pet.id == petData.label)[0].name;
      petData.backgroundColor = color;
      petData.borderColor = color;
    });
    this.myChart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        labels: filteredData.labels,
        datasets: filteredData.data,
    }
    });
  }
  render() {
    return (<canvas ref={this.chartRef} />);
  }
}

export default BarChart;
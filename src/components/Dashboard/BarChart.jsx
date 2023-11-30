import { Chart, registerables } from "chart.js";
import React from "react";
import { useState, useEffect } from "react";
import { getSeparatedCostRange } from "./analytics";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    Chart.register(...registerables);
  }
  componentDidMount() {
    let pets = JSON.parse(window.localStorage.getItem('pets'));
    let reports = getSeparatedCostRange(JSON.parse(window.localStorage.getItem('reports')));
    reports.data.forEach(petData => {
      petData.label = pets.filter((pet) => pet.id == petData.label)[0].name;
    });
    this.myChart = new Chart(this.chartRef.current, {
      type: 'bar',
      data: {
        labels: reports.labels,
        datasets: reports.data,
    }
    });
  }
  render() {
    return (<canvas ref={this.chartRef} />);
  }
}

export default BarChart;
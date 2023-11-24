import { Chart, registerables } from "chart.js";
import React from "react";
import { useState, useEffect } from "react";
import { getCostRange } from "./analytics";

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        Chart.register(...registerables);
    }
    componentDidMount() {
        let reports = getCostRange(JSON.parse(window.localStorage.getItem('reports')));
        console.log(reports);
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
              labels: reports.map(d => d.label),
              datasets: [{
                label: this.props.title,
                data: reports.map(d => d.value),
                backgroundColor: this.props.color
              }]
            }
          });
    }
    render() { 
        return (<canvas ref={this.chartRef}/>);
    }
}
 
export default BarChart;
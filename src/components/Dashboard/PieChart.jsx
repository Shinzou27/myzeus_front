import { Chart, registerables } from "chart.js";
import React from "react";
import { useState, useEffect } from "react";

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        Chart.register(...registerables);
    }
    componentDidMount() {
        let reports = JSON.parse(window.localStorage.getItem('reports'));
        console.log(reports);
        this.myChart = new Chart(this.chartRef.current, {
            type: 'doughnut',
            data: {
              labels: reports.map(d => d.brand),
              datasets: [{
                data: reports.map(d => d.amount),
                backgroundColor: this.props.colors
              }]
            }
          });
    }
    render() { 
        return (<canvas ref={this.chartRef}/>);
    }
}
 
export default PieChart;
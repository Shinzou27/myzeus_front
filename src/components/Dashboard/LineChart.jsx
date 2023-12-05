import { Chart, registerables } from "chart.js";
import React from "react";
import { getSeparatedDataRange } from "./analytics";

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        Chart.register(...registerables);
    }
    componentDidMount() {
        const pets = this.props.pets;
        const reports = this.props.reports;
        let filteredData = getSeparatedDataRange(reports);
        let colors = this.props.color;
        filteredData.data.forEach(petData => {
            const color = colors.shift()
            petData.label = pets.filter((pet) => pet.id == petData.label)[0].name;
            petData.backgroundColor = color;
            petData.borderColor = color;
        });
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
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

export default LineChart;
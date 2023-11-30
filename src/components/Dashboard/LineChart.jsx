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
        let pets = JSON.parse(window.localStorage.getItem('pets'));
        let reports = getSeparatedDataRange(JSON.parse(window.localStorage.getItem('reports')));
        let colors = this.props.color;
        reports.data.forEach(petData => {
            const color = colors.shift()
            petData.label = pets.filter((pet) => pet.id == petData.label)[0].name;
            petData.backgroundColor = color;
            petData.borderColor = color;
        });
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
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

export default LineChart;
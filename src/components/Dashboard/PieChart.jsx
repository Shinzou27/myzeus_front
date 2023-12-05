import { Chart, registerables } from "chart.js";
import React from "react";
import { getBrandPreference } from "./analytics";

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        Chart.register(...registerables);
    }
    componentDidMount() {
        let reports = getBrandPreference(this.props.reports);
        this.myChart = new Chart(this.chartRef.current, {
            type: 'pie',
            data: {
              labels: reports.map(d => d.label),
              datasets: [{
                title: this.props.title,
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
 
export default PieChart;
import React, { Component } from 'react';
import BarChart from '../../components/d3-manipulator/BarChart/BarChart'


class BarChartPage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <BarChart />
            </div>
        )
    }
}
export default BarChartPage
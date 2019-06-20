import React,{ Component } from 'react'
import D3Manipulator from '../../components/d3-manipulator/D3Manipulator'
import lesmis from '../../components/d3-manipulator/lesmis.json'

class D3ManipulatorForce3D extends Component {
    constructor(props){
        super(props)

        this.state = {}


    }


    render(){
        return (
            <D3Manipulator title={'D3 Manipulator - 3D Force-Directed Graph'} data={lesmis}/>
        )
    }
}

export default D3ManipulatorForce3D
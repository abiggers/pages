import React, { Component } from 'react'
import axios from 'axios'
import ForceGraph3D from '3d-force-graph';
import * as d3 from 'd3-force-3d'




class CrawlViewerGraph extends Component {
    constructor(props) {
        super(props)
        this.create3DChart = this.create3DChart.bind(this)


    }
    componentDidMount() {
        this.create3DChart()
    }
    componentDidUpdate(){        this.create3DChart()


    }

    create3DChart() {


        const initData = {
            nodes: [],
            links: []
        };
        const elem = document.getElementById("graph");
        const Graph = ForceGraph3D()(elem)
        .width([this.props.w])
            .enableNodeDrag(false)
            .nodeAutoColorBy('id')
            .nodeVal(this.props.nodeSize)
            .nodeLabel('id')
            .nodeLabel('title')
            .graphData(initData)


        setInterval(() => {
            axios.get('http://localhost:5000/').then(function (response) {
                if(response.data.nodes.length > 0){

                        for(var i = 0; i < response.data.nodes.length; i++){
                            initData['nodes'].push(response.data.nodes[i])

                        }
                        for(var i = 0; i < response.data.links.length; i++){
                            initData['links'].push(response.data.links[i])
                        }
                        console.log(initData['nodes'])
            Graph.graphData(response.data)
            .nodeVal(10)
                .linkDirectionalParticles(10)
                .linkDirectionalParticleSpeed(0.01)
                .d3Force('collide', d3.forceCollide(Graph.nodeRelSize() * 5))
                .d3Force('charge', d3.forceManyBody().strength(-150))
                .d3Force('link')
                .distance(200)

                                }
            }




            )

        },3000);
        //

    }


    render() {
        return (
            <div><div id="graph" style={{width: 50}}></div></div>
        )
    }
}
export default CrawlViewerGraph
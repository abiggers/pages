import React, { Component } from 'react'
import ForceGraph3D from '3d-force-graph';
import * as d3 from 'd3-force-3d'
import * as THREE from 'three'
import * as chromatic from 'd3-scale-chromatic'
import * as d3scale from 'd3-scale'





class Force3D extends Component {
    constructor(props) {
        super(props)
        this.create3DChart = this.create3DChart.bind(this)



        this.state = {
            nodes: 0,
            nodeSize: 0,
            linkDistance: 1,
            nodeOpacity: 0.75,
            linkWidth: 1

        }


    }
    componentDidMount() {
        this.create3DChart()


    }


    create3DChart() {

        const elem = document.getElementById("graph");
        let Graph = ForceGraph3D()(elem)

        //this interval checks
        setInterval(() => {
            
            if (this.state.nodes !== this.props.data.nodes.length || this.props.nodeSize !== this.state.nodesize || this.props.linkDistance !== this.state.linkDistance || this.state.nodeOpacity !== this.props.nodeOpacity || this.state.linkWidth !== this.props.linkWidth) {
                Graph.graphData(this.props.data)
                .width([this.props.w])
                .enableNodeDrag(false)
               .nodeThreeObject((node) => new THREE.Mesh(
                   [
                       new THREE.BoxGeometry(this.props.nodeSize * 10, this.props.nodeSize * 10, this.props.nodeSize * 10),
                       new THREE.ConeGeometry(this.props.nodeSize * 5, this.props.nodeSize * 10),
                       new THREE.CylinderGeometry(this.props.nodeSize * 5, this.props.nodeSize * 5, this.props.nodeSize * 10),
                       new THREE.DodecahedronGeometry(this.props.nodeSize * 5),
                       new THREE.SphereGeometry(this.props.nodeSize * 5),
                       new THREE.TorusGeometry(this.props.nodeSize * 5, this.props.nodeSize),
                       new THREE.TorusKnotGeometry(this.props.nodeSize * 5, this.props.nodeSize)
                   ][node['id'] % 7],
                   new THREE.MeshLambertMaterial({
                       color:this.props.colorScaler(node[this.props.colorBy]),
                       transparent: true,
                       opacity: this.props.nodeOpacity
                   })
               ))
                .linkWidth(this.props.linkWidth)
                .linkDirectionalParticles('value')
                .linkDirectionalParticleSpeed(0.015)
                .linkDirectionalParticleWidth(this.props.linkWidth * .8)
                .d3Force('link')
                .distance(this.props.linkDistance)

                this.setState({ nodes: this.props.data.nodes.length, nodesize: this.props.nodeSize, linkDistance: this.props.linkDistance, nodeOpacity: this.props.nodeOpacity, linkWidth: this.props.linkWidth})

            }
        }, 1000
        )






        //

    }


    render() {
        return (
            <div>
                <div id='graph-title'>{this.props.title}</div>
                <div id="graph"></div>
            </div>

        )
    }
}
export default Force3D
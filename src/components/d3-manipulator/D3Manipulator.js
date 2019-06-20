import React, { Component } from 'react'
import './index.css'
import Force3D from './force3d'
import * as chromatic from 'd3-scale-chromatic'
import * as d3scale from 'd3-scale'

//create our component

class D3Manipulator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            node_size: 1,
            node_opacity: .75,
            link_distance: 120,
            link_width: 1,
            iframesrc: '',
            node_colorby: 'id',
            node_colorscale: d3scale.scaleOrdinal().range(chromatic.schemeCategory10),
            scaler: d3scale.scaleOrdinal(),
            interpolateMax: 13,

            data:  this.props.data
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.redefineMax = this.redefineMax.bind(this)
        this.handleColorMethod = this.handleColorMethod.bind(this)
        this.redefineColor = this.redefineColor.bind(this)
        this.clearData = this.clearData.bind(this)
    }
    redefineMax(callback) {
        const key = document.getElementById('keys-dropdown').value
        const nodes = this.state.data.nodes
        var keyvals = []



        
        setTimeout(function(){for (var i = 0; i < nodes.length; i++) {
            keyvals.push(nodes[i][key])
        }
        var uniquekeys = new Set(keyvals)

    callback(key, uniquekeys.size)} , 3000)


        
    }


redefineColor(){

    this.redefineMax(this.handleColorMethod)
}
    handleChange() {
        const nodeSizeSlider = document.getElementById('node-size-slider')
        const nodeOpacitySlider = document.getElementById('node-opacity-slider')
        const linkDistanceSlider = document.getElementById('link-distance-slider')
        const linkWidthSlider = document.getElementById('link-width-slider')

        this.setState({ node_size: nodeSizeSlider.value, node_opacity: nodeOpacitySlider.value, link_distance: linkDistanceSlider.value, link_width: linkWidthSlider.value })





    }

    handleColorMethod(key, max) {
        const colorScaleDropdown = document.getElementById('colorscale-dropdown')
        this.setState({ node_colorby: key })
        this.setState({interpolateMax: max}) 

        switch (colorScaleDropdown.value) {

            case 'schemeCategory10':
                this.setState({ node_colorscale: d3scale.scaleOrdinal().range(chromatic.schemeCategory10).domain(this.state.data.nodes) })
                break;
            case 'schemeAccent':
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemeAccent)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemeDark2":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemeDark2)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemePaired":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemePaired)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemePastel1":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()

                        .range(chromatic.schemePastel1)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemePastel2":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemePastel2)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemeSet1":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemeSet1)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemeSet2":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemeSet2)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemeSet3":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemeSet3)
                        .domain(this.state.data.nodes)
                })
                break;
            case "schemeSet3":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(chromatic.schemeSet3)
                        .domain(this.state.data.nodes)
                })
                break;
            case "extra scheme - Crayola Colors":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(['#ED0A3F', '#C32148', '#FD0E35', '#C62D42', '#CC474B', '#CC3336', '#E12C2C', '#D92121', '#B94E48', '#FF5349', '#FE4C40', '#FE6F5E', '#B33B24', '#CC553D', '#E6735C', '#FF9980', '#E58E73', '#FF7F49', '#FF681F', '#FF8833', '#FFB97B', '#ECB176', '#E77200', '#FFAE42', '#F2BA49', '#FBE7B2', '#F2C649', '#F8D568', '#FCD667', '#FED85D', '#FBE870', '#F1E788', '#FFEB00', '#B5B35C', '#ECEBBD', '#FAFA37', '#FFFF99', '#FFFF9F', '#D9E650', '#ACBF60', '#AFE313', '#BEE64B', '#C5E17A', '#5E8C31', '#7BA05B', '#9DE093', '#63B76C', '#4D8C57', '#3AA655', '#6CA67C', '#5FA777', '#93DFB8', '#33CC99', '#1AB385', '#29AB87', '#00CC99', '#00755E', '#8DD9CC', '#01786F', '#30BFBF', '#00CCCC', '#008080', '#8FD8D8', '#95E0E8', '#6CDAE7', '#2D383A', '#76D7EA', '#7ED4E6', '#0095B7', '#009DC4', '#02A4D3', '#47ABCC', '#4997D0', '#339ACC', '#93CCEA', '#2887C8', '#00468C', '#0066CC', '#1560BD', '#0066FF', '#A9B2C3', '#C3CDE6', '#4570E6', '#7A89B8', '#4F69C6', '#8D90A1', '#8C90C8', '#7070CC', '#9999CC', '#ACACE6', '#766EC8', '#6456B7', '#3F26BF', '#8B72BE', '#652DC1', '#6B3FA0', '#8359A3', '#8F47B3', '#C9A0DC', '#BF8FCC', '#803790', '#733380', '#D6AEDD', '#C154C1', '#FC74FD', '#732E6C', '#E667CE', '#E29CD2', '#8E3179', '#D96CBE', '#EBB0D7', '#C8509B', '#BB3385', '#D982B5', '#A63A79', '#A50B5E', '#614051', '#F653A6', '#DA3287', '#FF3399', '#FBAED2', '#FFB7D5', '#FFA6C9', '#F7468A', '#E30B5C', '#FDD7E4', '#E62E6B', '#DB5079', '#FC80A5', '#F091A9', '#FF91A4', '#A55353', '#CA3435', '#FEBAAD', '#F7A38E', '#E97451', '#AF593E', '#9E5B40', '#87421F', '#926F5B', '#DEA681', '#D27D46', '#664228', '#D99A6C', '#EDC9AF', '#FFCBA4', '#805533', '#FDD5B1', '#EED9C4', '#665233', '#837050', '#E6BC5C', '#D9D6CF', '#92926E', '#E6BE8A', '#C9C0BB', '#DA8A67', '#C88A65', '#000000', '#736A62', '#8B8680', '#C8C8CD'])
                        .domain(this.state.data.nodes)
                })
                break;
            case "extra scheme - Crayola Bright Colors":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(['#FF3855', '#FD3A4A', '#FB4D46', '#FA5B3D', '#FFAA1D', '#FFF700', '#299617', '#A7F432', '#2243B6', '#5DADEC', '#5946B2', '#9C51B6', '#A83731', '#AF6E4D', '#1B1B1B', '#BFAFB2', '#FF5470', '#FFDB00', '#FF7A00', '#FDFF00', '#87FF2A', '#0048BA', '#FF007C', '#E936A7'])
                        .domain(this.state.data.nodes)
                })
                break;
            case "extra scheme - Crayola Fluorescent Colors":
                this.setState({
                    node_colorscale: d3scale.scaleOrdinal()
                        .range(['#FF355E', '#FD5B78', '#FF6037', '#FF9966', '#FF9933', '#FFCC33', '#FFFF66', '#FFFF66', '#CCFF00', '#66FF66', '#AAF0D1', '#50BFE6', '#FF6EFF', '#EE34D2', '#FF00CC', '#FF00CC'])
                        .domain(this.state.data.nodes)
                })
                break;
            case "interpolateRainbow":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.interpolateMax])
                        .interpolator(chromatic.interpolateRainbow)
                })
                break;
            case "interpolateBrBG":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateBrBG)
                })
                break;
            case "interpolatePRGn":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolatePRGn)
                })
                break;
            case "interpolateRdBu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateRdBu)
                })
                break;
            case "interpolateRdGy":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateRdGy)
                })
                break;
            case "interpolateRdYlBu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateRdYlBu)
                })
                break;
            case "interpolateRdYlGn":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateRdYlGn)
                })
                break;
            case "interpolateSpectral":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateSpectral)
                })
                break;
            case "interpolateBuGn":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateBuGn)
                })
                break;
            case "interpolateBuPu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateBuPu)
                })
                break;
            case "interpolateGnBu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateGnBu)
                })
                break;
            case "interpolateOrRd":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateOrRd)
                })
                break;
            case "interpolatePuBuGn":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolatePuBuGn)
                })
                break;
            case "interpolatePuBu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolatePuBu)
                })
                break;
            case "interpolatePuRd":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolatePuRd)
                })
                break;
            case "interpolateRdPu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateRdPu)
                })
                break;
            case "interpolateYlGnBu":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateYlGnBu)
                })
                break;
            case "interpolateYlGn":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateYlGn)
                })
                break;
            case "interpolateYlOrBr":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateYlOrBr)
                })
                break;
            case "interpolateYlOrRd":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateYlOrRd)
                })
                break;
            case "interpolateBlues":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateBlues)
                })
                break;
            case "interpolateGreens":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateGreens)
                })
                break;
            case "interpolateGreys":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateGreys)
                })
                break;
            case "interpolatePurples":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolatePurples)
                })
                break;
            case "interpolateReds":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateReds)
                })
                break;
            case "interpolateOranges":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateOranges)
                })
                break;
            case "interpolateCubehelixDefault":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateCubehelixDefault)
                })
                break;
            case "interpolateWarm":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateWarm)
                })
                break;
            case "interpolateCool":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateCool)
                })
                break;
            case "interpolateSinebow":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateSinebow)
                })
                break;
            case "interpolateViridis":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateViridis)
                })
                break;
            case "interpolateMagma":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateMagma)
                })
                break;
            case "interpolateInferno":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolateInferno)
                })
                break;
            case "interpolatePlasma":
                this.setState({
                    node_colorscale: d3scale.scaleSequential()
                        .domain([1, this.state.data.nodes.length])
                        .interpolator(chromatic.interpolatePlasma)
                })
                break;
        }

    
    }
clearData(){
const graphlocation = document.getElementById('graph-goes-here')

}

    handleUpload() {
        const fupload = document.getElementById('uload-data').files[0]
        const reader = new FileReader();
        const scope = this;
        const keyselector = document.getElementById('keys-dropdown')
        reader.onload = (function (e) {
            const text = JSON.parse(reader.result);
            scope.setState({ data: text })
            keyselector.innerHTML = ""
            for (var k in text.nodes[0]) {
                keyselector.options[keyselector.options.length] = new Option(k, k)
            }
        })

        reader.readAsText(fupload)
    }
    keyDomainMax(){

    }
    render() {

        return (
            <div id='manipulator-container'>

                <div id='graph-goes-here'>
                    <Force3D data={this.state.data}
                        w={[window.innerWidth * .8]}
                        colorBy={this.state.node_colorby}
                        colorScaler={(this.state.node_colorscale)}
                        title={this.props.title}
                        nodeSize={this.state.node_size}
                        linkDistance={this.state.link_distance}
                        nodeOpacity={this.state.node_opacity}
                        linkWidth={[this.state.link_width]}
                        shapeBy={'group'}
/>
                </div>

                <div id='manipulator-toolbar'>

                    <div id={'nodesettings'}>
                        <h4>Nodes</h4>
                        <div className={"slidecontainer"}>
                            <span className={'slider-label'}> Size: {this.state.node_size}</span>
                            <input className={'slider'}
                                id={'node-size-slider'}
                                type="range"
                                min={1} max={20}
                                value={this.state.node_size}
                                onChange={this.handleChange}
                                step="1" />
                        </div>
                        <div className={"slidecontainer"}>
                            <span className={'slider-label'}> Opacity: {this.state.node_opacity}</span>
                            <input className={'slider'}
                                id={'node-opacity-slider'}
                                type="range"
                                min={.0} max={1}
                                value={this.state.node_opacity}
                                onChange={this.handleChange}
                                step=".001" />
                        </div>
                        <div id={'colorpicker'}>
                            <div style={{ padding: 15 }}>
                                <text style={{ float: 'left', marginRight: 5, paddingLeft: 15 }}>color by: </text>
                                <select id={'keys-dropdown'} onChange={this.redefineColor}>
                                    <option value={'id'}>id</option>
                                    <option value={'group'}>group</option>
                                </select>
                                <text style={{ float: 'left', marginRight: 5, paddingLeft: 15 }}>Color Scale: </text>
                                <select id={'colorscale-dropdown'} onChange={this.redefineColor}>
                                    <option value={'schemeCategory10'}>schemeCategory10</option>
                                    <option value={'schemeAccent'}>schemeAccent</option>
                                    <option value={'schemeDark2'}>SchemeDark2</option>
                                    <option value={'schemePaired'}>schemePaired</option>
                                    <option value={'schemePastel1'}>schemePastel1</option>
                                    <option value={'schemePastel2'}>schemePastel2</option>
                                    <option value={'schemeSet1'}>schemeSet1</option>
                                    <option value={'schemeSet2'}>schemeSet2</option>
                                    <option value={'schemeSet3'}>schemeSet3</option>
                                    <option value={'extra scheme - Crayola Colors'}>extra scheme - Crayola Colors</option>
                                    <option value={'extra scheme - Crayola Bright Colors'}>extra scheme - Crayola Bright Colors</option>
                                    <option value={'extra scheme - Crayola Fluorescent Colors'}>extra scheme - Crayola Fluorescent Colors</option>
                                    <option value={'interpolateRainbow'}>interpolateRainbow</option>
                                    <option value={'interpolateBrBG'}>interpolateBrBG</option>
                                    <option value={'interpolatePRGn'}>interpolatePRGn</option>
                                    <option value={'interpolatePiYG'}>interpolatePiYG</option>
                                    <option value={'interpolatePuOr'}>interpolatePuOr</option>
                                    <option value={'interpolateRdBu'}>interpolateRdBu</option>
                                    <option value={'interpolateRdGy'}>interpolateRdGy</option>
                                    <option value={'interpolateRdYlBu'}>interpolateRdYlBu</option>
                                    <option value={'interpolateRdYlGn'}>interpolateRdYlGn</option>
                                    <option value={'interpolateSpectral'}>interpolateSpectral</option>
                                    <option value={'interpolateBuGn'}>interpolateBuGn</option>
                                    <option value={'interpolateBuPu'}>interpolateBuPu</option>
                                    <option value={'interpolateGnBu'}>interpolateGnBu</option>
                                    <option value={'interpolateOrRd'}>interpolateOrRd</option>
                                    <option value={'interpolatePuBuGn'}>interpolatePuBuGn</option>
                                    <option value={'interpolatePuBu'}>interpolatePuBu</option>
                                    <option value={'interpolatePuRd'}>interpolatePuRd</option>
                                    <option value={'interpolateRdPu'}>interpolateRdPu</option>
                                    <option value={'interpolateYlGnBu'}>interpolateYlGnBu</option>
                                    <option value={'interpolateYlGn'}>interpolateYlGn</option>
                                    <option value={'interpolateYlOrBr'}>interpolateYlOrBr</option>
                                    <option value={'interpolateYlOrRd'}>interpolateYlOrRd</option>
                                    <option value={'interpolateBlues'}>interpolateBlues</option>
                                    <option value={'interpolateGreens'}>interpolateGreens</option>
                                    <option value={'interpolateGreys'}>interpolateGreys</option>
                                    <option value={'interpolatePurples'}>interpolatePurples</option>
                                    <option value={'interpolateReds'}>interpolateReds</option>
                                    <option value={'interpolateOranges'}>interpolateOranges</option>
                                    <option value={'interpolateCubehelixDefault'}>interpolateCubehelixDefault</option>
                                    <option value={'interpolateWarm'}>interpolateWarm</option>
                                    <option value={'interpolateCool'}>interpolateCool</option>
                                    <option value={'interpolateSinebow'}>interpolateSinebow</option>
                                    <option value={'interpolateViridis'}>interpolateViridis</option>
                                    <option value={'interpolateMagma'}>interpolateMagma</option>
                                    <option value={'interpolateInferno'}>interpolateInferno</option>
                                    <option value={'interpolatePlasma'}>interpolatePlasma</option>

                                </select></div>

                        </div>
                    </div>
                    <div id={'linksettings'}>
                        <h4>Links</h4>
                        <div className={"slidecontainer"}>
                            <span className={'slider-label'}> Distance: {this.state.link_distance}</span>
                            <input className={'slider'}
                                id={'link-distance-slider'}
                                type="range"
                                min={1} max={1000}
                                value={this.state.link_distance}
                                onChange={this.handleChange}
                                step="1" />
                        </div>
                        <div className={"slidecontainer"}>
                            <span className={'slider-label'}> Width: {this.state.link_width}</span>
                            <input className={'slider'}
                                id={'link-width-slider'}
                                type="range"
                                min={1} max={20}
                                value={this.state.link_width}
                                onChange={this.handleChange}
                                step="1" />
                        </div>
                    </div>
                   
                </div>

            </div>
        )
    }
}

export default D3Manipulator
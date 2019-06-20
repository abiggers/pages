import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CodeCard from '../../components/codecard/index'
import './code.css'
import d3manipulatorScreenshot from '../../components/d3-manipulator/Screenshot.png'



//creates a react component named Code
class Code extends React.Component {
    constructor(props) {
        super(props)


    }


    //here's where we do the actual rendering of the page
    render() {


        return (
            <div style={{ width: '95%', color: 'black', marginLeft: '2.5%', marginTop: 50 }}>
                <CodeCard title={'D3 Manipulator'} id={'d3manipulator'} language={'node'} description={'D3 Manipulator is tool that allows for the live building and customization of D3js graphs'} drawerstuff={
                    <div>
                        <h5>live demo: <Link to='/d3manipulator'>here</Link></h5><h5>Github Repository:<a href='https://github.com/abiggers/d3manipulator'>https://github.com/abiggers/d3manipulator</a>
                        </h5>
                        <p>D3 Manipulator is an ongoing project to develop a comprehensive, intuitive, and cross-platform graphical interface for the creation of data visualizations using the D3 javascript library, regardless of the user's previous experience with code or computer programming. This initial release merely serves as a proof of concept, and is therefor extremely limited in overall functionality and design, when compared with the eventual final product. It does, however, function as intended, and succeeds in laying the groundwork for expasion. That being said, at the moment, the D3 Manipulator is only available as a React component for customizing the look and feel of a 3D force-directed graph build using <a href='https://github.com/vasturiano/3d-force-graph'>3d-force-graph</a></p>
                        <p>To view a live demonstration of the D3 Manipulator using the now-infamous Les Miserables JSON as a data source, you can click <Link to='/d3manipulator'>here</Link> or click the link above labeled "Live Demo" </p>
                        <p>to view the source code for the current release, visit the project's Github repository at the link provided above.</p><p>Be sure to check back frequently, as this project is updated daily, and will soon include a variety of additional interactive graph options, such as Tree Graph, Scatter Plot, Bar Graph, and Multi-Line Graphs! Also coming soon: Non-React Version (becuase not everyone uses React, and nothing about the D3 Manipulator is React-specific), Use Your Own Data (this feature will allow users to upload their own data set without having to download the D3 Manipulator, build their visualization, and then export their visualization, either in the form of a still image they can download to their own device for later use (.jpg, .png, or .svg all supported), or provide them with a static block of code for them to copy and paste, if they wish to embed the interactive visualization of their data on their own website), as well as a fully-functional cross-platform desktop application built using Electron that requires no internet connection, for those who prefer (or are required to) work with their data in an offline-only environment. </p><p>For instructions on installation and use of the current React component, scroll down below.</p>
                        <img src={d3manipulatorScreenshot} alt={'screenshot'} style={{ width: '100%' }} />
                        <h3>Installation</h3>
                        <p>To install, simply clone or download the git repository into the folder where you are storing your React application's components. You will need to make sure that you have the following packages installed: 3d-force-graph, d3-force-3d, three, d3-scale-chromatic, d3-scale. The easiest way to do this is to open a terminal in the package installation directory and run the 'npm install' command. This will ensure all packages required are installed with the correct version. for example:</p>
                        <p>*Assuming my components folder was located at <b>biggers-software/src/components/</b>*<br /> I would open a terminal and run the following commands:</p>
                        <p style={{ backgroundColor: 'gray', width: '50%', marginLeft: '25%' }}><b>cd biggers-software/src/components<br />git clone https://github.com/abiggers/d3Manipulator.git<br />cd d3Manipulator<br />npm install</b></p>
                        <p>And that is it! your component is ready to be embedded in your existing React application!</p>
                        <h3>Using the Component</h3>
                        <p>To use the component on your React website, just add <text style={{ color: 'blue' }}><b>import D3Manipulator from '/your/installation/directory/d3Manipulator</b></text> to the top of the page, and then place the component like so: <text style={{ color: 'blue' }}><b>{"<D3Manipulator title={*pass in graph title here*} data={*pass in graph data here*} />"}</b></text></p>
                        <p> All of the settings that you are able to toggle from the user's point of view are pretty self explanitory, just be aware that if you are changing the color by option or the color scale option, there will be a slight delay before you see the change, as the application is remapping the color scale based on the newly provided specifications.</p>
                        <p>And that's pretty much it! have fun playing with the D3 Manipulator and check back soon for expanded functionality!</p>
                        
                    </div>} />
                  
            </div>
    
        )



    }
}


//exports our component
export default Code
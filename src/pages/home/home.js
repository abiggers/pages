import React,{ Component } from 'react'
import nodesvg from '../../resources/svg/nodejs.svg'
import pythonsvg from '../../resources/svg/python.svg'
import d3svg from '../../resources/svg/d3.svg'
import reactsvg from '../../resources/svg/react.svg'
import mysqlsvg from '../../resources/svg/mysql.svg'
import mongosvg from '../../resources/svg/mongodb.svg'
import numpysvg from '../../resources/svg/numpy.svg'
import matplotlibsvg from '../../resources/svg/matplotlib.svg'
import ubuntusvg from '../../resources/svg/ubuntu.svg'
class Home extends Component {


    render(){

        return (<div style={{width: '95%', backgroundColor: 'white', marginLeft: '2.5%', height: '95vh'}}>
        <center><h1>Welcome to The Biggers Software Repository</h1></center>
        <h3 style={{width: '60%', marginLeft: '20%'}}>This is the online portal for the living, breathing, constantly expanding personal software repository of Alex Biggers. Here you can find source code, instructions, and live demonstrations for the various projects I have developed/am developing, as well as a portal to communicate directly with me. As the site continues to grow with each new project that is added, you will begin to see a wide variety of software written in Javascript, Python, Java and More!</h3>
            <div style={{position: 'fixed', bottom: 0, left: '25%'}}>

            
<img src={ubuntusvg} style={{width: '65px', margin: 15}} />
<img src={pythonsvg} style={{width: '65px', margin: 15}} />
<img src={numpysvg} style={{width: '65px', margin: 15}} />
<img src={matplotlibsvg} style={{width: '65px', margin: 15}} />
<img src={nodesvg} style={{width: '60px', margin: 15}}/>
<img src={d3svg} style={{width: '65px', margin: 15}} />
<img src={reactsvg} style={{width: '110px'}}/>
<img src={mysqlsvg} style={{width: '65px', margin: 15}}/>
<img src={mongosvg} style={{width: '65px', margin: 15}}/>
           </div> 
</div>
        )

        
    }
}
export default Home
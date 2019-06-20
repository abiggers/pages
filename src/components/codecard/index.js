import React, { Component } from 'react'
import './index.css'
import pythonsvg from '../../resources/svg/python.svg'
import nodesvg from '../../resources/svg/nodejs.svg'



//creates a react component named CodeCard
class CodeCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boxClass: 'box',
            boxTitle: this.props.title,
            languagesvg: pythonsvg,
            languagealt: this.props.language,
            selected: false,
            exitbuttonstyle: { display: 'none' },
            drawercontentstyle: { display: 'none' }
        }


        this.handleHover = this.handleHover.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleLanguage = this.handleLanguage.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleExit = this.handleExit.bind(this)
        this.handleExitMouseEnter = this.handleExitMouseEnter.bind(this)
        this.handleExitMouseLeave = this.handleExitMouseLeave.bind(this)
    }
    componentDidMount() {
        this.handleLanguage()
    }


    handleHover() {
        if (this.state.selected === false) {
            this.setState({ boxClass: 'box cardhover' })

        }

    }


    handleMouseLeave() {
        if (this.state.selected === false) {
            this.setState({ boxClass: 'box' })
        }
    }


    handleLanguage() {
        if (this.props.language === 'python') {
            this.setState({ languagesvg: pythonsvg })
        }
        if (this.props.language === 'node') {
            this.setState({ languagesvg: nodesvg })
        }
    }

    handleClick() {
        if (this.state.selected === false) {
            this.setState({
                selected: true,
                boxClass: 'selected',
                exitbuttonstyle: { float: 'right', marginTop: 5, marginRight: 5, outlineStyle: 'none', opacity: .5, backgroundColor: 'inherit', border: 'none' },
                drawercontentstyle: { width: '90%', height: '80%', backgroundColor: 'rgba(128,128,128,.05)', marginLeft: '5%' }
            })
        }

    }

    handleExit() {

        if (this.state.selected === true) {
            this.setState({ selected: false, boxClass: 'box', exitbuttonstyle: { display: 'none' }, drawercontentstyle: { transition: 'all 1s', display: 'none' } })
        }

    }

    handleExitMouseEnter(){
        this.setState({ exitbuttonstyle: { float: 'right', marginTop: 5, marginRight: 5, outlineStyle: 'none', opacity: .5, backgroundColor: 'gray', border: 'none' },})

    }
    handleExitMouseLeave(){
        this.setState({ exitbuttonstyle: { float: 'right', marginTop: 5, marginRight: 5, outlineStyle: 'none', opacity: .5, backgroundColor: 'inherit', border: 'none' }})
    }
    //here's where we do the actual rendering of the page
    render() {

        return (
            <div class={this.state.boxClass} id={this.props.id} onClick={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
                <button style={this.state.exitbuttonstyle} onMouseEnter={this.handleExitMouseEnter} onMouseLeave={this.handleExitMouseLeave} onClick={this.handleExit}>X</button><div className={'tech-used'}><img src={this.state.languagesvg} alt={this.state.languagealt} style={{ width: 40 }} /></div> <h3>{this.state.boxTitle}</h3>
                <p>{this.props.description}</p>
                <div className={'drawercontent'} style={this.state.drawercontentstyle}>{this.props.drawerstuff}</div>
            </div>



        )


    }
}


//exports our component
export default CodeCard
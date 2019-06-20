import React, { Component } from 'react'
import Content from '../../components/content'
import './contact.css'
import EmailIcon from '../../components/email-icon'
import GitHubIcon from '../../components/github-icon'
import LinkedInIcon from '../../components/linkedin-icon'
import SignalIcon from '../../components/signal-icon'
class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.emailToggle = this.emailToggle.bind(this)
        this.emailColor = this.emailColor.bind(this)
        this.githubToggle = this.githubToggle.bind(this)
        this.githubColor = this.githubColor.bind(this)
        this.linkedInToggle = this.linkedInToggle.bind(this)
        this.linkedInColor = this.linkedInColor.bind(this)
        this.signalToggle = this.signalToggle.bind(this)
        this.signalColor = this.signalColor.bind(this)
        this.state = {
            IconWidth: '94px',
            IconHeight: '94px',
            emailSelected: false,
            githubSelected: false,
            linkedInSelected: false,
            signalSelected: false,

        }



    }
    emailToggle() {
        if(this.state.emailSelected){
            this.setState({emailSelected: false})
        }else{
            this.setState({emailSelected: true})
        }
    }
    emailColor(){
        let bgcolor = '#0077b7'
        if(this.state.emailSelected){
            bgcolor = 'chartreuse'
        }else {
            bgcolor = '#0077b7'
        }
            return (bgcolor)
        
    }
    githubToggle() {
        if(this.state.githubSelected){
            this.setState({githubSelected: false})
        }else{
            this.setState({githubSelected: true})
        }

    }
    githubColor(){
        let bgcolor = '#0077b7'
        if(this.state.githubSelected){
            bgcolor = 'chartreuse'
        }else {
            bgcolor = '#0077b7'
        }
            return (bgcolor)
        
    }
    linkedInToggle (){
        if(this.state.linkedInSelected){
            this.setState({linkedInSelected: false})
        }else{
            this.setState({linkedInSelected: true})
        }
  
    }

    linkedInColor(){
        let bgcolor = '#0077b7'
        if(this.state.linkedInSelected){
            bgcolor = 'chartreuse'
        }else {
            bgcolor = '#0077b7'
        }
            return (bgcolor)
    }
    signalToggle (){
        if(this.state.signalSelected){
            this.setState({signalSelected: false})
        }else{
            this.setState({signalSelected: true})
        }
    }
    signalColor() {
        let bgcolor = '#0077b7'
        if(this.state.signalSelected){
            bgcolor = 'chartreuse'
        }else {
            bgcolor = '#0077b7'
        }
            return (bgcolor)

    }
    render() {
        let contactcontent = [
 




                      
<div class={'container'} id={'contact-box'} style={{padding: 7}}>
                            <div id={'contact-menu'}>
                            <EmailIcon bg={this.emailColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.emailToggle}/>
                            <GitHubIcon bg={this.githubColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.githubToggle}/>
                            <LinkedInIcon bg={this.linkedInColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.linkedInToggle}/>
                            <SignalIcon bg={this.signalColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.signalToggle}/>

                            </div>

                            <div id={'emailform'}>
                            <input class={'contactinput'} id={'name'} placeholder={'First and Last Name'}/><br />
                            <input class={'contactinput'} id={'org'} placeholder={'Company or Organization'}/><br />
                            <input class={'contactinput'} id={'emailinput'} placeholder={'Contact Email'}/><br />
                            <input class={'contactinput'} id={'phoneinput'} placeholder={'Contact Phone Number'}/><br />
                            <input class={'contactinput'} id={'messageinput'} placeholder={'Your Message'}/><br />
                            <button class={'btn'} id={'formsubmit'}>button</button></div>

                            
     
                        
                    </div>
        ]
        return (
            <div>

            <Content title={'Contact'} contenthtml={<div style={{padding: 7}}>
            <div id={'contact-menu'}>
                            <EmailIcon bg={this.emailColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.emailToggle}/>
                            <GitHubIcon bg={this.githubColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.githubToggle}/>
                            <LinkedInIcon bg={this.linkedInColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.linkedInToggle}/>
                            <SignalIcon bg={this.signalColor()} w={this.state.IconWidth} h={this.state.IconHeight} onClick={this.signalToggle}/>

                            </div>


           </div> }/>
</div>
        )

    }
}

export default ContactForm
import React, { Component } from 'react'
import './contact.css'

class Contact extends Component {
    constructor(props) {
        super(props)
    this.formSubmit = this.formSubmit.bind(this)
    }
    formSubmit(event){
        event.preventDefault()
    }
    render() {


        return (<div>
            <div id='contact-info'>
                <h1>Public Profiles</h1>
                <br />
                <h2>Github:<a href='https://github.com/abiggers'> https://github.com/abiggers</a></h2>

                <h2>LinkedIn: <a href={'https://www.linkedin.com/in/alex-biggers/'}>https://www.linkedin.com/in/alex-biggers/</a></h2>
            </div>
            <div id='contact-form'>
                <h1>Send A Message</h1>

            <div className={'container'}>
                <form id={'messageForm'}>
                <input id={'name'}  type={'text'} placeholder={'Your Name'} /><br/>
                <input id={'email'} type={'text'} placeholder={'Your Email Address'} /><br/>
                <input id={'phone'} type={'text'} placeholder={'Your Phone Number'} /><br/>
                <textarea id={'message'} placeholder={'Go ahead and type your message here.'}/><br/>
                <input type={'submit'} onClick={this.formSubmit} label={'Submit'}/>
                </form></div>
            </div>
        </div>
        )

    }
}

export default Contact
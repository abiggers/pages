import React, { Component } from 'react'
// import './bootstrap.css'
import './content.css'
import ContentMenu from './contentmenu'


class Content extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class={'container'}>
            
            
<div class={'jumbotron'}>
<div  id={'title'}><span id={'title-text'}>{this.props.title}</span></div>
<div>{this.props.contenthtml}</div>

</div>

</div>
        )
    }
}

export default Content
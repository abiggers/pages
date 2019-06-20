import React, { Component } from 'react'


class EmailIcon extends Component {
   constructor(props) {
      super(props)

   }



   render() {


      return (
         <div>
            <svg


               xmlns="http://www.w3.org/2000/svg"
               width={this.props.w}
               height={this.props.h}
               viewBox="0 0 382 382"
               id="email-icon"
               onClick={this.props.onClick}>
               <g
                  id="layer2">
                  <path
                     style={{ fill: this.props.bg, strokeWidth: 0.41557592 }}
                     d="M 347.445,0 H 34.555 C 15.471,0 0,15.471 0,34.555 V 347.444 C 0,366.529 15.471,382 34.555,382 H 347.444 C 366.529,382 382,366.529 382,347.444 V 34.555 C 382,15.471 366.529,0 347.445,0 Z"
                     id="path2"
                  />
               </g>
               <g
                  id="layer1"
                  transform="translate(-24.94643,-66.056549)">
                  <rect
                     style={{ opacity: 0.98999999, fill: '#ffffff', stroke: '#000000', strokeWidth: 0 }}
                     id="rect1400"
                     width="315"
                     height="245"
                     x="56"
                     y="130" />
                  <path
                     style={{ fill: '#ffffff', stroke: this.props.bg, strokeWidth: 10 }}
                     d="M 55,120 217,265 365,125 v 0"
                     id="path1402" />


               </g>
            </svg>

         </div>
      )
   }
}
export default EmailIcon

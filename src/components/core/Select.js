import React, { Component } from 'react';

// class SelectBox extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidUpdate(){
//     document.getElementById("mySelect").value=this.props.optionselect;
//   }

//   render () {
//     const { options } = this.props;

//     let optionList = (options!==undefined ? options.length > 0 : false )
//     	&& options.map((item, i) => {
//       return (
//         <option key={i} value={item.id}>{item.name}</option>
//       )
//     }, this);

//     return (
//       <div>
//         <select id="mySelect" onChange={this.onSelect}>
//         {/* <select id="mySelect" onChange={()=> {
//             selectBoxValue2();
//         }}> */}
//           {optionList}
//         </select>
//       </div>
//     );
//   }

//   onSelect = (event) => {
//     //console.log("OnTrigger");
//     let value = document.getElementById("mySelect") ? document.getElementById("mySelect").value : "";
//     this.props.onOptionChanged(value);
//     //this.props.onOptionChanged(selectBoxValue())
//     event.preventDefault();
// }

// }

// export default SelectBox;

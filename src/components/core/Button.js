import "./../styles/button.css";
import React from "react";

const Button = ({label = 'label', clickHandler=()=>{}}) => {
    return (
      <button className="primary-button" onClick={clickHandler}> 
        <span className="button-text">{label}</span>
      </button>
    );
}

export default Button


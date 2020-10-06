import React from 'react';

const Input = props => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}</label><br></br>
            <input
                className="form-input"
                id={props.name}
                name={props.name}
                type={props.type}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default Input;

import React from 'react'

import classes from './CustomerInput.css'

const customerInput = (props) => (
    <div className={classes.CustomerInput}>
        <label>Don't be shy, Tell me your name.</label><br />
        &#8594; <input type='text' value={props.valueCustomerInput} placeholder="Start Typing..." autoFocus required onChange={props.customerName}></input><br />
    </div>
);

export default customerInput;
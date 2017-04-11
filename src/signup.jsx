import React from 'react';

// Sign up page, can add any input box if needed

export default class Form extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="sign-up-right">
                <h3 className="sign-up-title">Sign Up</h3>
                <div className="sign-up-field">
                    <p className="sign-up-label">Email</p>
                    <input className="sign-up-text" type="text" />
                </div>
                <div>
                    <p className="sign-up-field">Address</p>
                    <input className="sign-up-text" type="text" />
                </div>
                <div>
                    <p className="sign-up-field">Zipcode</p>
                    <input className="sign-up-text" type="text" />
                </div>
                <div className="sign-up-field">
                    <p className="sign-up-label">Password</p>
                    <input className="sign-up-text" type="password" />
                </div>
                <div className="sign-up-field">
                    <p className="sign-up-label">Confirm password</p>
                    <input className="sign-up-text" type="password" />
                </div>
                <div>
                    <button className="sign-up-button">Sign Up</button>
                </div>
            </div>
        );
    }
}

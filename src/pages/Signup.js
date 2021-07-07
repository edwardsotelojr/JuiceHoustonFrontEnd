import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/authActions";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const {name, email, password, password2 } = this.state;
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        };
        this.props.signup(newUser, this.props.history);
    };

    render(){
        const {errors} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    placeholder="name"
                                    //error={errors.name}
                                    id="name"
                                    type="text"
                                />
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    placeholder="email"
                                    //error={errors.email}
                                    id="email"
                                    type="text"
                                />
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    placeholder="password"
                                    //error={errors.name}
                                    id="password"
                                    type="text"
                                />
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    //error={errors.name}
                                    id="password2"
                                    placeholder="repeat password"
                                    type="text"
                                />
                            </div>
                            <div>
                                <button 
                                    type="submit"
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}> Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { signup }
)(withRouter(Signup));
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../actions/authActions";

class Signin extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        const userData = {
            email, password
        };
        this.props.signin(userData);
        
    };

    render() {
        const { errors } = this.state;
        return(
            <form onSubmit={this.onSubmit}>
            <input type="text" onChange={this.onChange} id="email" ></input>
            <input type="text" onChange={this.onChange} id="password"></input>
            <Link to="/signUp" >New Member?</Link>
            <button type="submit">Sign in</button>
        </form>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { signin })(withRouter(Signin));
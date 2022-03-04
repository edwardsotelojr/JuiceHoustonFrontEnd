import { connect } from 'react-redux'
import Checkout from '../pages/Checkout'
import {placeOrder} from '../actions/orderActions'
import { signinAtCheckout, signin } from "../actions/authActions"

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return{
        placeOrder: (order) => dispatch(placeOrder(order)),
        signinAtCheckout: (token) => dispatch(signinAtCheckout(token))
        }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout)

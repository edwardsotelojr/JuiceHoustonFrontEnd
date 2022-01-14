import { connect } from 'react-redux'
import Checkout from '../pages/Checkout'
import {placeOrder} from '../actions/orderActions'
import { signinAtCheckout } from "../actions/authActions"

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return{
        placeOrder: (order) => dispatch(placeOrder(order)),
        signinAtCheckout: (user) => dispatch(signinAtCheckout(user))
        }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout)

import { connect } from 'react-redux'
import Checkout from '../pages/Checkout'
import { signinAtCheckout } from "../actions/authActions"

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return{
        signinAtCheckout: (token) => dispatch(signinAtCheckout(token))
        }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout)

import { connect } from 'react-redux'
import Checkout from '../pages/Checkout'

const mapStateToProps = (state) => ({
    user: state.auth.user
});


export default connect(
    mapStateToProps,
    null
)(Checkout)

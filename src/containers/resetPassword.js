import { connect } from 'react-redux'
import resetPassword from '../pages/resetPassword'

const mapStateToProps = (state) => ({
    email: state.auth.user.email,
    phone: state.auth.user.phone
});


export default connect(
    mapStateToProps,
    null
)(resetPassword)

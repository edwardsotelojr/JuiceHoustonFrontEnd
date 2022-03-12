import { connect } from 'react-redux'
import resetPassword from '../pages/resetPassword'
import { userUpdated } from '../actions/authActions';

const mapStateToProps = (state) => ({
    email: state.auth.user.email,
    phone: state.auth.user.phone
});

const mapDispatchToProps = (dispatch) => {
    return{
    //userUpdated: (token, updatedUser) => dispatch(userUpdated(token, updatedUser))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(resetPassword)

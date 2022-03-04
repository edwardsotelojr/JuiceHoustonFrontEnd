import { connect } from 'react-redux'
import EditUser from '../pages/EditUser'
import { userUpdated } from '../actions/authActions';

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return{
    userUpdated: (token, updatedUser) => dispatch(userUpdated(token, updatedUser))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser)

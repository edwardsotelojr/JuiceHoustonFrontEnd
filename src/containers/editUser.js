import { connect } from 'react-redux'
import EditUser from '../pages/EditUser'
import { editUser } from '../actions/authActions';

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return{
    editUser: (user) => dispatch(editUser(user))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser)

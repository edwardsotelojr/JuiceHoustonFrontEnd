import { connect } from 'react-redux'
import Signup from '../components/Signup'
import { signup } from '../actions/authActions';

const mapDispatchToProps = (dispatch) => {
    return{
    signup: (userData) => dispatch(signup(userData)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Signup)
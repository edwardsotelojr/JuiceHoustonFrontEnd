import { connect } from 'react-redux'
import Verify from '../pages/Verify'
import { setCurrentUser, verify } from '../actions/authActions';

const mapDispatchToProps = (dispatch) => {
    return{
        setCurrentUser: (user) =>
        dispatch(setCurrentUser(user))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Verify)

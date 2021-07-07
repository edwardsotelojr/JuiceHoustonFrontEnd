import { connect } from 'react-redux'
import User from '../pages/User'
const mapStateToProps = (state) => {console.log(state);
    return ({
        user: state.auth.user,
    })
};



export default connect(
    mapStateToProps,
    null
)(User)

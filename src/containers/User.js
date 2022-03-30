import { connect } from 'react-redux'
import User from '../pages/User'

const mapStateToProps = (state) => {
    return ({
        user: state.auth
    })
};

export default connect(
    mapStateToProps,
    null
)(User)

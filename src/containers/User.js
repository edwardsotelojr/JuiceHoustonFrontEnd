import { connect } from 'react-redux'
import User from '../pages/User'
import { getUserOrders } from '../actions/orderActions';

const mapStateToProps = (state) => {console.log("state ", state);
    return ({
        user: state.auth.user,
        userOrders: state.order.userOrders,
        loading: state.order.loading
    })
};

const mapDispatchToProps = (dispatch) => {
    return{
        getUserOrders: (user_id) => 
        dispatch(getUserOrders(user_id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)

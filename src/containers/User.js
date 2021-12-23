import { connect } from 'react-redux'
import User from '../pages/User'
import { getUserOrders, getDrink } from '../actions/orderActions';

const mapStateToProps = (state) => {console.log("state ", state);
    return ({
        user: state.auth.user,
        userOrders: state.order.userOrders,
        loading: state.order.loading,

    })
};

const mapDispatchToProps = (dispatch) => {
    return{
        getUserOrders: (user_id) => 
        dispatch(getUserOrders(user_id)),
        getDrink: (drinkId) =>
        dispatch(getDrink(drinkId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)

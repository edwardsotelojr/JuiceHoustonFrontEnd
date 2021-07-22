import { connect } from 'react-redux'
import Order from '../pages/Order'
import { setOrder } from '../actions/orderActions';

const mapStateToProps = (state) => ({
    drinks: state.order.drinks,
    cost: state.order.cost,
    sizeOfOrder: state.order.sizeOfOrder,
    colors: state.order.colors,
    percentages: state.order.percentages
});

const mapDispatchToProps = (dispatch) => {
    return{
        setOrder: (drinks, cost, sizeOfOrder, colors, percentages) => 
        dispatch(setOrder(drinks, cost, sizeOfOrder, colors, percentages)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)

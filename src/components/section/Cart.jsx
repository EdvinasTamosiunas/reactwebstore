import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
    }
    
    render() {
        const {cart,increase,reduction,removeItem,total} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>Prekių krepšelyje nėra</h2>
        }else{
            return (
                <>
                    {
                        cart.map(item =>(
                            <div className="cart" key={item.id}>
                                <img src={'https://localhost:44363/api/Item/picture/'+ item.id}></img>
                                <div className="box">
                                    <div className="column">
                                        <h2>{item.name}</h2>
                                        <span>€{(item.price * item.count).toFixed(2)}</span>
                                    </div>
                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(item.id)}> - </button>
                                        <span>{item.count}</span>
                                        <button className="count" onClick={() => increase(item.id)}> + </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeItem(item.id)}>X</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">Mokėjimas</Link>
                        <h3>Iš viso: €{total}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart

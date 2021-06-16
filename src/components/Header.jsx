import React, { Component } from 'react'
import CartIcon from './svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './css/Header.css'
import {DataContext} from './Context'



export class Header extends Component {
    static contextType = DataContext;


    render() {
        const {cart} = this.context;
        return (
            <header>
                <div className="logo">
                    <h1><Link to="/">KEKSAS</Link></h1>
                </div>
                <div className="cancel">
                    <span>
                    <label><Link to="/">Atšaukti užsakymą</Link></label>
                </span>
                </div>
                
                <nav>
                    <div className="nav-cart">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <label>Krepšelis</label>
                            <img src={CartIcon} alt="" width="20"/>
                        </Link>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header

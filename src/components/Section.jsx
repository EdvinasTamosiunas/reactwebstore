import React, { Component } from 'react'
import Items from './section/Items.jsx'
import {Route} from "react-router-dom"
import Cart from './section/Cart.jsx'
import Payment from './section/Payment'


export class Section extends Component {
    render() {
        return (
            <section>
                    <Route path="/" component={Items} exact />
                    <Route path="/items" component={Items} exact  />
                    <Route path="/cart" component={Cart}  exact/>
                    <Route path="/payment" component={Payment} exact />
            </section>
        )
    }
}

export default Section

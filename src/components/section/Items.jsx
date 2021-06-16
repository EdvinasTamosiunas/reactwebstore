import React, { Component } from 'react'
import {DataContext} from '../Context'
import '../css/Item.css'
export class Items extends Component {

    static contextType = DataContext;

    render() {
        const {items,addCart} = this.context;

        return (
            <div id="item">
               {
                   items.map(item =>(
                       <div className="card" key={item.id}>
                               <img src={'https://localhost:44363/api/Item/picture/'+ item.id}/>

                           <div className="content">
                               <h3>
                                   {item.name}
                               </h3>
                               <span>€{item.price.toFixed(2)}</span><br/>
                               <span>Prekė yra {item.weighed ? 'sveriama' : 'nesveriama'}</span>
                               <button onClick={()=> addCart(item.id)}>Į krepšelį</button>
                           </div>
                       </div>
                   ))
               }
            </div>
        )
    }
}

export default Items

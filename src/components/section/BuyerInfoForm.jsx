import '../css/Payment.css'
import React, { Component } from 'react'
import {DataContext} from '../Context'
import '../css/BuyerInfoForm.css'
class BuyerInfoForm extends Component {
    static contextType = DataContext;
    

    render() {
        const {handleChange} = this.context;
        return (
            <div id = "payment">
                <form>
                    <label className="label">Vardas</label><br/>
                    <input
                        type = "text"
                        name = "firstName"
                        onChange = {handleChange}
                        /><br/>
                    <label className="label">Pavardė</label><br/>
                    <input
                        type = "text"
                        name = "lastName"
                        onChange = {handleChange}
                        /><br/>
                    <label className="label" >El. Paštas</label><br/>
                    <input
                        type = "text"
                        name = "email"
                        onChange = {handleChange}
                        /><br/>
                    <label className="label" >Telefono numeris</label><br/>
                    <input
                        type = "text"
                        name = "phone"
                        onChange = {handleChange}
                        /><br/>
                </form>       
            </div>
        )
    }
}

export default BuyerInfoForm

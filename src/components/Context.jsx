import React, { Component } from 'react'
import axios from 'axios';
export const DataContext = React.createContext();

export class DataProvider extends Component {

    constructor(){
        super()
        this.state = {
            items: [],
            images:[],
            counts: [],
            cart: [],
            total: 0,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            orderItems:[],
        };
        this.handleChange = this.handleChange.bind(this)
    }
     
    
   captureOrder = async (gatewayId, paymentMethod) =>{
    const {cart} = this.state;
    cart.forEach(item =>{
        const orderItem = {
            itemId: item.id,
            quantity: item.count
        }
        this.setState(prevState => ({
            orderItems: [...prevState.orderItems, orderItem]
          }));
    })
    const {orderItems, firstName, lastName, email, phone, total} = this.state;
    const order = {
        paymentRequest:{
            gatewayId:gatewayId,
            total: total,
            PaymentMethod: paymentMethod,
            refundable: true
        },
        buyerRequest: {
            name: firstName,
            lastName:lastName,
            email:email,
            phone:phone
        },
        orderItems: orderItems
    }
    return await axios.post('http://localhost:5000/captureOrder', order)

  }



    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    addCart = (id) =>{
        const {items, cart} = this.state;
        const check = cart.every(item =>{
            return item.id !== id
        })
        if(check){
            const data = items.filter(item =>{
                return item.id === id
            })
            this.setState({cart: [...cart,...data], })
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeItem = id =>{
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item.id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        const value = res.toFixed(2)
        this.setState({total: value})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };
    addItemCount(item){
        item["count"] = 1
        return item;
    }
    componentDidMount(){
        axios.get('https://localhost:44363/api/Item/getItem')
        .then(response =>{
            var data = response.data.map((item) => this.addItemCount(item))
            this.setState({items:data})
        })
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   clearCart = () =>{
       this.setState({cart: []})
   }

    render() {
        const {items, cart,total} = this.state;
        const {addCart,reduction,increase,removeItem,getTotal,handleChange, captureOrder,clearCart} = this;
        return (
            <DataContext.Provider 
            value={{items, addCart, cart, reduction,increase,removeItem,total,getTotal,handleChange, captureOrder, clearCart}}>
                {this.props.children}
                
            </DataContext.Provider>
        )
    }
}



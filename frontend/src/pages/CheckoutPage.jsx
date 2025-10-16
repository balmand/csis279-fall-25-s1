import { useEffect, useState } from "react";

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    useEffect(() =>{
        let cartA = JSON.parse(localStorage.getItem("cart"));
        if(!cartA){
            cartA = [];
        }
        setCart(cartA);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const cancelPurchase = () => {
        localStorage.clear();
        setCart([]);
    }
    return (
        <>
            <div>
                <h1>Items to purchase</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    cart.map((item, i)=>{
                        return(    
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>item.price</td>
                                <td><button className="btn btn-sm btn-danger">Del</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
                </table>
                <hr />
                <h3>Total: <span className="text-danger">${total.toFixed(2)}</span></h3>
                <hr />
                <div className="row">
                    <div className="col-1">
                        <button className="btn btn-success">BUY</button>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-secondary" onClick={()=> cancelPurchase()}>CANCEL</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;


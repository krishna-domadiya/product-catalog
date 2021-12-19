import React from 'react'
import products from '../products.json';
// import inventory from '../inventory.json';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromInventory } from '../redux/action';
import { useState } from 'react';

export default function Products() {

    const [validationMsg, showValidationMsg] = useState();
    const [blnGridView, changeView] = useState(1);
    const dispatch  =   useDispatch();
    const inventoryState =   useSelector(state => state.manageInventory);
    const cartState =   useSelector(state => state.manageCart);
    const addProduct = (product) => {
        const tempProduct = cartState.find((val) => val.id === product.id);
        if(tempProduct && product.max_purchase_count && tempProduct.qty == product.max_purchase_count) {
            showValidationMsg(product.id);
            //return;
        }
        else {
            dispatch(addToCart(product));
            dispatch(removeFromInventory(product));
            showValidationMsg();
        }
    }

    return (
        <div className="pt-4">
            <div style={{textAlign: "right"}}>
            {
              blnGridView ? 
              <button type='button' className="btn btn-outline-primary" onClick={ () => changeView(0)}><i className="fa fa-list"></i></button> :
              <button type='button' className="btn btn-outline-primary" onClick={ () => changeView(1)}><i className="fa fa-th-large"></i></button>
            }
            </div>
            {
                blnGridView ?
                <div className="row">
                    {
                        products.map((product) => {
                            return (
                                <>
                                    <div className="col-4 pb-3" key={product.id}>
                                        <div className="card text-center" style={{width: "18rem"}}>
                                            <div className="card-body">
                                                <h5 className="card-title">{product.title}</h5>
                                                <img className="" src={product.image} style={{height: "200px", width: "150px"}}/>
                                                <p className="card-text">{product.description.substring(0, 100)+"..."}</p>
                                                <h5 className="card-title">₹{product.price}</h5>
                                                {
                                                    inventoryState.map((val) => {
                                                        if(val.product_id === product.id && val.quantity < 5) {
                                                            return (
                                                                <span style={{color: "red"}}>Only {val.quantity} left. Hurry up.</span>
                                                            )
                                                        }
                                                    })
                                                }
                                                {
                                                    validationMsg === product.id
                                                    ?
                                                    <span style={{color: "red"}}>You cannot order more than max quantity.</span> :
                                                    ""
                                                }
                                            </div>
                                            <div className='pb-2'>
                                                <button type="button" className='btn btn-outline-primary' onClick={() => addProduct(product)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                :
                <table className="table table-hover">
                    {/* <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Ratings</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {
                            products.map((product) => {
                                return (
                                    <>
                                        <tr>
                                            <td><img src={product.image} style={{height: "50px", width: "50px"}}/></td>
                                            <td>{product.title}</td>
                                            <td>₹{product.price}</td>
                                            {/* <td>{product.rating.rate}/{product.rating.count}</td> */}
                                            <td>
                                                <button type='button' className="btn btn-outline-primary me-2" onClick={() => addProduct(product)}><i className="fa fa-plus"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

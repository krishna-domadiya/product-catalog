import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToInventory, removeFromCart, removeFromInventory } from '../redux/action';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Cart() {

    const [validationMsg, showValidationMsg] = useState();
    const state =   useSelector(state => state.manageCart);
    const dispatch = useDispatch();

    const addProduct = (product) => {
        // console.log(state);
        const tempProduct = state.find((val) => val.id === product.id);
        if(tempProduct && product.max_purchase_count && tempProduct.qty == product.max_purchase_count) {
            showValidationMsg(product.id);
        }
        else {
            dispatch(addToCart(product));
            dispatch(removeFromInventory(product));
            showValidationMsg();
        }
    }

    const removeProduct = (product) => {
        dispatch(removeFromCart(product));
        dispatch(addToInventory(product));
        showValidationMsg();
    }

    return (
        <div className="container pt-4">
            <div style={{textAlign: "right"}}>
                <NavLink to="/"><button type='button' className='btn btn-outline-primary mt-2'>Back to Shopping</button></NavLink>
            </div>
            <div className="row">
            {
                state.length ?
                state.map((product) => {
                    return (
                        <div className="col-4 pb-3">
                            <div className="card text-center" style={{width: "18rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <img src={product.image} style={{height: "200px", width: "150px"}} className='mb-3'/>
                                    {/* <p className="card-text">{product.description.substring(0,100)+"..."}</p> */}
                                    <p className='card-text'>Qty: <b>{product.qty}</b></p>
                                    <p>Total Price:<b> ₹{product.price*product.qty}</b></p>
                                    {
                                        validationMsg === product.id
                                        ?
                                        <><span style={{color: "red"}} className=''>You cannot order more than max quantity.</span><br/><br/></> :
                                        ""
                                    }
                                    <button type='button' className="btn btn-outline-primary me-2" onClick={() => addProduct(product)}><i className="fa fa-plus"></i></button>
                                    <button type='button' className="btn btn-outline-primary me-2" onClick={() => removeProduct(product)}><i className="fa fa-minus"></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <>
                    <div style={{textAlign: "center"}}>
                        <b>Your cart is empty</b>
                    </div>
                </>
            }
            </div>
            {
                state.length ?
                <div className='text-center pb-3'>
                    <span className='text-bold'><b>Subtotal:&nbsp;
                        {
                            state.reduce((sum, val) => (
                                sum += val.qty*val.price
                            ), 0)
                        }
                        </b></span><br/>
                    <button type='button' className="btn btn-outline-primary me-2 mt-1">Proceed to checkout</button>
                </div>
                :
                ""
            }
        </div>
    )
}

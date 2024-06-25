import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from '../redux/slices/productSlice'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {

    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product);
    const { price, image, title, description } = selectedProduct;
    const [count, setCount] = useState(0);

    const dispatch = useDispatch();


    useEffect(() => {
        getProductByID();
    }, []);

    const getProductByID = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        });
    };

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };

    const addBasket = () => {
        const payload = { id, price, image, title, description, count };

        if (count > 0) {
            dispatch(addToBasket(payload));
            dispatch(calculateBasket());
        } else {
            console.log("En az 1 adet seciniz!");
        }

    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '30px' }}>
            <div style={{ marginRight: '40px' }}>
                <img src={image} width={300} height={500} alt={title} />

            </div>
            <div>
                <h1 style={{ fontFamily: 'arial' }}>{title}</h1>
                <p style={{ fontFamily: 'tahoma', fontSize: '20px' }}>{description}</p>
                <h1 style={{ fontSize: '50px', fontFamily: 'tahoma', color: '#f00' }}>{price} TL</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CiCircleMinus className='cpoint' style={{ fontSize: '35px', marginRight: '10px' }} onClick={decrement} />
                    <span style={{ fontSize: '30px' }}>{count}</span>
                    <CiCirclePlus className='cpoint' style={{ fontSize: '35px', marginLeft: '10px' }} onClick={increment} />
                </div>
                <div>
                    <button className='detail-button' onClick={addBasket} style={{ marginTop: '25px' }}>Sepete Ekle</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
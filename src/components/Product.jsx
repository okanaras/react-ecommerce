import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../css/Product.css';

function Product({ product }) {
    const { id, price, image, title, description } = product;

    const navigate = useNavigate();

    return (
        <div className='card'>
            <img className='image' src={image} alt={title} />
            <div>
                <p style={{ textAlign: 'center', height: '50px' }}>{title}</p>
                <h3 style={{ textAlign: 'center' }}>{price} TL</h3>
            </div>
            <div className='flex-row'>
                <button onClick={() => navigate(`/product-details/${id}`)} className='detail-button'>Detayi Gor</button>
            </div>
        </div>
    )
}

export default Product
import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer } from './redux/slices/basketSlice';


function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())} className='drawer' sx={{ padding: '20px' }}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-between' style={{ padding: '20px' }}>
                    <img style={{ marginRight: '10px' }} src={product.image} width={50} height={50} />
                    <p style={{ width: '325px', marginRight: '10px' }}>{product.title} ({product.count})</p>
                    <p style={{ fontWeight: 'bold', width: '100px' }}>{product.price} TL</p>
                    <button className='remove-basket-button'>SIL</button>
                  </div>
                </div>
              )
            })
          }
          <div>
            <p style={{ textAlign: 'center' }}>Toplam Tutar: {totalAmount}</p>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App

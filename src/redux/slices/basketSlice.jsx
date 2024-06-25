import { createSlice } from '@reduxjs/toolkit'


const getBasketFromStorage = () => { // yuk
    const hasItem = localStorage.getItem("basket");
    if (hasItem) {
        return JSON.parse(hasItem)
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
};

const setFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
};


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find(product => product.id === action.payload.id);
            if (findProduct) {
                // daha once eklenmistir. Filter ile eklenen urunu ayir. Eklenen uruun countunu arttririp state e gonder. 
                const extractedProducts = state.products && state.products.filter(product => product.id !== action.payload.id);
                findProduct.count += action.payload.count;
                state.products = [...extractedProducts, findProduct];

                const withUpdatedProduct = state.products;
                setFromBasketToStorage(withUpdatedProduct);

            } else {
                // daha once eklenmemistir. state tekilere yeni geleni ekle ve storage a yazdir
                state.products = [...state.products, action.payload];
                const withNewProducts = state.products;

                setFromBasketToStorage(withNewProducts);
            }
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateBasket: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map((product) => {
                state.totalAmount += (product.price) * (product.count);
            })
        }
    },
});

export const { addToBasket, setDrawer, calculateBasket } = basketSlice.actions;
export default basketSlice.reducer
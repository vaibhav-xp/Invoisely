import { createContext, useState } from "react";
import { calculateAfterGSTAmount, calculateTotalAmount } from "../config/math";
import { alertSuccess } from "../config/alert";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountAfterGst, setTotalAmountAfterGst] = useState(0);

    const setProductsStore = (product) => {
        setProducts(prev => {
            const newProducts = [...prev, product];
            setTotalAmount(prev => {
                const totalAmount = calculateTotalAmount(newProducts); setTotalAmountAfterGst(calculateAfterGSTAmount(totalAmount));
                return totalAmount;
            });

            return newProducts;
        });
        alertSuccess(["Product added successfully."]);
    }

    const deleteProduct = (index) => {
        setProducts(prev => prev.filter(((_, idx) => index !== idx)))
        alertSuccess(["Product deleted successfully."]);
    }

    const deleteAllProducts = () => setProducts([]);

    return (
        <StoreContext.Provider value={{
            products,
            setProductsStore,
            totalAmount,
            totalAmountAfterGst,
            deleteProduct,
            deleteAllProducts
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
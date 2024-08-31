export const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => {
        return total + product.productQty * product.productRate;
    }, 0);
};

export const calculateAfterGSTAmount = (totalAmount) => {
    const gstRate = 0.18;
    return Number((totalAmount * (1 + gstRate)).toFixed(0));
};
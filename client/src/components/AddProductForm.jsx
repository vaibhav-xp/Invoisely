import { useState } from 'react';
import { alertSuccess } from '../config/alert';
import useStore from '../hooks/useStore';

const initialState = {
    productName: "",
    productQty: "",
    productRate: ""
}

export default function AddProductForm({ setDisplayForm }) {
    const [formState, setFormState] = useState(initialState);
    const { setProductsStore } = useStore();

    // form handle
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    // form submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formState.productName && formState.productQty && formState.productRate) {
            setProductsStore(formState);
            setFormState(initialState)
            setDisplayForm(false);
        }
    };

    // close form
    const close = (e) => {
        const { tagName, classList } = e.target;
        if (tagName === "DIV" && classList.contains('main-container')) {
            setDisplayForm(false);
        }
    };

    return (
        <div className='w-screen h-screen fixed top-0 left-0 main-container bg-[#1717174d]' onClick={close}>
            <form className="p-8 max-w-md w-full mx-auto bg-white rounded shadow-md mt-8" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>

                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={formState.productName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="productQty" className="block text-sm font-medium text-gray-600">
                        Product Qty
                    </label>
                    <input
                        type="number"
                        id="productQty"
                        name="productQty"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={formState.productQty}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="productRate" className="block text-sm font-medium text-gray-600">
                        Product Rate
                    </label>
                    <input
                        type="number"
                        id="productRate"
                        name="productRate"
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        value={formState.productRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

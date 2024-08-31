import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { alertSuccess } from "../config/alert";
import useStore from "../hooks/useStore";
import { postProductFn } from "../services";


export default function ProductDisplay() {
    const navigate = useNavigate();
    const { products, totalAmount, totalAmountAfterGst, deleteProduct, deleteAllProducts } = useStore();

    const { mutate: postProduct } = useMutation(postProductFn, {
        onSuccess: ({ data }) => {
            alertSuccess(data.message);
            setTimeout(() => {
                navigate(`/invoice/${data?.data?.invoice_id}`)
                deleteAllProducts();
            }, 2000)
        },
        onError: (error) => alertError(error)
    })

    const toInvoicePage = () => {
        postProduct({
            products,
            total_amount: totalAmount,
            after_gst_amount: totalAmountAfterGst
        })
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <div className="overflow-x-auto">
                <table className="w-full min-w-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Product Quantity</th>
                            <th className="py-2 px-4 border-b">Product Rate</th>
                            <th className="py-2 px-4 border-b">Total Amount</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b text-center">{item?.productName}</td>
                                <td className="py-2 px-4 border-b text-center">{item?.productQty}</td>
                                <td className="py-2 px-4 border-b text-center">₹ {item?.productRate}</td>
                                <td className="py-2 px-4 border-b text-center">₹ {item?.productQty * item.productRate}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => deleteProduct(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={toInvoicePage}>
                    Generate Invoice
                </button>
                <div>
                    <p className="text-start text-sm sm:text-end ">
                        <span className="font-bold">Total Amount: </span>&#8377; {totalAmount}
                    </p>
                    <p className="text-start text-sm sm:text-end ">
                        <span className="font-bold">Grant Total Amount (GST 18%): </span>&#8377; {totalAmountAfterGst}
                    </p>
                </div>
            </div>
        </div>
    );
}

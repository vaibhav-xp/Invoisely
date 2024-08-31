import { useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { getProductByIdFn } from "../services";
import { alertError, alertSuccess } from "../config/alert";
import logo from './../assets/logo.png';

export default function Invoice() {
    const navigate = useNavigate();
    const { _id } = useParams();
    const pdfRef = useRef(null);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getProductByIdFn(_id),
        queryKey: ["get-invoice-by-id", _id],
        enabled: !!_id,
        onError: () => {
            alertError(["Invoice Id is invalid."])
            setTimeout(() => {
                navigate("/")
            }, 10000)
        }
    });

    const invoice = data?.data?.data?.invoice?.[0];

    // generate pdf
    const generatePDF = useReactToPrint({
        content: () => pdfRef.current,
        documentTitle: `invoice-${_id}`,
        onBeforePrint: () => {
            if (!invoice) {
                alertError(["Invoice data not available"]);
            }
        },
        onAfterPrint: () => alertSuccess(["Data saved in PDF"]),
    });

    if (isLoading) {
        return <div className="bg-gray-900 text-white min-h-screen w-full py-8 px-4 text-center">Loading...</div>;
    }

    if (isError || !invoice) {
        return (
            <div className="bg-gray-900 min-h-screen w-full py-8 px-4">
                <p className="text-red-500 text-center">
                    Error: Invoice data not available or invalid Invoice Id.
                </p>
                <button
                    className="fixed top-8 left-8 bg-red-500 p-4 px-8 text-white rounded-full transition-transform transform hover:scale-105"
                    onClick={() => navigate("/")}
                >
                    &larr; Back
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen w-full py-8 px-4">
            <button
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 p-4 px-8 rounded-full font-bold text-xl text-white shadow-lg focus:outline-none focus:ring focus:border-blue-300 transition-transform transform hover:scale-105"
                onClick={generatePDF}
            >
                Download &#x2913;
            </button>
            <button
                className="fixed top-8 left-8 bg-red-500 p-4 px-8 text-white rounded-full transition-transform transform hover:scale-105"
                onClick={() => navigate("/")}
            >
                &larr; Back
            </button>
            <div
                className="min-w-sm max-w-4xl w-full bg-white mx-auto p-4 text-gray-600 flex flex-col rounded-xl overflow-x-auto"
                ref={pdfRef}
            >
                <div className="flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold">Invoisely</span> <br />
                        <span>
                            <span className="font-bold">Invoice Id: </span>
                            {_id}
                        </span>
                    </p>
                    <img
                        src={logo}
                        alt="logo"
                        className="grayscale h-20"
                    />
                </div>

                <table className="w-full min-w-md mt-12 mb-8">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Product Quantity</th>
                            <th className="py-2 px-4 border-b">Product Rate</th>
                            <th className="py-2 px-4 border-b">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.products.map((item, index) => (
                            <tr key={index}>
                                <td className="py-4 px-4 border-b text-center">
                                    {item.productName}
                                </td>
                                <td className="py-4 px-4 border-b text-center">
                                    {item.productQty}
                                </td>
                                <td className="py-4 px-4 border-b text-center">
                                    ₹ {item.productRate}
                                </td>
                                <td className="py-4 px-4 border-b text-center">
                                    ₹ {item.productQty * item.productRate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="w-full sm:w-80 self-end text-gray-600 px-8">
                    <p className="flex justify-between">
                        <span className="font-bold">Total</span>{" "}
                        <span>INR {invoice.total_amount}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>GST</span> <span>18%</span>
                    </p>
                    <p className="flex justify-between my-2 py-4 border-t border-b">
                        <span className="font-bold">Grand Total</span>{" "}
                        <span className="text-blue-800">
                            ₹ {invoice.after_gst_amount}
                        </span>
                    </p>
                    <p className="pb-12 text-end">
                        Valid Till: {new Date(invoice.valid_date).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-8 bg-gray-950 text-white rounded-full px-16 py-8 mx-auto text-sm">
                    <p className="font-bold">Term and Conditions: </p>
                    <p>
                        We are happy to supply and further information you may need and
                        trust that you call on us to fill your order. Which will receive
                        your form prompt and careful attention.
                    </p>
                </div>
            </div>
        </div>
    );
}

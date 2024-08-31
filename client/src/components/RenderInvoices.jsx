import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { alertError } from "../config/alert";
import { getProductFn } from "../services";

const RenderIvoices = () => {
  const { data, isLoading } = useQuery({
    queryFn: getProductFn,
    queryKey: "get-product-fn",
    onError: (error) => alertError(error),
  });

  const invoices = data?.data?.data?.invoice;

  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (!invoices || invoices.length === 0) {
    return <div className="text-white text-center">No invoices available.</div>;
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mt-8">
      <h1 className="text-2xl font-bold pb-4 text-gray-800">
        Invoices History
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Invoice Id</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Grand Total</th>
              <th className="py-2 px-4 border-b">Link</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{item._id}</td>
                <td className="py-2 px-4 border-b text-center">
                  {getDate(item.invoice_date)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ₹ {item.after_gst_amount}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <Link
                    to={`/invoice/${item._id}`}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Download
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenderIvoices;

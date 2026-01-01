import { useState } from "react";
import Invoice from "./components/Invoice/Invoice";
import InvoiceForm from "./components/Form/InvoiceForm";
import { generatePDF } from "./utils/generatePDF";
import { formatDate } from "./utils/formatDate";

export default function App() {
  const [data, setData] = useState({
    type: "quotation",
    customer: "ABU SAYED",
    date: formatDate(),
    serial: "001",
    items: [
      { name: "Intel Core i5 12th Gen Processor", qty: 1, price: 25000 }
    ]
  });

  return (
    <div className="container-fluid">

      <div className="container">
        {/* Form Section - Responsive Width */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow-sm">
              <div className="card-body p-3 p-md-4">
                <InvoiceForm data={data} setData={setData} />
              </div>
            </div>
          </div>
        </div>

        {/* Button Section - Full width on mobile, auto on larger screens */}
        <div className="row justify-content-center my-3 my-md-4">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div className="d-grid">
              <button
                className="btn btn-primary btn-lg shadow"
                onClick={() => generatePDF(data)}
              >
                <i className="bi bi-download me-2"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 my-md-5" />

        {/* Preview Label */}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-lg-10">
            <h4 className="text-center text-md-start mb-3">
              Preview
            </h4>
          </div>
        </div>

        {/* Invoice Display Section - Responsive Width */}
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-12 col-lg-10">
            <div className="card shadow">
              <div className="card-body p-3 p-sm-4 p-md-5">
                <Invoice data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
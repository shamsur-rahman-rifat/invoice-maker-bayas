import { useState, useEffect, useRef } from "react";
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

  // Scaling logic for Invoice Preview
  const [scale, setScale] = useState(1);
  const invoiceContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (invoiceContainerRef.current) {
        const containerWidth = invoiceContainerRef.current.offsetWidth;
        const invoiceWidth = 760; // Fixed width from invoice.css

        if (containerWidth < invoiceWidth) {
          const newScale = (containerWidth - 30) / invoiceWidth; // 30px buffer
          setScale(newScale);
        } else {
          setScale(1);
        }
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">

      <div className="container">
        {/* Header */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-xl-10 text-center">
            <h2 className="fw-bold text-dark">Invoice Maker</h2>
            <p className="text-muted">Create and download invoices or quotations</p>
          </div>
        </div>

        {/* Form Section - Responsive Width */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-3 p-md-4 p-lg-5">
                <InvoiceForm data={data} setData={setData} />
              </div>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="row justify-content-center my-3 my-md-4">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="d-grid">
              <button
                className="btn btn-primary btn-lg shadow rounded-pill"
                onClick={() => generatePDF(data)}
              >
                <i className="bi bi-download me-2"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5 opacity-25" />

        {/* Preview Label */}
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-lg-10 col-xl-9">
            <h4 className="text-center text-md-start mb-3 text-secondary">
              Live Preview
            </h4>
          </div>
        </div>

        {/* Invoice Display Section - Responsive with Scaling */}
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-12 col-lg-10 col-xl-9" ref={invoiceContainerRef}>
            <div className="d-flex justify-content-center overflow-hidden">
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  marginBottom: scale < 1 ? `-${(1 - scale) * 100}%` : "0" // Reduce bottom gap when scaled
                }}
              >
                <Invoice data={data} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
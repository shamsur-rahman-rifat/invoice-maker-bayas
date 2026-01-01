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
    <InvoiceForm data={data} setData={setData} />

    <div className="d-flex justify-content-center my-4">
      <button
        className="btn btn-primary"
        onClick={() => generatePDF(data)}
      >
        Download PDF
      </button>
    </div>

    <Invoice data={data} />
  </div>
);
}

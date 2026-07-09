import "./invoice.css";
import logo from "../../assets/bayas-logo.png";
import seal from "../../assets/bayas-seal.png";


export default function Invoice({ data }) {
  const isInvoice = data.type === "invoice";
  const year = new Date().getFullYear().toString().slice(-2);
  const docCode = data.type === "invoice" ? "IN" : "QU";
  const serial = data.serial
    ? String(data.serial).padStart(3, "0")
    : "___";
  const refNo = `BS/${docCode}/${year}/${serial}`;
  const total = data.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div id="invoice">
      <div className="invoice-page">
      <div className="header">
      <div className="company">
        <img src={logo} alt="BAYAS Logo" className="logo" />
        <div>
          <h1>BAYAS</h1>
          <p className="tagline">Fast. Friendly. Reliable.</p>
        </div>
      </div>

        <div className="right">
          <p> 
            House - 216, East Chanpara, Uttarkhan, Dhaka - 1230<br />
            Phone: 01712644590, 01715618953<br />
            E-mail: support@bayas.com.bd<br />    
            Website: bayas.com.bd
          </p>
        </div>
      </div>

      <hr />

      <div className="info">
        <div>
          <p><strong>TO,</strong></p>
          <p><strong>{data.customer}</strong></p>
        </div>

        <div>
          <p className="pc">
            <strong>
              {data.type === "invoice" ? "Invoice No:" : "Quotation No:"}
            </strong>{" "}
            {refNo}
          </p>          
          <p><strong>DATE: {data.date}</strong></p>
        </div>
      </div>

      <h3 className="center underline">{isInvoice ? "INVOICE" : "QUOTATION"}</h3>

      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Item Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total Price</th>
          </tr>
        </thead>

        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td className="desc">{item.name}</td>
              <td>01</td>
              <td>{item.price.toLocaleString()}</td>
              <td>{(item.qty * item.price).toLocaleString()}</td>
            </tr>
          ))}

          <tr className="total-row">
            <td colSpan="3"></td>
            <td>TOTAL</td>
            <td>{total.toLocaleString()}.00</td>
          </tr>
        </tbody>
      </table>

      <p className="validity">
          {isInvoice ? "": "VALIDITY: 3 DAYS FROM THE DATE OF QUOTATION"}
      </p>

      <div className="signature">
        <p><strong>BAYAS</strong></p>
        <p><strong>Proprietor</strong></p>
        <p>Abu Syeed Sarker</p>
        <p>Mobile: 01712644590</p>
        <p>E-mail: support@bayas.com.bd</p>
      </div>
      <img src={seal} alt="Company Seal" className="invoice-seal" />
    </div>
  </div>
  );
}

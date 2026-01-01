import { Button, Form, Card, Row, Col } from "react-bootstrap";

export default function InvoiceForm({ data, setData }) {
  const updateItem = (index, field, value) => {
    const updated = [...data.items];
    updated[index][field] = value;
    setData({ ...data, items: updated });
  };
  
  const addItem = () => {
    setData({
      ...data,
      items: [...data.items, { name: "", qty: 1, price: 0 }]
    });
  };
  
  const removeItem = (index) => {
    const updated = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: updated });
  };
  
  return (
    <div className="container my-3 my-md-4">
      <h4 className="mb-3 mb-md-4">Invoice Input</h4>
      
      {/* Form Header Section - Responsive Grid */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <Form.Group>
            <Form.Label>Document Type</Form.Label>
            <Form.Select
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
            >
              <option value="quotation">Quotation</option>
              <option value="invoice">Invoice</option>
            </Form.Select>
          </Form.Group>
        </div>
        
        <div className="col-12 col-md-6">
          <Form.Group>
            <Form.Label>Customer Name</Form.Label>
            <Form.Control
              placeholder="Customer Name"
              value={data.customer}
              onChange={(e) => setData({ ...data, customer: e.target.value })}
            />
          </Form.Group>
        </div>
        
        <div className="col-12">
          <Form.Group>
            <Form.Label>
              {data.type === "invoice"
                ? "Invoice Serial Number"
                : "Quotation Serial Number"}
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter serial (e.g. 001)"
              value={data.serial}
              onChange={(e) => setData({ ...data, serial: e.target.value })}
            />
          </Form.Group>
        </div>
      </div>

      {/* Items Section Header */}
      <h5 className="mb-3">Items</h5>
      
      {/* Item Cards - Fully Responsive */}
      {data.items.map((item, i) => (
        <div key={i} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="row g-2 g-md-3 align-items-end">
              {/* Item Description - Full width on mobile */}
              <div className="col-12">
                <Form.Group>
                  <Form.Label className="small fw-semibold">Item Description</Form.Label>
                  <Form.Control
                    placeholder="Enter item description"
                    value={item.name}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                  />
                </Form.Group>
              </div>
              
              {/* Quantity - Smaller on mobile */}
              <div className="col-4 col-sm-3 col-md-2">
                <Form.Group>
                  <Form.Label className="small fw-semibold">Qty</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateItem(i, "qty", Number(e.target.value))}
                  />
                </Form.Group>
              </div>
              
              {/* Price */}
              <div className="col-5 col-sm-4 col-md-3">
                <Form.Group>
                  <Form.Label className="small fw-semibold">Price</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(i, "price", Number(e.target.value))}
                  />
                </Form.Group>
              </div>
              
              {/* Total - Hidden on extra small screens */}
              <div className="col-3 col-sm-3 col-md-2 d-none d-sm-block">
                <Form.Group>
                  <Form.Label className="small fw-semibold">Total</Form.Label>
                  <div className="fw-bold text-primary">
                    {(item.qty * item.price).toFixed(2)}
                  </div>
                </Form.Group>
              </div>
              
              {/* Remove Button - Full width on mobile */}
              <div className="col-12 col-sm-12 col-md-5 mt-2 mt-md-0">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-100 w-sm-auto"
                    onClick={() => removeItem(i)}
                  >
                    Remove Item
                  </Button>
                </div>
              </div>
              
              {/* Mobile-only total row */}
              <div className="col-12 d-sm-none">
                <div className="d-flex justify-content-between border-top pt-2">
                  <span className="small fw-semibold">Item Total:</span>
                  <span className="fw-bold text-primary">
                    {(item.qty * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Add Item Button - Full width on mobile */}
      <div className="d-grid d-sm-block mb-4">
        <Button variant="success" onClick={addItem}>
          + Add Item
        </Button>
      </div>
      
      {/* Total Summary Card */}
      <div className="card bg-light border-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-6 text-end">
              <h5 className="mb-0">Grand Total:</h5>
            </div>
            <div className="col-6">
              <h5 className="mb-0 text-primary">
                {data.items.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Button, Form } from "react-bootstrap";

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
    <div className="container my-4">
      <h4 className="mb-3">Invoice Input</h4>
      
      <Form.Group className="mb-3">
        <Form.Label>Document Type</Form.Label>
        <Form.Select
          value={data.type}
          onChange={(e) =>
            setData({ ...data, type: e.target.value })
          }
        >
          <option value="quotation">Quotation</option>
          <option value="invoice">Invoice</option>
        </Form.Select>
      </Form.Group>            

      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          placeholder="Customer Name"
          value={data.customer}
          onChange={(e) =>
            setData({ ...data, customer: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {data.type === "invoice"
            ? "Invoice Serial Number"
            : "Quotation Serial Number"}
        </Form.Label>

        <Form.Control
          type="number"
          placeholder="Enter serial (e.g. 001)"
          value={data.serial}
          onChange={(e) =>
            setData({ ...data, serial: e.target.value })
          }
        />
      </Form.Group>

      {data.items.map((item, i) => (
        <div key={i} className="row mb-2">
          <div className="col-md-5">
            <Form.Control
              placeholder="Item Description"
              value={item.name}
              onChange={(e) => updateItem(i, "name", e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <Form.Control
              type="number"
              value={item.qty}
              onChange={(e) =>
                updateItem(i, "qty", Number(e.target.value))
              }
            />
          </div>

          <div className="col-md-3">
            <Form.Control
              type="number"
              value={item.price}
              onChange={(e) =>
                updateItem(i, "price", Number(e.target.value))
              }
            />
          </div>

          <div className="col-md-2">
            <Button
              variant="danger"
              onClick={() => removeItem(i)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button variant="success" onClick={addItem}>
        + Add Item
      </Button>
    </div>
  );
}

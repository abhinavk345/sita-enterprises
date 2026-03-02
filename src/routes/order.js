// routes/order.js
import { generateInvoice } from "../utils/generateInvoice.js";

app.post("/api/orders", async (req, res) => {
  const order = req.body;

  // 1. Save order to DB (pseudo)
  // const savedOrder = await Order.create(order);

  // 2. Generate invoice
  const invoiceUrl = await generateInvoice({
    ...order,
    invoiceNo: Date.now(),
    upiId: "sitaenterprises@upi",
    gstPercent: 18,
    gstAmount: order.subTotal * 0.18,
    grandTotal: order.subTotal * 1.18,
  });

  // 3. Return invoice URL
  res.json({ success: true, invoiceUrl });
});
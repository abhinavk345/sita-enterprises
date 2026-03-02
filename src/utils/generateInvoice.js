// utils/generateInvoice.js
import PDFDocument from "pdfkit";
import fs from "fs";
import QRCode from "qrcode";
import path from "path";

export async function generateInvoice(order) {
  const fileName = `INV-${order.invoiceNo}.pdf`;
  const filePath = path.join("public/invoices", fileName);

  const doc = new PDFDocument({ size: "A4", margin: 40 });
  doc.pipe(fs.createWriteStream(filePath));

  // Logo (put your logo in public/logo.png)
  doc.image("public/logo.png", 40, 30, { width: 80 });
  doc.fontSize(20).text("SITA ENTERPRISES", 140, 40);
  doc.fontSize(10).text("Khad, Beej, Iron Rod, Balu, Gitti, Cement Supplier");

  // Shop details
  doc.moveDown().fontSize(10);
  doc.text("Owner: Pramod Sah");
  doc.text("Mobile: 7368963831, 8292756850");
  doc.text("Email: khadbeejsitaenterprises@gmail.com");
  doc.text("Address: Ward No. 10, Darhar, Nauhatta, Saharsa, PIN-852123");
  doc.text(`GSTIN: ${order.gstin || "NA"}`);

  // Invoice meta
  doc.moveDown();
  doc.text(`Invoice No: ${order.invoiceNo}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.text(`Customer: ${order.customerName}`);

  // Items table
  doc.moveDown().fontSize(11).text("Items:");
  order.items.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.name} | ₹${item.rate} x ${item.qty} = ₹${item.total}`);
  });

  // Totals
  doc.moveDown();
  doc.text(`Sub Total: ₹${order.subTotal}`);
  doc.text(`GST (${order.gstPercent}%): ₹${order.gstAmount}`);
  doc.text(`Grand Total: ₹${order.grandTotal}`);

  // UPI QR
  const upiLink = `upi://pay?pa=${order.upiId}&pn=Sita%20Enterprises&am=${order.grandTotal}&cu=INR`;
  const qrDataUrl = await QRCode.toDataURL(upiLink);
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");
  doc.image(qrBuffer, { fit: [100, 100], align: "right" });

  doc.end();

  return `/invoices/${fileName}`;
}
package com.maa.sita.enterprises.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.maa.sita.enterprises.entity.Order;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class InvoiceService {

    public byte[] generateInvoicePdf(Order order) throws Exception {

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();

        document.add(new Paragraph("Maa Sita Enterprises"));
        document.add(new Paragraph("Invoice"));
        document.add(new Paragraph("Order ID: " + order.getId()));
        document.add(new Paragraph("Customer Email: " + order.getEmail()));
        document.add(new Paragraph("Payment Method: " + order.getPaymentMethod()));
        document.add(new Paragraph("Status: " + order.getStatus()));
        document.add(new Paragraph("Date: " + order.getOrderDate()));

        document.close();

        return out.toByteArray();
    }
}
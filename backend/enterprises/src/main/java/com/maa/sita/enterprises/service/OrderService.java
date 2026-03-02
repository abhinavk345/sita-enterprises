package com.maa.sita.enterprises.service;

import com.maa.sita.enterprises.entity.Order;
import com.maa.sita.enterprises.repository.OrderRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final InvoiceService invoiceService;
    private final OrderRepository orderRepository;
    private final JavaMailSender mailSender;

    public OrderService(InvoiceService invoiceService, OrderRepository orderRepository, JavaMailSender mailSender) {
        this.invoiceService = invoiceService;
        this.orderRepository = orderRepository;
        this.mailSender = mailSender;
    }

    public void placeOrder(String email, String paymentMethod) throws Exception {

        Order order = new Order();
        order.setEmail(email);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(paymentMethod.equals("COD") ? "PENDING" : "SUCCESS");
        order.setOrderDate(LocalDateTime.now());

        Order orderResponse=orderRepository.save(order);

        byte[] pdf = invoiceService.generateInvoicePdf(orderResponse);
        sendOrderMailWithAttachment(email, pdf);
    }

    private void sendOrderMail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Order Confirmed - Maa Sita Enterprises");
        message.setText("Your order has been successfully placed.");

        mailSender.send(message);
    }

    private void sendOrderMailWithAttachment(String email, byte[] pdf) throws Exception {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("Your Invoice - Maa Sita Enterprises");
        helper.setText("Thank you for your order. Invoice attached.");

        helper.addAttachment("invoice.pdf", new ByteArrayResource(pdf));

        mailSender.send(message);
    }

    public Order placeOrderAndReturnOrder(String email, String paymentMethod) {

        Order order = new Order();
        order.setEmail(email);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(paymentMethod.equals("COD") ? "PENDING" : "SUCCESS");
        order.setOrderDate(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        sendOrderMail(email); // already exists

        return savedOrder;
    }
}
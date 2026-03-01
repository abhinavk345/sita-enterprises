package com.maa.sita.enterprises.service;

import com.maa.sita.enterprises.entity.Order;
import com.maa.sita.enterprises.repository.OrderRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final JavaMailSender mailSender;

    public OrderService(OrderRepository orderRepository, JavaMailSender mailSender) {
        this.orderRepository = orderRepository;
        this.mailSender = mailSender;
    }

    public void placeOrder(String email, String paymentMethod) {

        Order order = new Order();
        order.setEmail(email);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(paymentMethod.equals("COD") ? "PENDING" : "SUCCESS");
        order.setOrderDate(LocalDateTime.now());

        orderRepository.save(order);

        sendOrderMail(email);
    }

    private void sendOrderMail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Order Confirmed - Maa Sita Enterprises");
        message.setText("Your order has been successfully placed.");

        mailSender.send(message);
    }
}
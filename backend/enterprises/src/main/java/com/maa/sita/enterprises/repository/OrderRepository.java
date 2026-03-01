package com.maa.sita.enterprises.repository;

import com.maa.sita.enterprises.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
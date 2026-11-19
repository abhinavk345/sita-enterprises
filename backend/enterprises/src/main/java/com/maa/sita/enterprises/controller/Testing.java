package com.maa.sita.enterprises.controller;

import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String city;
    private double salary;

    public Employee(String name, String city, double salary) {
        this.name = name;
        this.city = city;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }

    public double getSalary() {
        return salary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", salary=" + salary +
                '}';
    }
}

public class Testing {

    public static void main(String[] args) {

        List<Employee> employees = Arrays.asList(
                new Employee("Abhinav", "Delhi", 90),
                new Employee("Rahul", "Delhi", 150),
                new Employee("Aman", "Mumbai", 70),
                new Employee("Neha", "Mumbai", 200),
                new Employee("Priya", "Chennai", 120),
                new Employee("Karan", "Delhi", 300),
                new Employee("Rohit", "Mumbai", 95)
        );

        // 1. Group by city
        System.out.println("1. Group By City");
        Map<String, List<Employee>> groupByCity =
                employees.stream()
                        .collect(Collectors.groupingBy(Employee::getCity));

        groupByCity.forEach((city, empList) -> {
            System.out.println(city + " -> " + empList);
        });

        // -----------------------------------------------------

        // 2. Count employees based on city
        System.out.println("\n2. Count By City");

        Map<String, Long> countByCity =
                employees.stream()
                        .collect(Collectors.groupingBy(
                                Employee::getCity,
                                Collectors.counting()
                        ));

        countByCity.forEach((city, count) ->
                System.out.println(city + " -> " + count));

        // -----------------------------------------------------

        // 3. Salary Range Grouping
        // 1-100 and Above 100

        System.out.println("\n3. Salary Range Grouping");

        Map<String, List<Employee>> salaryRange =
                employees.stream()
                        .collect(Collectors.groupingBy(emp ->
                                emp.getSalary() <= 100
                                        ? "1-100"
                                        : "100+"
                        ));

        salaryRange.forEach((range, empList) ->
                System.out.println(range + " -> " + empList));

        // -----------------------------------------------------

        // 4. 2nd Highest Salary Employee

        System.out.println("\n4. Second Highest Salary Employee");

        Employee secondHighest =
                employees.stream()
                        .sorted(Comparator.comparing(Employee::getSalary)
                                .reversed())
                        .skip(1)
                        .findFirst()
                        .orElse(null);

        System.out.println(secondHighest);

        // -----------------------------------------------------

        // 5. If city same then sort/filter based on salary

        System.out.println("\n5. Same City -> Sort By Salary");

        Map<String, List<Employee>> cityWiseSortedSalary =
                employees.stream()
                        .collect(Collectors.groupingBy(
                                Employee::getCity,
                                Collectors.collectingAndThen(
                                        Collectors.toList(),
                                        list -> list.stream()
                                                .sorted(Comparator.comparing(Employee::getSalary)
                                                        .reversed())
                                                .collect(Collectors.toList())
                                )
                        ));

        cityWiseSortedSalary.forEach((city, empList) -> {
            System.out.println(city + " -> " + empList);
        });
    }
}
//import java.util.Comparator;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//class Employee implements Comparable<Employee> {
//    private String name;
//    private  String city;
//    private Double salary;
//    private int age;
//
//    public Employee(String name, String city, Double salary) {
//        this.name = name;
//        this.city = city;
//        this.salary = salary;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
//    public Double getSalary() {
//        return salary;
//    }
//
//    public void setSalary(Double salary) {
//        this.salary = salary;
//    }
//
//
//    @Override
//    public int compareTo(Employee o) {
//        return (int) (this.getSalary() -o.getSalary());
//    }
//}
//public class Testing {
//    public static void main(String[] args) {
//
//        List<Employee> employeeList=List.of(new Employee("abhinav","delhi",100.0),new Employee("suman","delhi",10.0),new Employee("test","delhi",1.0));
//        //Employee> name ,city, salary
////group based on city
//        //count
//       // Map<String, Integer> mapResult= employeeList.stream().collect(Collectors.groupingBy(Employee::getCity));
//        Map<String, Long> collect = employeeList.stream().collect(Collectors.groupingBy(Employee::getCity, Collectors.counting()));
//
//        System.out.println(collect);
//        //find key sal 1-100, 100 to more another
//        //Map<Double, Long> collect1 = employeeList.stream().collect(Collectors.groupingBy(Employee::getSalary, Collectors.counting()));
//       // System.out.println(collect1);
//       employeeList.stream().sorted(Comparator.reverseOrder()).skip(1).findFirst();
//      //  System.out.println(employee.get().getName());
//    }
//}
//

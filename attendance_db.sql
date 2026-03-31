-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2026 at 04:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_logs`
--

CREATE TABLE `attendance_logs` (
  `id` int(11) NOT NULL,
  `Employee_Number` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Time_In` time DEFAULT NULL,
  `Time_Out` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance_logs`
--

INSERT INTO `attendance_logs` (`id`, `Employee_Number`, `Date`, `Time_In`, `Time_Out`) VALUES
(6, 1001, '2026-03-20', '14:26:54', '14:30:28'),
(7, 1002, '2026-03-20', '14:27:22', '14:30:58'),
(8, 1003, '2026-03-20', '14:27:24', NULL),
(9, 1004, '2026-03-20', '14:27:26', NULL),
(10, 1005, '2026-03-20', '14:27:28', NULL),
(11, 0, '2026-03-20', '14:31:03', '14:31:37'),
(17, 1001, '2026-03-27', '21:06:00', '21:06:06'),
(18, 1002, '2026-03-27', '21:09:37', '21:09:42');

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

CREATE TABLE `employee_info` (
  `Employee_ID` int(11) NOT NULL,
  `Employee_Number` int(20) NOT NULL,
  `Employee_Name` varchar(100) NOT NULL,
  `Department` varchar(100) NOT NULL,
  `Designation` varchar(100) NOT NULL,
  `Photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_info`
--

INSERT INTO `employee_info` (`Employee_ID`, `Employee_Number`, `Employee_Name`, `Department`, `Designation`, `Photo`) VALUES
(1, 1001, 'Lorenz Labador', 'IT Dept', 'Building 1', 'images/lorenz.jpg'),
(2, 1002, 'Arkin Balintos', 'Registrar', 'Building 2', 'images/arkin.jpg'),
(3, 1003, 'Carl Angeles', 'Maintenance', 'Building 3', 'images/carl.jpg'),
(4, 1004, 'Arj Rentoria', 'Osas', 'Building 4', 'images/arj.jpg'),
(5, 1005, 'Darnel Alcaraz', 'Nursing', 'Building 5', 'images/darnel.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'SuperAdmin', 'super@spist.edu.ph', 'super123', 'super_admin', '2026-03-31 11:04:12'),
(2, 'AdminUser', 'admin@spist.edu.ph', 'admin123', 'admin', '2026-03-31 11:04:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_employee_date` (`Employee_Number`,`Date`),
  ADD UNIQUE KEY `Employee_Number` (`Employee_Number`,`Date`);

--
-- Indexes for table `employee_info`
--
ALTER TABLE `employee_info`
  ADD PRIMARY KEY (`Employee_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `employee_info`
--
ALTER TABLE `employee_info`
  MODIFY `Employee_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

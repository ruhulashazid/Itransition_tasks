-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2024 at 07:57 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registration_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login_time` timestamp NULL DEFAULT NULL,
  `status` enum('active','blocked') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `registration_time`, `last_login_time`, `status`) VALUES
(5, 'Ruhul Amin', 'ruhul@gmail.com', '$2a$10$2n3vnfT8rqhKHLnitw1iaehuMCWTEZWZHdiV33ismHo1c2o2ML1ZO', '2024-09-17 16:51:29', '2024-09-17 12:33:01', 'active'),
(20, 'Sakib Islam', 'sakib@gmail.com', '$2a$10$CmRlbFYDv2WKihpLHZ/6MemS6/LwGItpvz4sBqp5fRsq35k1U5IFm', '2024-09-17 18:46:27', '2024-09-17 12:53:12', 'active'),
(21, 'Rabbil Islam', 'rabbil@gmail.com', '$2a$10$KQ5kvo1euoF2KGZnai0bbur0O8TRm4Sfl81ac71d2GmJQkD6AXviC', '2024-09-17 18:47:01', '2024-09-17 12:52:44', 'active'),
(22, 'Kabir Khan', 'kabir@gmail.com', '$2a$10$uXDUxjnRtzIqL6i.TSDxjOiw66q4v040DVEFZh78Pz8Umav0E4Dga', '2024-09-17 18:47:33', '2024-09-17 12:52:22', 'active'),
(23, 'Rakibul islam', 'rakib@gmail.com', '$2a$10$r7GqLAexabWDYCytzby0kOJ2zW75VwIGsxibUw4F59T6dJhiHepsO', '2024-09-17 18:48:08', '2024-09-17 12:53:32', 'active'),
(24, 'Samir Ali ', 'samir@gmail.com', '$2a$10$AaUES5PQOsUX/5jzDy6un./VOIohJFCW9foObz45tJf.6Ap2Xjnae', '2024-09-17 18:48:36', '2024-09-17 12:53:00', 'active'),
(25, 'Shazid Khan', 'shazid@gmail.com', '$2a$10$n8vIUNDlsov5Yw00ZnaL3.Rs.31rqIPnBDW2Aw3XWpKVVZ2pQsLSy', '2024-09-17 18:49:51', '2024-09-17 12:49:58', 'active'),
(26, 'Sabbir ', 'sabbir@gmail.com', '$2a$10$Udb.3af6WXSPzrRSJd5ClOSOdLo2mtid94G3yLObT2hJ8ihv1Jouq', '2024-09-18 05:45:14', '2024-09-17 23:45:49', 'active');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

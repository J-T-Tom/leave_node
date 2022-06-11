-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 10, 2022 at 10:15 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leave_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL,
  `full_name` varchar(30) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `employment_date` date NOT NULL,
  `role` varchar(10) NOT NULL,
  `password` text,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `full_name`, `gender`, `employment_date`, `role`, `password`) VALUES
(1000, 'Abebe', 'Male', '2022-06-01', 'HR_MANAGER', 'e10adc3949ba59abbe56e057f20f883e'),
(1001, 'KEBEDE', 'Male', '2022-06-03', 'EMPLOYEE', NULL),
(1002, 'Meron', 'Female', '2022-06-05', 'EMPLOYEE', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leave_info`
--

DROP TABLE IF EXISTS `leave_info`;
CREATE TABLE IF NOT EXISTS `leave_info` (
  `leave_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `leave_type` varchar(20) NOT NULL,
  `start_date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'Pending',
  `hide_by_emp` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0-no, 1-yes',
  `attached_file` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`leave_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_info`
--

INSERT INTO `leave_info` (`leave_id`, `employee_id`, `leave_type`, `start_date`, `amount`, `status`, `hide_by_emp`, `attached_file`) VALUES
(1, 1001, 'Normal Leave', '2022-06-15', 3, 'Approved', 1, NULL),
(2, 1001, 'Normal Leave', '2022-07-21', 1, 'Approved', 0, NULL),
(3, 1001, 'Normal Leave', '2022-07-22', 1, 'Rejected', 0, NULL),
(4, 1001, 'Normal Leave', '2022-06-22', 5, 'Rejected', 0, NULL),
(5, 1001, 'Normal Leave', '2022-06-15', 1, 'Rejected', 1, NULL),
(7, 1001, 'Normal Leave', '2022-07-09', 1, 'Rejected', 1, NULL),
(8, 1000, 'Normal Leave', '2022-07-09', 1, 'Approved', 0, NULL),
(9, 1001, 'Normal Leave', '2022-06-22', 2, 'Rejected', 1, NULL),
(10, 1001, 'Sick Leave', '2022-06-15', 5, 'Approved', 1, NULL),
(14, 1001, 'Sick Leave', '2022-06-29', 1, 'Rejected', 1, NULL),
(13, 1001, 'Women Prenatal Leave', '2022-06-14', 30, 'Approved', 1, NULL),
(15, 1001, 'Normal Leave', '2022-06-30', 1, 'Rejected', 1, NULL),
(16, 1001, 'Normal Leave', '2022-06-15', 1, 'Pending', 1, NULL),
(17, 1002, 'Sick Leave', '2022-06-23', 5, 'Pending', 0, ''),
(24, 1002, 'Legal Leave', '2022-07-06', 1, 'Pending', 0, '1654899134094user control hiden from toolbox.PNG'),
(23, 1001, 'Legal Leave', '2022-06-30', 3, 'Pending', 0, '1654899109480oracle 1.PNG');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE IF NOT EXISTS `setting` (
  `type` varchar(15) NOT NULL,
  `value` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`type`, `value`) VALUES
('HOLYDAY', '2022-06-16'),
('HOLYDAY', '2022-06-20');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

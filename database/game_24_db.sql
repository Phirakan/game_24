-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2025 at 03:14 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `24_cheat_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, 'database/migrations/1752313459314_create_users_table', 1, '2025-07-12 10:20:11'),
(2, 'database/migrations/1752313571706_create_jwt_refresh_tokens_table', 1, '2025-07-12 10:20:11'),
(3, 'database/migrations/1752323132244_create_users_table', 2, '2025-07-12 12:26:53'),
(4, 'database/migrations/1752323168193_create_answers_table', 2, '2025-07-12 12:26:53');

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema_versions`
--

CREATE TABLE `adonis_schema_versions` (
  `version` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adonis_schema_versions`
--

INSERT INTO `adonis_schema_versions` (`version`) VALUES
(2);

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(10) UNSIGNED NOT NULL,
  `numbers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`numbers`)),
  `solutions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`solutions`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `numbers`, `solutions`, `created_at`, `updated_at`) VALUES
(1, '[2,3,4,6]', '[\"(3 - 2) * (4 * 6)\",\"(4 * 6) / (3 - 2)\",\"6 * (4 * (3 - 2))\",\"6 * (4 / (3 - 2))\",\"6 / ((3 - 2) / 4)\",\"4 * (6 * (3 - 2))\",\"4 * (6 / (3 - 2))\",\"4 / ((3 - 2) / 6)\",\"(2 + 4) + (3 * 6)\",\"6 + (3 * (2 + 4))\",\"3 * (6 - (2 - 4))\",\"3 * (6 + (4 - 2))\",\"(2 * 4) * (6 - 3)\",\"3 * (6 + (4 / 2))\",\"3 * (4 - (2 - 6))\",\"3 * (4 + (6 - 2))\",\"(2 * 6) + (3 * 4)\",\"3 * ((2 * 6) - 4)\",\"4 * (3 + (6 / 2))\",\"(3 * 4) + (2 * 6)\",\"(6 - 3) * (2 * 4)\",\"4 * (2 * (6 - 3))\",\"2 * (4 * (6 - 3))\",\"(3 * 6) + (2 + 4)\",\"4 + (2 + (3 * 6))\",\"2 + (4 + (3 * 6))\",\"3 * ((4 + 6) - 2)\",\"(4 * 6) * (3 - 2)\"]', '2025-07-15 15:42:19', '2025-07-15 15:42:19'),
(2, '[1,2,3,4]', '[\"4 * (3 + (1 + 2))\",\"(1 * 2) * (3 * 4)\",\"4 * (3 * (1 * 2))\",\"3 * (4 * (1 * 2))\",\"(3 * 4) / (1 / 2)\",\"4 * (3 / (1 / 2))\",\"4 / ((1 / 2) / 3)\",\"3 * (4 / (1 / 2))\",\"3 / ((1 / 2) / 4)\",\"(2 / 1) * (3 * 4)\",\"4 * (3 * (2 / 1))\",\"3 * (4 * (2 / 1))\",\"(1 + 3) * (2 + 4)\",\"4 * (2 + (1 + 3))\",\"(1 * 3) * (2 * 4)\",\"4 * (2 * (1 * 3))\",\"2 * (4 * (1 * 3))\",\"(2 * 4) / (1 / 3)\",\"4 * (2 / (1 / 3))\",\"4 / ((1 / 3) / 2)\",\"2 * (4 / (1 / 3))\",\"2 / ((1 / 3) / 4)\",\"(3 / 1) * (2 * 4)\",\"4 * (2 * (3 / 1))\",\"2 * (4 * (3 / 1))\",\"(1 * 4) * (2 * 3)\",\"3 * (2 * (1 * 4))\",\"2 * (3 * (1 * 4))\",\"(2 * 3) / (1 / 4)\",\"3 * (2 / (1 / 4))\",\"3 / ((1 / 4) / 2)\",\"2 * (3 / (1 / 4))\",\"2 / ((1 / 4) / 3)\",\"(4 / 1) * (2 * 3)\",\"3 * (2 * (4 / 1))\",\"2 * (3 * (4 / 1))\",\"4 * (1 + (2 + 3))\",\"(2 * 3) * (1 * 4)\",\"(2 * 3) * (4 / 1)\",\"4 * (1 * (2 * 3))\",\"4 / (1 / (2 * 3))\",\"4 * ((2 * 3) / 1)\",\"1 * (4 * (2 * 3))\",\"(4 * (2 * 3)) / 1\",\"(2 + 4) * (1 + 3)\",\"(2 * 4) * (1 * 3)\",\"(2 * 4) * (3 / 1)\",\"3 * (1 * (2 * 4))\",\"3 / (1 / (2 * 4))\",\"3 * ((2 * 4) / 1)\",\"1 * (3 * (2 * 4))\",\"(3 * (2 * 4)) / 1\",\"(3 * 4) * (1 * 2)\",\"(3 * 4) * (2 / 1)\",\"2 * (1 * (3 * 4))\",\"2 / (1 / (3 * 4))\",\"2 * ((3 * 4) / 1)\",\"1 * (2 * (3 * 4))\",\"(2 * (3 * 4)) / 1\"]', '2025-07-15 16:16:31', '2025-07-15 16:16:31'),
(3, '[1,2,3,5]', '[\"(1 + 2) * (3 + 5)\",\"3 * (5 + (1 + 2))\",\"3 * (2 + (1 + 5))\",\"(5 - 1) * (2 * 3)\",\"3 * (2 * (5 - 1))\",\"2 * (3 * (5 - 1))\",\"(5 * (2 + 3)) - 1\",\"(2 * 3) * (5 - 1)\",\"3 * (1 + (2 + 5))\",\"(3 + 5) * (1 + 2)\"]', '2025-07-15 16:19:03', '2025-07-15 16:19:03'),
(4, '[1,1,1,1]', '[]', '2025-07-15 16:25:12', '2025-07-15 16:25:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$scrypt$n=16384,r=8,p=1$aFPyHCK7RIKmehtNHhO8YA$IFL5Rnd9oYMhPHzkb/Ls7qlNtxDMW+/2PgzCjG3I7t4CsE89Hl1b896TGwqFodWr+0tBYd+Y4nk8tHaNn8KHjw', '2025-07-12 05:41:42', '2025-07-12 05:41:42'),
(2, 'mosu', '$scrypt$n=16384,r=8,p=1$csCwVn93FnR8SpZT6V5xUg$mQ5DilBLVQRT+bbhJeIYN9oLNNjMQU7BseTfH1bHhAQ4xGMllF9xjkSGV2LwHIqYKmaXCXuA+8RwgsGMEr9Brw', '2025-07-15 16:55:30', '2025-07-15 16:55:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adonis_schema_versions`
--
ALTER TABLE `adonis_schema_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

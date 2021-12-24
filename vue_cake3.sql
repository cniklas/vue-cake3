-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Dez 2021 um 12:00
-- Server-Version: 10.4.20-MariaDB
-- PHP-Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `vue_cake3`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cocktails`
--

CREATE TABLE `cocktails` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `cocktails`
--

INSERT INTO `cocktails` (`id`, `name`, `description`, `created`, `modified`) VALUES
(1, 'Cosmopolitan', 'Vodka based', '2015-04-10 15:56:23', NULL),
(2, 'Margarita', 'Tequila based', '2015-04-10 15:59:39', NULL),
(3, 'Mojito', 'Rum based', '2015-04-11 09:52:01', NULL),
(4, 'Cuba Libre', 'Rum based', '2015-04-11 09:52:01', NULL),
(5, 'Caipirinha', 'Rum based', '2015-04-11 09:33:37', NULL),
(6, 'Tequila Sunrise', 'Tequila based', '2015-04-11 09:52:02', NULL),
(7, 'Bloody Mary', 'Vodka based', '2015-04-11 09:52:02', NULL),
(8, 'Black Velvet', 'Beer based', '2015-04-11 09:52:02', NULL),
(9, 'Martini', 'Gin based', '2015-04-11 09:52:02', NULL),
(10, 'Manhattan', 'Whiskey based', '2015-04-11 09:52:03', NULL),
(11, 'Bronx', 'Gin based', '2015-04-11 09:52:03', NULL),
(12, 'Rose', 'Gin bassed', '2015-04-11 09:52:03', NULL),
(13, 'Hot Shot', 'Coffee based', '2015-04-11 09:52:03', NULL),
(14, 'Parrot', 'Tequila based', '2015-04-11 09:52:03', NULL),
(15, 'Boxer', 'Whiskey based', '2015-04-11 09:52:03', NULL),
(16, 'Monkey', 'Cointreau based', '2015-04-11 09:52:03', NULL),
(17, 'Pink Panther', 'Cointreau based', '2015-04-11 09:52:03', NULL),
(18, 'Zombie', 'Rum based', '2015-04-11 09:52:03', NULL),
(19, 'Matador', 'Tequila based', '2015-04-11 09:52:03', NULL),
(20, 'B52', 'Cream based', '2015-04-11 09:52:03', NULL),
(21, 'Beach Runner', 'Gin based', '2015-04-11 09:52:03', NULL),
(22, 'Allgäu-Cocktail', 'Rum based', '2019-08-26 20:23:56', '2020-07-27 11:15:57'),
(23, 'Etna', 'Ramazotti based', '2021-05-09 20:17:00', '2021-05-09 20:17:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `active`, `created`, `modified`) VALUES
(1, 'cniklas', '$2y$10$kW/wM4Q/xjdnsPspDjgRluqTGqg2mqNN8ytLfKQCx7i4oANDA7Zhu', 1, '2019-08-25 19:59:38', '2019-08-25 19:59:38'),
(2, 'mike', '$2y$10$7Xl77F97dIsd35ZsnXTmhOItVSg9p0qi5oPlEb.nJQD1pUI3qYCR6', 1, '2019-08-26 19:20:57', '2019-08-26 19:20:57');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `cocktails`
--
ALTER TABLE `cocktails`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `cocktails`
--
ALTER TABLE `cocktails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

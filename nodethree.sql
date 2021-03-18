-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 18 mars 2021 à 10:38
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nodethree`
--

-- --------------------------------------------------------

--
-- Structure de la table `assoc`
--

DROP TABLE IF EXISTS `assoc`;
CREATE TABLE `assoc` (
  `id_pers` int(11) NOT NULL,
  `id_spe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `assoc`
--

INSERT INTO `assoc` (`id_pers`, `id_spe`) VALUES
(1, 2),
(2, 1),
(5, 7),
(6, 3),
(9, 3),
(11, 3);

-- --------------------------------------------------------

--
-- Structure de la table `persons`
--

DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons` (
  `id_p` int(11) NOT NULL,
  `lastname` varchar(55) NOT NULL,
  `firstname` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `persons`
--

INSERT INTO `persons` (`id_p`, `lastname`, `firstname`) VALUES
(1, 'Dutrey', 'Aurélie'),
(2, 'Minker', 'Laurence'),
(5, 'Günaltay', 'Elif'),
(6, 'Louali', 'Fatiha'),
(9, 'Gambier', 'Benoit'),
(11, 'Caccomo', 'Cedric');

-- --------------------------------------------------------

--
-- Structure de la table `spe`
--

DROP TABLE IF EXISTS `spe`;
CREATE TABLE `spe` (
  `id_s` int(11) NOT NULL,
  `name` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `spe`
--

INSERT INTO `spe` (`id_s`, `name`) VALUES
(1, 'Droit'),
(2, 'Histoire'),
(3, 'Informatique'),
(7, 'Financement du cinéma');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `assoc`
--
ALTER TABLE `assoc`
  ADD PRIMARY KEY (`id_pers`,`id_spe`) USING BTREE,
  ADD UNIQUE KEY `FOREIGN` (`id_pers`,`id_spe`);

--
-- Index pour la table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id_p`);

--
-- Index pour la table `spe`
--
ALTER TABLE `spe`
  ADD PRIMARY KEY (`id_s`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `assoc`
--
ALTER TABLE `assoc`
  MODIFY `id_pers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `persons`
--
ALTER TABLE `persons`
  MODIFY `id_p` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `spe`
--
ALTER TABLE `spe`
  MODIFY `id_s` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

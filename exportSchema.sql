CREATE DATABASE  IF NOT EXISTS `cs542` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cs542`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: cs542
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `rID` char(20) NOT NULL,
  `ctime` date NOT NULL,
  `cdate` date NOT NULL,
  `content` char(50) NOT NULL,
  `oID` char(20) NOT NULL,
  PRIMARY KEY (`oID`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`oID`) REFERENCES `Orders` (`oID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `cID` char(20) NOT NULL,
  `address` char(50) NOT NULL,
  `czipcode` int(11) NOT NULL,
  `cname` char(20) NOT NULL,
  PRIMARY KEY (`cID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES ('c1','Boston',10000,'AA'),('c2','Worcester',11609,'BB'),('c3','Cambridge',12001,'CC');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dish`
--

DROP TABLE IF EXISTS `Dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dish` (
  `dID` char(20) NOT NULL,
  `dname` char(20) NOT NULL,
  `price` float NOT NULL,
  `description` char(50) NOT NULL,
  `dishurl` char(50) NOT NULL,
  `rID` char(20) NOT NULL,
  PRIMARY KEY (`dID`),
  KEY `rID` (`rID`),
  CONSTRAINT `dish_ibfk_1` FOREIGN KEY (`rID`) REFERENCES `Restaurant` (`rID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dish`
--

LOCK TABLES `Dish` WRITE;
/*!40000 ALTER TABLE `Dish` DISABLE KEYS */;
INSERT INTO `Dish` VALUES ('d1','Bagel',5,'Bagel','www','r1'),('d2','Burger',6,'Burger','www','r1'),('d3','Fried rice',8,'Rice','www','r2'),('d4','Noodles',7,'Noodles','www','r2');
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `oID` char(20) NOT NULL,
  `status` char(10) NOT NULL,
  `sum` float NOT NULL,
  `otime` date NOT NULL,
  `odate` date NOT NULL,
  `cID` char(20) NOT NULL,
  `rID` char(20) NOT NULL,
  PRIMARY KEY (`oID`),
  KEY `cID` (`cID`),
  KEY `rID` (`rID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cID`) REFERENCES `Customer` (`cID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`rID`) REFERENCES `Restaurant` (`rID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES ('o1','Finished',16,'2017-04-10','2017-04-10','c1','r1'),('o2','Finished',30,'2017-04-15','2017-04-15','c2','r2');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant`
--

DROP TABLE IF EXISTS `Restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Restaurant` (
  `rID` char(20) NOT NULL,
  `tel` int(11) NOT NULL,
  `type` char(10) NOT NULL,
  `city` char(10) NOT NULL,
  `state` char(10) NOT NULL,
  `street` char(20) NOT NULL,
  `rzipcode` int(11) NOT NULL,
  `durl` char(50) NOT NULL,
  PRIMARY KEY (`rID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant`
--

LOCK TABLES `Restaurant` WRITE;
/*!40000 ALTER TABLE `Restaurant` DISABLE KEYS */;
INSERT INTO `Restaurant` VALUES ('r1',6174,'American','Boston','MA','Newbury',12222,'www'),('r2',6174,'Chinese','Boston','MA','Newbury',12222,'www');
/*!40000 ALTER TABLE `Restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cLogin`
--

DROP TABLE IF EXISTS `cLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cLogin` (
  `cID` char(20) NOT NULL,
  `cpwd` char(20) NOT NULL,
  PRIMARY KEY (`cID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cLogin`
--

LOCK TABLES `cLogin` WRITE;
/*!40000 ALTER TABLE `cLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `cLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contains`
--

DROP TABLE IF EXISTS `contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contains` (
  `num` int(11) NOT NULL,
  `oID` char(20) NOT NULL,
  `dID` char(20) NOT NULL,
  PRIMARY KEY (`oID`,`dID`),
  KEY `dID` (`dID`),
  CONSTRAINT `contains_ibfk_1` FOREIGN KEY (`oID`) REFERENCES `Orders` (`oID`),
  CONSTRAINT `contains_ibfk_2` FOREIGN KEY (`dID`) REFERENCES `Dish` (`dID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contains`
--

LOCK TABLES `contains` WRITE;
/*!40000 ALTER TABLE `contains` DISABLE KEYS */;
INSERT INTO `contains` VALUES (2,'o1','d1'),(1,'o1','d2'),(2,'o2','d3'),(2,'o2','d4');
/*!40000 ALTER TABLE `contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rLogin`
--

DROP TABLE IF EXISTS `rLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rLogin` (
  `rID` char(20) NOT NULL,
  `rpwd` char(20) NOT NULL,
  PRIMARY KEY (`rID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rLogin`
--

LOCK TABLES `rLogin` WRITE;
/*!40000 ALTER TABLE `rLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `rLogin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-16 22:04:30

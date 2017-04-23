CREATE DATABASE  IF NOT EXISTS `cs542` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cs542`;
-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: cs542
-- ------------------------------------------------------
-- Server version	5.7.13

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
INSERT INTO `Dish` VALUES ('1','noodles',7.99,'fried noodels with beef','link','1'),('10','burger',6.79,'cheeseburger is very delicious','link','2'),('11','fries',2.79,'fries is very delicious','link','2'),('12','pizza',6.79,'I like pizza','link','2'),('13','hotpot',16.79,'I like hotpot','link','3'),('14','xilongbao',16.79,'I like xilongbao','link','3'),('15','dumpling',16.79,'I like dumpling','link','3'),('16','spicy chicken',16.79,'I like spicy chicken','link','3'),('17','pad thai',16.79,'I do not like pad thai','link','4'),('18','curry',16.79,'I do not like curry','link','4'),('19','pasta',8.79,'I  like pasta','link','5'),('2','rice',7.99,'fried rice with beef','link','1'),('3','tea',7.99,'no sugar green tea','link','2'),('4','fries',7.99,'fries with kench-up','link','2'),('5','wings',3.99,'with BBQ source','link','1'),('6','tender',3.99,'with BBQ source','link','1'),('7','sushi',9.99,'tuna, shrimp, soy soure','link','1'),('8','lamen',9.99,'pork, beef and chicken','link','1'),('9','tacco',4.99,'sepical favors','link','2');
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESTAURANT`
--

DROP TABLE IF EXISTS `RESTAURANT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RESTAURANT` (
  `rID` char(20) NOT NULL,
  `tel` int(11) NOT NULL,
  `type` char(10) NOT NULL,
  `city` char(10) NOT NULL,
  `state` char(10) NOT NULL,
  `street` char(20) NOT NULL,
  `rzipcode` int(11) NOT NULL,
  `durl` char(50) NOT NULL,
  `pwd` char(20) DEFAULT NULL,
  `email` char(20) DEFAULT NULL,
  `name` char(20) DEFAULT NULL,
  PRIMARY KEY (`rID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESTAURANT`
--

LOCK TABLES `RESTAURANT` WRITE;
/*!40000 ALTER TABLE `RESTAURANT` DISABLE KEYS */;
INSERT INTO `RESTAURANT` VALUES ('1',767,'Japanese','worcester','ma','dix',2135,'test link','asd','Jon@wpi.edu','Food Bar'),('2',98,'American','kansas','oclahoma','maddie',2135,'test link','asd','snow@wpi.edu','Starbucks'),('3',6174,'Chinese','Boston','MA','Newbury',12222,'www','asd','know@wpi.edu','Star Food'),('4',6174,'Thai','Boston','MA','Newbury',12222,'www','asd','nothing@wpi.edu','Thai Town'),('5',6174,'Italian','Boston','MA','Worcester',12222,'www','qwe','etaly','Italy Town');
/*!40000 ALTER TABLE `RESTAURANT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `oid` datetime NOT NULL,
  `did` char(20) DEFAULT NULL,
  `cid` char(20) DEFAULT NULL,
  `rid` char(20) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `did` (`did`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`did`) REFERENCES `dish` (`dID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('2017-04-22 17:06:19','2','3','1',4.3),('2017-04-22 17:06:27','2','3','1',4.3),('2017-04-22 17:06:38','3','3','1',1.3),('2017-04-22 22:34:59','2','3','1',7.99),('2017-04-22 22:35:03','5','3','1',3.99),('2017-04-22 22:35:06','5','3','1',3.99),('2017-04-22 23:00:30','13','3','3',16.79),('2017-04-22 23:00:31','15','3','3',16.79),('2017-04-22 23:00:32','16','3','3',16.79),('2017-04-23 00:18:03','10','3','2',6.79),('2017-04-23 00:18:04','10','3','2',6.79),('2017-04-23 00:18:05','11','3','2',2.79);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `cID` char(20) NOT NULL,
  `address` char(50) NOT NULL,
  `czipcode` int(11) NOT NULL,
  `cname` char(20) NOT NULL,
  `pwd` char(20) DEFAULT NULL,
  `email` char(20) DEFAULT NULL,
  PRIMARY KEY (`cID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('1','1000 institue Road',2315,'test customer 1','aaaa','aa@gmail.com'),('2','address 2',2135,'test customer 2','sss','amanda@gmail.com'),('2017-04-22 09:02:24','test',12345,'a','a','a'),('2017-04-22 09:22:28','main street',12345,'Dabby','dabby','123@123'),('2017-04-22 11:03:42','copley',12345,'lou','asd','wayfair'),('3','address 3',12345,'Tom','asd','test'),('c1','Boston',10000,'AA',NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderDetail`
--

DROP TABLE IF EXISTS `orderDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderDetail` (
  `oID` mediumint(9) NOT NULL,
  `dID` mediumint(9) NOT NULL,
  `num` int(11) NOT NULL,
  PRIMARY KEY (`oID`,`dID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderDetail`
--

LOCK TABLES `orderDetail` WRITE;
/*!40000 ALTER TABLE `orderDetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `oID` char(20) NOT NULL,
  `status` char(10) NOT NULL,
  `odate` date NOT NULL,
  `cID` char(20) NOT NULL,
  `rID` char(20) NOT NULL,
  `ordertime` time DEFAULT NULL,
  `sum` double DEFAULT NULL,
  PRIMARY KEY (`oID`),
  KEY `cID` (`cID`),
  KEY `rID` (`rID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cID`) REFERENCES `Customer` (`cID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`rID`) REFERENCES `Restaurant` (`rID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('1','accepted','2017-04-16','1','1','22:19:43',NULL),('2','placed','2017-04-16','2','2','22:19:50',NULL),('3','accepted','2017-04-17','1','2','22:19:43',NULL),('4','confirm','2017-04-21','3','2','22:19:57',NULL),('5','placed','2017-04-21','3','2','22:19:57',NULL),('6','delivered','2017-04-21','3','1','22:20:36',NULL),('7','delivered','2017-04-21','3','1','22:21:28',NULL),('8','delivered','2017-04-21','3','2','22:21:39',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-23 11:49:01

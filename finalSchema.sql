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
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `cID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `cmail` char(20) NOT NULL,
  `cpwd` char(20) NOT NULL,
  `address` char(50) NOT NULL,
  `czipcode` char(5) NOT NULL,
  `cname` char(20) NOT NULL,
  PRIMARY KEY (`cID`),
  UNIQUE KEY `cmail` (`cmail`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--

LOCK TABLES `Customer` WRITE;
/*!40000 ALTER TABLE `Customer` DISABLE KEYS */;
INSERT INTO `Customer` VALUES (1,'tom@wpi.edu','tom','18 Elm Street, Worcester','01609','tom'),(2,'john@wpi.edu','john','17 Elm Street, Worcester','01609','john'),(3,'lily@wpi.edu','lily','70 Park Ave, Worcester','01605','lily'),(4,'lucy@wpi.edu','lucy','75 park Ave, Worcester','01605','lucy'),(5,'jim@wpi.edu','jim','200 Main Street, Worcester','01610','jim');
/*!40000 ALTER TABLE `Customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dish`
--

DROP TABLE IF EXISTS `Dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dish` (
  `dID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `dname` char(50) NOT NULL,
  `price` float NOT NULL,
  `description` char(255) NOT NULL,
  `dishurl` char(50) NOT NULL,
  `rID` mediumint(9) NOT NULL,
  PRIMARY KEY (`dID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dish`
--

LOCK TABLES `Dish` WRITE;
/*!40000 ALTER TABLE `Dish` DISABLE KEYS */;
INSERT INTO `Dish` VALUES (1,'Sushi',8,'6 pieces thin sliced variety fish','www',1),(2,'Gyoza',6,'Pan fried dumplings served with sauce','www',1),(3,'Udon',8,'Stir fried thick noodles and mixed vegetables with Tofu','www',1),(4,'Unaju',12,'Eel on white rice served with sauce','www',1),(5,'Teriyaki Chicken',10,'Thinly sliced chicken cooked with teriyaki sauce','www',1),(6,'Spring Roll',3,'Fried dish with pork and mixed vegetables','www',2),(7,'Crispy Shrimp',12,'Jumbo shrimp quickly fried and sauteed in a spicy sweet and tangy sauce','www',2),(8,'Kung Pao Chicken',10,'Diced chicken with assorted vegetables','www',2),(9,'Beef w/ Broccoli',10,'Fried beef with broccoli, served with white rice','www',2),(10,'Char Siu Fried Rice',8,'Fried rice with pork in a sweet sauce','www',2),(11,'French Fries',3,'French Fries','www',3),(12,'Pepperroni Pizza',5,'Pepperoni pizza','www',3),(13,'Macaroni and Cheese',5,'Macaroni and Cheese','www',3),(14,'Clam Chowder',4,'Clam chowder','www',3),(15,'Turkey Sandwich',5,'Turkey with whole bread','www',3),(16,'Vietnamese Sandwich',5,'Stuffed with pickled veggies, cilantro, jalapenos, house made mayonnaise','www',4),(17,'Chicken and Veggies',8,'Chicken brothwith white chicken and veggies','www',4),(18,'Pho',10,'Noodle soup with beef, shrimp or chicken','www',4),(19,'Saigon Noodle Soup',8,'Rice noodles in chicken broth, topped with pork, shrimp and quail egg','www',4),(20,'Basic Bowl',8,'Brown rice with rare round steak','www',4),(21,'Thai Rolls',5,'Crispy rice paper filled with chicken and mixed vegetables, served with sweet chili sauce','www',5),(22,'Mango Curry',10,'Chicken and shrimp with mango chunks in a yellow curry with coconut milk, onions, carrots, tomatoes, and bell peppers','www',5),(23,'Pad Thai',12,'Chicken, and shrimp; stir-fried with rice noodles, egg, scallions, bean sprouts, and ground peanuts','www',5),(24,'Pineapple Fried Rice',12,'Fried rice with chicken, shrimp, egg, pineapple, onion, peas, scallions, and curry powder','www',5),(25,'Mango with sweet sticky rice',7,'Mango with sweet sticky rice','www',5);
/*!40000 ALTER TABLE `Dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `oID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `status` char(10) NOT NULL,
  `sum` float NOT NULL,
  `otime` time NOT NULL,
  `odate` date NOT NULL,
  `cID` mediumint(9) NOT NULL,
  `rID` mediumint(9) NOT NULL,
  PRIMARY KEY (`oID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (1,'Placed',16,'12:30:47','2017-04-24',1,1),(2,'Accepted',30,'12:02:43','2017-04-24',1,1),(3,'Accepted',20,'12:20:32','2017-04-24',1,1),(4,'Delivered',18,'12:23:11','2017-04-24',1,1),(5,'Delivered',10,'12:07:05','2017-04-24',1,1),(6,'Finished',22,'12:15:31','2017-04-23',1,1),(7,'Placed',11,'18:43:56','2017-04-24',2,2),(8,'Placed',15,'18:12:20','2017-04-24',2,2),(9,'Accepted',24,'17:40:35','2017-04-24',2,2),(10,'Delivered',21,'17:46:21','2017-04-24',2,2),(11,'Finished',16,'19:30:21','2017-04-23',2,2);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restaurant`
--

DROP TABLE IF EXISTS `Restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Restaurant` (
  `rID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `rmail` char(20) NOT NULL,
  `rname` char(20) NOT NULL,
  `rpwd` char(20) NOT NULL,
  `tel` int(11) NOT NULL,
  `type` char(10) NOT NULL,
  `city` char(10) NOT NULL,
  `state` char(10) NOT NULL,
  `street` char(20) NOT NULL,
  `rzipcode` char(5) NOT NULL,
  `durl` char(50) NOT NULL,
  PRIMARY KEY (`rID`),
  UNIQUE KEY `rmail` (`rmail`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restaurant`
--

LOCK TABLES `Restaurant` WRITE;
/*!40000 ALTER TABLE `Restaurant` DISABLE KEYS */;
INSERT INTO `Restaurant` VALUES (1,'japan@wpi.edu','Ohayo','Ohayo',6174001,'Japanese','Worcester','MA','280 Main Street','01608','www'),(2,'china@wpi.edu','Dragon','Dragon',6174002,'Chinese','Worcester','MA','115 Highland Street','01609','www'),(3,'america@wpi.edu','Sandwich House','Sandwich',6174003,'American','Worcester','MA','117 Highland Street','01609','www'),(4,'vietnam@wpi.edu','Pho Time','Pho',6174004,'Vietnamese','Worcester','MA','260 Park Ave','01609','www'),(5,'thailand@wpi.edu','The Thai','Thai',6174005,'Thai','Worcester','MA','117 Highland Street','01609','www');
/*!40000 ALTER TABLE `Restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `cartID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `dID` mediumint(9) NOT NULL,
  `rID` mediumint(9) NOT NULL,
  `price` float NOT NULL,
  `cid` char(20) DEFAULT NULL,
  PRIMARY KEY (`cartID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,2,1,6,'1'),(3,3,1,8,'1'),(4,3,1,8,'1'),(5,7,2,12,'1'),(6,7,2,12,'1'),(7,8,2,10,'1'),(8,8,2,10,'1'),(9,9,2,10,'1'),(10,9,2,10,'1'),(11,9,2,10,'1');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
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
INSERT INTO `orderDetail` VALUES (1,1,1),(1,3,1),(2,3,1),(2,4,1),(2,5,1),(3,5,2),(4,3,1),(4,5,1),(5,5,1),(6,1,1),(6,2,1),(6,3,1),(7,6,1),(7,10,1),(8,6,1),(8,7,1),(9,7,2),(10,6,1),(10,9,1),(10,10,1),(11,6,2),(11,8,1);
/*!40000 ALTER TABLE `orderDetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-23 16:25:41

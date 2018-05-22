/*
SQLyog Ultimate v9.63 
MySQL - 5.7.21 : Database - album
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`album` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `album` */

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_image` varchar(50) DEFAULT NULL,
  `meta` text,
  `date` varchar(255) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `album` */

insert  into `album`(`id`,`url_image`,`meta`,`date`) values (1,'/files/city.jpg','<TypePhoto>Портрет</TypePhoto><Place>Казань</Place><Camera>Телефон</Camera><Background>Лес</Background>','1526984118'),(2,'/files/eda.jpg','616126126','1516384118'),(3,'/files/forest.jpg','52525','1546984118'),(4,'/files/ptica.jpg','215215','1526982518'),(5,'/files/shark.jpg',NULL,'1526924118'),(6,'/files/water.jpg',NULL,NULL);

/*Table structure for table `meta_info` */

DROP TABLE IF EXISTS `meta_info`;

CREATE TABLE `meta_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_meta` varchar(55) DEFAULT NULL,
  `info` varchar(55) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `meta_info` */

insert  into `meta_info`(`id`,`type_meta`,`info`) values (1,'Place','Казань'),(2,'Place','Москва'),(3,'Place','Сызрань'),(4,'Camera','Телефон'),(5,'Camera','Зеркалка'),(6,'TypePhoto','Портрет'),(7,'TypePhoto','Пейзаж'),(8,'Background','Лес'),(9,'Background','Студия'),(10,'Background','Город');

/*Table structure for table `meta_name` */

DROP TABLE IF EXISTS `meta_name`;

CREATE TABLE `meta_name` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meta` varchar(55) DEFAULT NULL,
  `name` varchar(55) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `meta_name` */

insert  into `meta_name`(`id`,`meta`,`name`) values (1,'Place','Место'),(2,'Camera','Камера'),(3,'TypePhoto','Тип фото'),(4,'Background','Фон');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

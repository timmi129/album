/*
SQLyog Enterprise Trial - MySQL GUI v7.11 
MySQL - 5.7.19 : Database - album
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`album` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `album`;

/*Table structure for table `album` */

DROP TABLE IF EXISTS `album`;

CREATE TABLE `album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_image` varchar(50) DEFAULT NULL,
  `meta` text,
  `date` varchar(255) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `album` */

insert  into `album`(`id`,`url_image`,`meta`,`date`) values (1,'/files/city.jpg','<TypePhoto>Портрет</TypePhoto><Place>Казань</Place><Camera>Телефон</Camera><Background>Лес</Background>','1526984118'),(2,'/files/eda.jpg','<TypePhoto>Портрет</TypePhoto><Place>Москва</Place><Camera>Зеркалка</Camera><Background>Студия</Background>','1516384118'),(3,'/files/forest.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Ташкент</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1546984118'),(4,'/files/ptica.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Сызрань</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1526982518'),(5,'/files/shark.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Полтава</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1526924118'),(6,'/files/water.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Питер</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1546384118'),(7,'/files/1.jpg','<TypePhoto>Портрет</TypePhoto><Place>Калуга</Place><Camera>Телефон</Camera><Background>Лес</Background>','1556924118'),(8,'/files/2.jpg','<TypePhoto>Портрет</TypePhoto><Place>Киров</Place><Camera>Телефон</Camera><Background>Лес</Background>','1526928118'),(9,'/files/3.jpg','<TypePhoto>Портрет</TypePhoto><Place>Киров</Place><Camera>Телефон</Camera><Background>Студия</Background>','1526124118'),(10,'/files/4.jpg','<TypePhoto>Портрет</TypePhoto><Place>Киров</Place><Camera>Телефон</Camera><Background>Студия</Background>','1526324118'),(11,'/files/5.jpg','<TypePhoto>Портрет</TypePhoto><Place>Сызрань</Place><Camera>Телефон</Camera><Background>Студия</Background>','1526224118'),(12,'/files/6.jpg','<TypePhoto>Портрет</TypePhoto><Place>Москва</Place><Camera>Зеркалка</Camera><Background>Студия</Background>','1522924118'),(13,'/files/7.jpg','<TypePhoto>Портрет</TypePhoto><Place>Калуга</Place><Camera>Телефон</Camera><Background>Лес</Background>','1586924118'),(14,'/files/8.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Полтава</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1326924118'),(15,'/files/9.jpg','<TypePhoto>Портрет</TypePhoto><Place>Калуга</Place><Camera>Телефон</Camera><Background>Лес</Background>','1126924118'),(16,'/files/10.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Ташкент</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1526924158'),(17,'/files/11.jpg','<TypePhoto>Пейзаж</TypePhoto><Place>Питер</Place><Camera>Зеркалка</Camera><Background>Город</Background>','1526964118'),(18,'/files/12.jpg','<TypePhoto>Портрет</TypePhoto><Place>Калуга</Place><Camera>Телефон</Camera><Background>Лес</Background>','1526524118'),(19,'/files/13.jpg','<TypePhoto>Портрет</TypePhoto><Place>Казань</Place><Camera>Телефон</Camera><Background>Лес</Background>','1526923118'),(20,'/files/14.jpg','<TypePhoto>Портрет</TypePhoto><Place>Сызрань</Place><Camera>Телефон</Camera><Background>Студия</Background>','1526922118');

/*Table structure for table `meta_info` */

DROP TABLE IF EXISTS `meta_info`;

CREATE TABLE `meta_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_meta` varchar(55) DEFAULT NULL,
  `info` varchar(55) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `meta_info` */

insert  into `meta_info`(`id`,`type_meta`,`info`) values (1,'Place','Казань'),(2,'Place','Москва'),(3,'Place','Сызрань'),(4,'Camera','Телефон'),(5,'Camera','Зеркалка'),(6,'TypePhoto','Портрет'),(7,'TypePhoto','Пейзаж'),(8,'Background','Лес'),(9,'Background','Студия'),(10,'Background','Город'),(11,'Place','Полтава'),(12,'Place','Питер'),(13,'Place','Калуга'),(14,'Place','Киров'),(15,'Place','Ташкент');

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
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ecommerce
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;

-- Volcando estructura para evento ecommerce.actualizar_inventario_diario
DELIMITER //
CREATE EVENT `actualizar_inventario_diario` ON SCHEDULE EVERY 1 DAY STARTS '2025-08-14 21:22:59' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE Inventario
    SET estadoInventario = 0
    WHERE fechaCaducidad < CURDATE()//
DELIMITER ;

-- Volcando estructura para tabla ecommerce.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `descripcionC` varchar(255) NOT NULL,
  `nombreC` varchar(255) NOT NULL,
  PRIMARY KEY (`idCategoria`)Ñ
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.categoria: ~16 rows (aproximadamente)
INSERT INTO `categoria` (`idCategoria`, `descripcionC`, `nombreC`) VALUES
	(1, 'Pastillas para el dolor', 'Pastillas'),
	(2, 'Medicamentos para aliviar el dolor', 'Analgésicos'),
	(3, 'Medicamentos para tratar infecciones bacterianas', 'Antibióticos'),
	(4, 'Reducen inflamación y dolor', 'Antiinflamatorios'),
	(5, 'Tratan síntomas de alergia', 'Antialérgicos'),
	(6, 'Medicamentos para bajar la fiebre', 'Antipiréticos'),
	(7, 'Regulan los niveles de glucosa en sangre', 'Antidiabéticos'),
	(8, 'Medicamentos para la presión arterial alta', 'Antihipertensivos'),
	(9, 'Tratan trastornos del estado de ánimo', 'Antidepresivos'),
	(10, 'Medicamentos para evitar el embarazo', 'Anticonceptivos'),
	(11, 'Tratan infecciones causadas por virus', 'Antivirales'),
	(12, 'Facilitan la respiración abriendo las vías respiratorias', 'Broncodilatadores'),
	(13, 'Ayudan a aliviar el estreñimiento', 'Laxantes'),
	(14, 'Productos para mejorar la nutrición', 'Vitaminas y suplementos'),
	(15, 'Bloquean la sensibilidad al dolor durante procedimientos', 'Anestésicos'),
	(16, 'Previenen o controlan el vómito y las náuseas', 'Antieméticos');

-- Volcando estructura para tabla ecommerce.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(120) NOT NULL,
  `Apellido` varchar(120) NOT NULL,
  `NIT` varchar(10) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `mayorista` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estadoCliente` tinyint NOT NULL DEFAULT '1',
  `idMunicipio` int DEFAULT NULL,
  `idDepartamento` int DEFAULT NULL,
  `idUsuario` int DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  KEY `IX_Relationship9` (`idMunicipio`),
  KEY `IX_Relationship16` (`idDepartamento`),
  KEY `IX_Relationship22` (`idUsuario`),
  CONSTRAINT `Relationship16` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Relationship22` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Relationship9` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio` (`idMunicipio`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.cliente: ~0 rows (aproximadamente)
INSERT INTO `cliente` (`idCliente`, `Nombre`, `Apellido`, `NIT`, `direccion`, `telefono`, `mayorista`, `createdAt`, `updatedAt`, `estadoCliente`, `idMunicipio`, `idDepartamento`, `idUsuario`) VALUES
	(1, 'Juan', 'Pérez', '1234', 'San Marcos', NULL, 0, '2025-07-01 06:00:01', '2025-07-24 03:04:32', 1, 1, 1, 1),
	(2, 'wilson', 'Cabrera', 'CF', '', '', 0, '2025-08-14 18:56:42', '2025-08-14 18:56:42', 1, NULL, NULL, 3),
	(4, 'Carlos', 'Ciguenza', 'CF', '', '', 0, '2025-08-15 02:45:31', '2025-08-15 02:45:31', 1, NULL, NULL, 5);

-- Volcando estructura para tabla ecommerce.compra
CREATE TABLE IF NOT EXISTS `compra` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `fechaC` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalCompra` decimal(8,2) NOT NULL,
  `idUsuario` int DEFAULT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `IX_Relationship20` (`idUsuario`),
  CONSTRAINT `Relationship20` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.compra: ~8 rows (aproximadamente)
INSERT INTO `compra` (`idCompra`, `fechaC`, `totalCompra`, `idUsuario`) VALUES
	(4, '2025-08-05 09:32:37', 900.00, 1),
	(5, '2025-08-10 16:19:22', 450.00, 1),
	(6, '2025-08-10 17:25:16', 108.00, 1),
	(7, '2025-08-10 18:24:55', 102.00, 1),
	(8, '2025-08-10 18:44:14', 4.50, 1),
	(9, '2025-08-10 18:48:00', 3.00, 1),
	(10, '2025-08-10 18:49:46', 3.00, 1),
	(11, '2025-08-10 18:50:44', 3.00, 1),
	(12, '2025-08-10 18:56:52', 3.00, 1),
	(13, '2025-08-10 20:17:54', 43.00, 1);

-- Volcando estructura para tabla ecommerce.departamento
CREATE TABLE IF NOT EXISTS `departamento` (
  `idDepartamento` int NOT NULL AUTO_INCREMENT,
  `nombreD` varchar(30) NOT NULL,
  PRIMARY KEY (`idDepartamento`),
  UNIQUE KEY `nombreC` (`nombreD`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.departamento: ~0 rows (aproximadamente)
INSERT INTO `departamento` (`idDepartamento`, `nombreD`) VALUES
	(1, 'San Marcos');

-- Volcando estructura para tabla ecommerce.detallecompra
CREATE TABLE IF NOT EXISTS `detallecompra` (
  `idDetalleCompra` int NOT NULL AUTO_INCREMENT,
  `subTotal` decimal(8,2) NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `idCompra` int DEFAULT NULL,
  `idInventario` int DEFAULT NULL,
  PRIMARY KEY (`idDetalleCompra`),
  KEY `IX_Relationship6` (`idCompra`),
  KEY `IX_Relationship21` (`idInventario`),
  CONSTRAINT `Relationship21` FOREIGN KEY (`idInventario`) REFERENCES `inventario` (`idInventario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Relationship6` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`idCompra`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.detallecompra: ~20 rows (aproximadamente)
INSERT INTO `detallecompra` (`idDetalleCompra`, `subTotal`, `cantidad`, `precio`, `idCompra`, `idInventario`) VALUES
	(3, 900.00, 100, 9.00, 4, 2),
	(4, 450.00, 50, 9.00, 5, 1),
	(5, 18.00, 2, 9.00, 6, 1),
	(6, 90.00, 10, 9.00, 6, 2),
	(7, 45.00, 10, 4.50, 7, 3),
	(8, 15.00, 5, 3.00, 7, 4),
	(9, 21.00, 7, 3.00, 7, 5),
	(10, 21.00, 7, 3.00, 7, 6),
	(11, 4.50, 1, 4.50, 8, 3),
	(12, 3.00, 1, 3.00, 9, 4),
	(13, 3.00, 1, 3.00, 10, 4),
	(14, 3.00, 1, 3.00, 11, 4),
	(15, 3.00, 1, 3.00, 12, 4),
	(16, 9.00, 1, 9.00, 13, 1),
	(17, 9.00, 1, 9.00, 13, 2),
	(18, 3.00, 1, 3.00, 13, 4),
	(19, 3.00, 1, 3.00, 13, 5),
	(20, 4.50, 1, 4.50, 13, 3),
	(21, 3.00, 1, 3.00, 13, 6),
	(22, 11.50, 1, 11.50, 13, 7);

-- Volcando estructura para tabla ecommerce.detallefactura
CREATE TABLE IF NOT EXISTS `detallefactura` (
  `idDetalleFactura` int NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cantidad` int NOT NULL,
  `precio` decimal(8,2) DEFAULT NULL,
  `subTotal` decimal(8,2) DEFAULT NULL,
  `idFactura` int DEFAULT NULL,
  `idInventario` int DEFAULT NULL,
  PRIMARY KEY (`idDetalleFactura`),
  KEY `IX_Relationship4` (`idFactura`),
  KEY `IX_Relationship15` (`idInventario`),
  CONSTRAINT `Relationship15` FOREIGN KEY (`idInventario`) REFERENCES `inventario` (`idInventario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Relationship4` FOREIGN KEY (`idFactura`) REFERENCES `factura` (`idFactura`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.detallefactura: ~21 rows (aproximadamente)
INSERT INTO `detallefactura` (`idDetalleFactura`, `fecha`, `cantidad`, `precio`, `subTotal`, `idFactura`, `idInventario`) VALUES
	(1, '2025-07-23 21:39:23', 4, 0.00, 0.00, 15, 6),
	(2, '2025-07-24 20:32:45', 4, 0.00, 0.00, 16, 2),
	(3, '2025-07-24 20:36:17', 4, 0.00, 0.00, 17, 2),
	(4, '2025-07-24 20:50:21', 4, 0.00, 0.00, 18, 2),
	(7, '2025-07-24 21:00:12', 4, 0.00, 0.00, 21, 2),
	(8, '2025-07-24 21:00:40', 4, 0.00, 0.00, 22, 2),
	(9, '2025-07-24 21:00:40', 1, 0.00, 0.00, 22, 1),
	(10, '2025-07-25 22:16:11', 4, 0.00, 0.00, 23, 6),
	(11, '2025-07-25 22:16:13', 4, 0.00, 0.00, 24, 6),
	(12, '2025-08-01 23:51:54', 5, 10.00, 50.00, 25, 1),
	(13, '2025-08-01 23:51:54', 6, 5.00, 30.00, 25, 3),
	(14, '2025-08-02 16:26:19', 7, 5.00, 35.00, 26, 3),
	(15, '2025-08-02 16:33:13', 7, 5.00, 35.00, 27, 3),
	(16, '2025-08-02 16:33:13', 1, 4.25, 4.25, 27, 4),
	(17, '2025-08-02 16:48:31', 1, 4.00, 4.00, 28, 6),
	(18, '2025-08-02 17:15:42', 3, 4.25, 12.75, 29, 4),
	(19, '2025-08-04 10:59:40', 3, 12.50, 37.50, 30, 1),
	(20, '2025-08-04 12:03:01', 1, 15.75, 15.75, 31, 7),
	(21, '2025-08-04 12:46:00', 7, 10.00, 70.00, 32, 1),
	(22, '2025-08-04 12:46:00', 6, 5.00, 30.00, 32, 3),
	(23, '2025-08-04 12:46:00', 4, 3.20, 12.80, 32, 6),
	(24, '2025-08-05 09:43:49', 7, 10.00, 70.00, 33, 2),
	(25, '2025-08-06 21:07:33', 7, 10.00, 70.00, 34, 2),
	(26, '2025-08-06 21:08:53', 7, 10.00, 70.00, 35, 2),
	(27, '2025-08-14 18:24:18', 3, 6.00, 18.00, 36, 11),
	(28, '2025-08-14 18:26:46', 3, 2.00, 6.00, 37, 12);

-- Volcando estructura para tabla ecommerce.empleado
CREATE TABLE IF NOT EXISTS `empleado` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `nombreEmpleado` varchar(40) NOT NULL,
  `idUsuario` int NOT NULL,
  `salario` decimal(8,2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `IX_Relationship25` (`idUsuario`),
  CONSTRAINT `Relationship25` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.empleado: ~0 rows (aproximadamente)

-- Volcando estructura para tabla ecommerce.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `idFactura` int NOT NULL AUTO_INCREMENT,
  `total` decimal(8,2) NOT NULL,
  `numFactura` varchar(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idCliente` int DEFAULT NULL,
  PRIMARY KEY (`idFactura`),
  KEY `IX_Relationship2` (`idCliente`),
  CONSTRAINT `Relationship2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.factura: ~13 rows (aproximadamente)
INSERT INTO `factura` (`idFactura`, `total`, `numFactura`, `fecha`, `idCliente`) VALUES
	(15, 100.00, 'AAAE1', '2025-07-23 21:39:23', 1),
	(16, 100.00, 'AAAE1', '2025-07-24 20:32:45', 1),
	(17, 100.00, 'AAAE1', '2025-07-24 20:36:17', 1),
	(18, 100.00, 'AAAE1', '2025-07-24 20:50:21', 1),
	(21, 40.00, 'AAAE1', '2025-07-24 21:00:12', 1),
	(22, 50.00, 'AAAE1', '2025-07-24 21:00:40', 1),
	(23, 12.80, 'AAAE1', '2025-07-25 22:16:11', 1),
	(24, 12.80, 'AAAE1', '2025-07-25 22:16:13', 1),
	(25, 80.00, 'AAAE1', '2025-08-01 23:51:54', 1),
	(26, 35.00, 'AAAE1', '2025-08-02 16:26:18', 1),
	(27, 39.25, 'AAAE1', '2025-08-02 16:33:13', 1),
	(28, 4.00, 'DZHD8', '2025-08-02 16:48:31', 1),
	(29, 12.75, 'CVMB1', '2025-08-02 17:15:42', 1),
	(30, 37.50, 'KRZC6', '2025-08-04 10:59:40', 1),
	(31, 15.75, 'XIDA7', '2025-08-04 12:03:01', 1),
	(32, 112.80, 'JAGR4', '2025-08-04 12:46:00', 1),
	(33, 70.00, 'MDYE4', '2025-08-05 09:43:49', 1),
	(34, 70.00, 'MNAR0', '2025-08-06 21:07:33', 1),
	(35, 70.00, 'ICPW2', '2025-08-06 21:08:53', 1),
	(36, 18.00, 'IJUJ3', '2025-08-14 18:24:17', 2),
	(37, 6.00, 'TWHL5', '2025-08-14 18:26:46', 2);

-- Volcando estructura para tabla ecommerce.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `idInventario` int NOT NULL AUTO_INCREMENT,
  `fechaIngreso` datetime NOT NULL,
  `fechaCaducidad` datetime NOT NULL,
  `lote` varchar(30) NOT NULL,
  `cantidad` int NOT NULL,
  `estadoInventario` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idProducto` int DEFAULT NULL,
  PRIMARY KEY (`idInventario`),
  UNIQUE KEY `lote` (`lote`),
  KEY `IX_Relationship1` (`idProducto`),
  CONSTRAINT `Relationship1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.inventario: ~9 rows (aproximadamente)
INSERT INTO `inventario` (`idInventario`, `fechaIngreso`, `fechaCaducidad`, `lote`, `cantidad`, `estadoInventario`, `createdAt`, `updatedAt`, `idProducto`) VALUES
	(1, '2025-07-01 08:30:00', '2025-12-01 00:00:00', 'Lote-A001', 100, 1, '2025-07-24 03:04:32', '2025-08-11 02:23:53', 1),
	(2, '2025-07-10 10:00:00', '2025-11-15 00:00:00', 'Lote-A002', 50, 1, '2025-07-24 03:04:32', '2025-08-11 02:23:59', 1),
	(3, '2025-07-05 09:00:00', '2025-10-10 00:00:00', 'Lote-B001', 118, 1, '2025-07-24 03:04:32', '2025-08-11 02:17:54', 2),
	(4, '2025-06-28 07:45:00', '2025-10-30 00:00:00', 'Lote-C001', 20, 1, '2025-07-24 03:04:32', '2025-08-11 02:23:37', 3),
	(5, '2025-07-15 11:15:00', '2025-11-30 00:00:00', 'Lote-C002', 58, 1, '2025-07-24 03:04:32', '2025-08-11 02:17:54', 3),
	(6, '2025-07-12 13:30:00', '2025-12-31 00:00:00', 'Lote-D001', 94, 1, '2025-07-24 03:04:32', '2025-08-11 02:17:54', 4),
	(7, '2025-07-02 08:00:00', '2025-10-20 00:00:00', 'Lote-E001', 25, 1, '2025-07-24 03:04:32', '2025-08-11 02:17:54', 5),
	(10, '2025-08-12 18:00:00', '2025-12-29 18:00:00', 'Lote-Z001', 20, 1, '2025-08-14 02:14:59', '2025-08-14 02:14:59', 4),
	(11, '2025-08-13 00:00:00', '2025-08-28 00:00:00', 'Lote-Z002', 30, 1, '2025-08-14 02:54:02', '2025-08-15 00:24:20', 9),
	(12, '2025-08-13 00:00:00', '2025-12-25 00:00:00', 'Lote-Z003', 7, 1, '2025-08-14 03:00:31', '2025-08-15 00:26:46', 6);

-- Volcando estructura para tabla ecommerce.movimientoinventario
CREATE TABLE IF NOT EXISTS `movimientoinventario` (
  `idMovimientoInventario` int NOT NULL AUTO_INCREMENT,
  `cantidadM` int NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idInventario` int DEFAULT NULL,
  `idTipoMovimiento` int DEFAULT NULL,
  PRIMARY KEY (`idMovimientoInventario`),
  KEY `IX_Relationship13` (`idInventario`),
  KEY `IX_Relationship14` (`idTipoMovimiento`),
  CONSTRAINT `Relationship13` FOREIGN KEY (`idInventario`) REFERENCES `inventario` (`idInventario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Relationship14` FOREIGN KEY (`idTipoMovimiento`) REFERENCES `tipomovimiento` (`idTipoMovimiento`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.movimientoinventario: ~37 rows (aproximadamente)
INSERT INTO `movimientoinventario` (`idMovimientoInventario`, `cantidadM`, `fecha`, `idInventario`, `idTipoMovimiento`) VALUES
	(1, 4, '2025-07-24 20:50:21', 2, 1),
	(4, 4, '2025-07-24 21:00:12', 2, 1),
	(5, 4, '2025-07-24 21:00:40', 2, 1),
	(6, 1, '2025-07-24 21:00:40', 1, 1),
	(7, 4, '2025-07-25 22:16:11', 6, 1),
	(8, 4, '2025-07-25 22:16:13', 6, 1),
	(9, 5, '2025-08-01 23:51:54', 1, 1),
	(10, 6, '2025-08-01 23:51:54', 3, 1),
	(11, 7, '2025-08-02 16:26:19', 3, 1),
	(12, 7, '2025-08-02 16:33:13', 3, 1),
	(13, 1, '2025-08-02 16:33:13', 4, 1),
	(14, 1, '2025-08-02 16:48:31', 6, 1),
	(15, 3, '2025-08-02 17:15:42', 4, 1),
	(16, 3, '2025-08-04 10:59:40', 1, 1),
	(17, 1, '2025-08-04 12:03:01', 7, 1),
	(18, 7, '2025-08-04 12:46:00', 1, 1),
	(19, 6, '2025-08-04 12:46:00', 3, 1),
	(20, 4, '2025-08-04 12:46:00', 6, 1),
	(23, 100, '2025-08-05 09:32:37', 2, 2),
	(24, 7, '2025-08-05 09:43:49', 2, 1),
	(25, 7, '2025-08-06 21:07:33', 2, 1),
	(26, 7, '2025-08-06 21:08:53', 2, 1),
	(27, 50, '2025-08-10 16:19:22', 1, 2),
	(28, 2, '2025-08-10 17:25:16', 1, 2),
	(29, 10, '2025-08-10 17:25:16', 2, 2),
	(30, 10, '2025-08-10 18:24:55', 3, 2),
	(31, 5, '2025-08-10 18:24:55', 4, 2),
	(32, 7, '2025-08-10 18:24:55', 5, 2),
	(33, 7, '2025-08-10 18:24:55', 6, 2),
	(34, 1, '2025-08-10 18:44:14', 3, 2),
	(35, 1, '2025-08-10 18:48:00', 4, 2),
	(36, 1, '2025-08-10 18:49:46', 4, 2),
	(37, 1, '2025-08-10 18:50:44', 4, 2),
	(38, 1, '2025-08-10 18:56:52', 4, 2),
	(39, 1, '2025-08-10 20:17:54', 1, 2),
	(40, 1, '2025-08-10 20:17:54', 2, 2),
	(41, 1, '2025-08-10 20:17:54', 4, 2),
	(42, 1, '2025-08-10 20:17:54', 5, 2),
	(43, 1, '2025-08-10 20:17:54', 3, 2),
	(44, 1, '2025-08-10 20:17:54', 6, 2),
	(45, 1, '2025-08-10 20:17:54', 7, 2),
	(48, 3, '2025-08-14 18:24:21', 11, 1),
	(49, 3, '2025-08-14 18:26:46', 12, 1);

-- Volcando estructura para tabla ecommerce.municipio
CREATE TABLE IF NOT EXISTS `municipio` (
  `idMunicipio` int NOT NULL AUTO_INCREMENT,
  `nombreM` varchar(30) NOT NULL,
  `idDepartamento` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMunicipio`),
  UNIQUE KEY `nombreM` (`nombreM`),
  KEY `FK_municipio_departamento` (`idDepartamento`),
  CONSTRAINT `FK_municipio_departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.municipio: ~1 rows (aproximadamente)
INSERT INTO `municipio` (`idMunicipio`, `nombreM`, `idDepartamento`, `createdAt`, `updatedAT`) VALUES
	(1, 'San Marcos', 1, '2025-08-08 18:49:41', '2025-08-08 18:49:41');

-- Volcando estructura para tabla ecommerce.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreP` varchar(40) NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `stockActual` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `stockMinimo` int DEFAULT '7',
  `imagen` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `estadoProducto` tinyint NOT NULL DEFAULT '1',
  `precioMayoreo` decimal(8,2) NOT NULL,
  `precioCompra` decimal(8,2) DEFAULT NULL,
  `marca` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idCategoria` int DEFAULT NULL,
  PRIMARY KEY (`idProducto`),
  UNIQUE KEY `nombreP` (`nombreP`),
  KEY `IX_Relationship11` (`idCategoria`),
  CONSTRAINT `Relationship11` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.producto: ~6 rows (aproximadamente)
INSERT INTO `producto` (`idProducto`, `nombreP`, `precio`, `stockActual`, `descripcion`, `stockMinimo`, `imagen`, `estadoProducto`, `precioMayoreo`, `precioCompra`, `marca`, `idCategoria`) VALUES
	(1, 'Amoxicilina 500mg', 12.50, 5, 'Antibiótico de amplio espectro en cápsulas.', 7, 'https://colsubsidio.vteximg.com.br/arquivos/ids/160862-1200-1200/7702605100309.jpg?v=637111976003900000', 1, 10.00, 9.00, 'Genfar', 2),
	(2, 'Ibuprofeno 400mg', 6.00, 50, 'Antiinflamatorio y analgésico común.', 5, 'https://walmartgt.vtexassets.com/arquivos/ids/466273/Analg-sico-Ibuprofeno-Advil-12-Tabletas-Caja-200mg-2-59877.jpg?v=638419036749800000', 1, 5.00, 4.50, 'Advil', 3),
	(3, 'Loratadina 10mg', 4.25, 40, 'Antialérgico para aliviar estornudos y picazón.', 6, 'https://www.clarityne.com.co/sites/g/files/vrxlpx36421/files/2023-12/prod-1.png', 1, 3.50, 3.00, 'Claritin', 4),
	(4, 'Paracetamol 500mg', 4.00, 60, 'Reduce la fiebre y el dolor leve.', 5, 'https://i0.wp.com/babycentergt.com/wp-content/uploads/2024/02/P005309.jpg?fit=800%2C800&ssl=1', 1, 3.20, 3.00, 'Tylenol', 5),
	(5, 'Cefalexina 500mg', 15.75, 25, 'Tratamiento de infecciones respiratorias o urinarias.', 8, 'https://s3.amazonaws.com/online.storage/MEDCO/Products/811fa26e-c87c-4e45-a868-5937c24dc32f.png', 1, 12.00, 11.50, 'MK', 2),
	(6, 'Tabcin Extra Fuerte', 2.00, 3, 'Para la gripe y tos', 7, 'https://distribuidoraalcance.com/wp-content/uploads/Tabcin-Extra-Fuerte.jpg', 1, 1.50, 1.20, 'Bayern', 6),
	(9, 'Tabcin Noche', 6.00, 3, 'Para la gripe y tos', 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO05KpcXt1GBKwOxlbFfvUpFbPrKKz4ahzdw&s', 1, 5.00, 4.00, 'Bayern', 5);

-- Volcando estructura para tabla ecommerce.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `idRol` int NOT NULL,
  `nombreR` varchar(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE KEY `idRol` (`idRol`),
  UNIQUE KEY `nombreR` (`nombreR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.rol: ~2 rows (aproximadamente)
INSERT INTO `rol` (`idRol`, `nombreR`, `descripcion`) VALUES
	(1, 'Cliente', NULL),
	(2, 'Administrador', NULL),
	(3, 'Vendedor', NULL),
	(4, 'Gerente', NULL);

-- Volcando estructura para procedimiento ecommerce.sp_ActualizarClienteParcial
DELIMITER //
CREATE PROCEDURE `sp_ActualizarClienteParcial`(
    IN p_idCliente INT,
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_nit VARCHAR(20),
    IN p_direccion VARCHAR(255),
    IN p_telefono VARCHAR(20),
    IN p_mayorista BOOLEAN,
    IN p_idMunicipio INT,
    IN p_email VARCHAR(100),
    IN p_estadoUsuario BOOLEAN,
    IN p_idRol INT,
    IN p_password VARCHAR(255)
  )
BEGIN
    DECLARE v_idUsuario INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    SELECT idUsuario INTO v_idUsuario FROM cliente WHERE idCliente = p_idCliente;
    
    START TRANSACTION;
	 
	 UPDATE cliente 
    SET 
        nombre = IFNULL(p_nombre, nombre),
        apellido = IFNULL(p_apellido, apellido),
        nit = IFNULL(p_nit, nit),
        direccion = IFNULL(p_direccion, direccion),
        telefono = IFNULL(p_telefono, telefono),
        mayorista = IFNULL(p_mayorista, mayorista),
        idMunicipio = IFNULL(p_idMunicipio, idMunicipio)
    WHERE idCliente = p_idCliente;
    
    IF p_email IS NOT NULL OR p_estadoUsuario IS NOT NULL OR p_idRol IS NOT NULL OR p_password IS NOT NULL THEN
        UPDATE usuario
        SET
            email = IFNULL(p_email, email),
            estadoUsuario = IFNULL(p_estadoUsuario, estadoUsuario),
            idRol = IFNULL(p_idRol, idRol),
            password = IFNULL(p_password, password)
    WHERE idUsuario = v_idUsuario;
    END IF;
    
    COMMIT;
	 
	 SELECT 
        c.idCliente,
        c.nombre,
        c.apellido,
        c.nit,
        c.direccion,
        c.telefono,
        c.mayorista,
        m.nombreM AS municipio,
        d.nombreD AS departamento,
        u.email,
        u.estadoUsuario,
        r.nombreR AS rol
    FROM cliente c
    JOIN usuario u ON c.idUsuario = u.idUsuario
    JOIN rol r ON u.idRol = r.idRol
    JOIN municipio m ON c.idMunicipio = m.idMunicipio
    JOIN departamento d ON m.idDepartamento = d.idDepartamento
    WHERE c.idCliente = p_idCliente;
END//
DELIMITER ;

-- Volcando estructura para procedimiento ecommerce.sp_ActualizarClienteParcialPorUsuario
DELIMITER //
CREATE PROCEDURE `sp_ActualizarClienteParcialPorUsuario`(
    IN p_idUsuario INT,
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_nit VARCHAR(20),
    IN p_direccion VARCHAR(255),
    IN p_telefono VARCHAR(20),
    IN p_mayorista BOOLEAN,
    IN p_idMunicipio INT,
    IN p_email VARCHAR(100),
    IN p_estadoUsuario BOOLEAN,
    IN p_idRol INT,
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    
    UPDATE cliente 
    SET 
        nombre = IFNULL(p_nombre, nombre),
        apellido = IFNULL(p_apellido, apellido),
        nit = IFNULL(p_nit, nit),
        direccion = IFNULL(p_direccion, direccion),
        telefono = IFNULL(p_telefono, telefono),
        mayorista = IFNULL(p_mayorista, mayorista),
        idMunicipio = IFNULL(p_idMunicipio, idMunicipio)
    WHERE idUsuario = p_idUsuario;
    
    IF p_email IS NOT NULL OR p_estadoUsuario IS NOT NULL OR p_idRol IS NOT NULL OR p_password IS NOT NULL THEN
        UPDATE usuario
        SET
            email = IFNULL(p_email, email),
            estadoUsuario = IFNULL(p_estadoUsuario, estadoUsuario),
            idRol = IFNULL(p_idRol, idRol),
            password = IFNULL(p_password, password)
        WHERE idUsuario = p_idUsuario;
    END IF;

    COMMIT;
    
    SELECT 
        c.idCliente,
        c.nombre,
        c.apellido,
        c.nit,
        c.direccion,
        c.telefono,
        c.mayorista,
        m.nombreM AS municipio,
        d.nombreD AS departamento,
        u.email,
        u.estadoUsuario,
        r.nombreR AS rol
    FROM cliente c
    JOIN usuario u ON c.idUsuario = u.idUsuario
    JOIN rol r ON u.idRol = r.idRol
    JOIN municipio m ON c.idMunicipio = m.idMunicipio
    JOIN departamento d ON m.idDepartamento = d.idDepartamento
    WHERE c.idUsuario = p_idUsuario;
END//
DELIMITER ;

-- Volcando estructura para procedimiento ecommerce.sp_CrearUsuarioCliente
DELIMITER //
CREATE PROCEDURE `sp_CrearUsuarioCliente`(
	IN `p_email` VARCHAR(255),
	IN `p_password` VARCHAR(255),
	IN `p_mayorista` BOOLEAN,
	IN `p_nombre` VARCHAR(100),
	IN `p_apellido` VARCHAR(100),
	IN `p_nit` VARCHAR(20),
	IN `p_direccion` VARCHAR(255),
	IN `p_telefono` VARCHAR(20),
	IN `p_idMunicipio` INT,
	OUT `p_resultado` INT,
	OUT `p_mensaje` VARCHAR(255)
)
BEGIN
    DECLARE v_idUsuario INT;
    DECLARE v_idRolCliente INT DEFAULT 1;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_resultado = 0;
        SET p_mensaje = CONCAT('Error al crear usuario-cliente: ', v_error_msg);
    END;

    START TRANSACTION;

    IF EXISTS (SELECT 1 FROM usuario WHERE email = p_email) THEN
        SET p_resultado = 0;
        SET p_mensaje = 'El email ya está registrado';
        ROLLBACK;
    ELSE
        INSERT INTO usuario (email, password, idRol)
        VALUES (p_email, p_password, v_idRolCliente);
        
        SET v_idUsuario = LAST_INSERT_ID();
        
        INSERT INTO cliente (mayorista, nombre, apellido, nit, direccion, telefono, idMunicipio, idUsuario, estadoCliente)
        VALUES (p_mayorista, p_nombre, p_apellido, p_nit, p_direccion, p_telefono, p_idMunicipio, v_idUsuario, true);
        
        COMMIT;
        
        SET p_resultado = 1;
        SET p_mensaje = 'Usuario-cliente creado exitosamente';
    END IF;
END//
DELIMITER ;

-- Volcando estructura para tabla ecommerce.tipomovimiento
CREATE TABLE IF NOT EXISTS `tipomovimiento` (
  `idTipoMovimiento` int NOT NULL,
  `tipoM` varchar(30) NOT NULL,
  PRIMARY KEY (`idTipoMovimiento`),
  UNIQUE KEY `idTipoMovimiento` (`idTipoMovimiento`),
  UNIQUE KEY `tipoM` (`tipoM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.tipomovimiento: ~0 rows (aproximadamente)
INSERT INTO `tipomovimiento` (`idTipoMovimiento`, `tipoM`) VALUES
	(2, 'Compra'),
	(1, 'Venta');

-- Volcando estructura para tabla ecommerce.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `estadoUsuario` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(255) NOT NULL,
  `idRol` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `IDX_2863682842e688ca198eb25c12` (`email`),
  KEY `FK_usuario_rol` (`idRol`),
  CONSTRAINT `FK_usuario_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla ecommerce.usuario: ~5 rows (aproximadamente)
INSERT INTO `usuario` (`idUsuario`, `password`, `estadoUsuario`, `createdAt`, `updatedAt`, `email`, `idRol`) VALUES
	(1, '$2b$10$6YCbSazebSIKpPMsv2j.1uaUcuIL7/9kMrpoLjat3w91B1m1ZrLNK', 1, '2025-07-22 00:54:18', '2025-08-13 19:45:47', 'hola@gmail.com', 2),
	(2, '$2b$10$j4mh5mVo1LizU1gkCIRvz.3KxYEvCed7Yz0iLPKntM/.Yn3vDDLD2', 1, '2025-08-14 18:42:55', '2025-08-14 18:42:55', 'wilson@gmail.com', 1),
	(3, '$2b$10$L58qukVxUbqU/n7ybGYtRumk0HLDqeVBYg997yll2rdkZSlfdOLre', 1, '2025-08-14 18:56:42', '2025-08-14 18:56:42', 'wilson1@gmail.com', 1),
	(4, '$2b$10$lSe2iIU/mQPwfTSY9fYt0OXezOtYcOMXTJ.VjTuogzYZrsh923Iaq', 1, '2025-08-14 23:25:08', '2025-08-14 23:25:08', 'jose@gmail.com', 1),
	(5, '$2b$10$gpoBiHLizskmnyEbzZ4tkeNZGnvcixJ14aS5PtvOQ72E8WxNOQxUu', 1, '2025-08-15 02:45:31', '2025-08-15 02:45:31', 'carlos@gmail.com', 1);

-- Volcando estructura para disparador ecommerce.actualizar_estado_inventario
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `actualizar_estado_inventario` BEFORE UPDATE ON `inventario` FOR EACH ROW BEGIN
    IF NEW.fechaCaducidad < CURDATE() THEN
        SET NEW.estadoInventario = 0;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

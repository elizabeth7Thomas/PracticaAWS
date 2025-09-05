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

-- Volcando datos para la tabla ecommerce.cliente: ~0 rows (aproximadamente)
INSERT INTO `cliente` (`idCliente`, `Nombre`, `Apellido`, `NIT`, `direccion`, `telefono`, `mayorista`, `createdAt`, `updatedAt`, `estadoCliente`, `idMunicipio`, `idDepartamento`, `idUsuario`) VALUES
	(1, 'Juan', 'Pérez', '1234', 'San Marcos', NULL, 0, '2025-07-01 06:00:01', '2025-07-24 03:04:32', 1, 1, 1, 1);

-- Volcando datos para la tabla ecommerce.compra: ~0 rows (aproximadamente)

-- Volcando datos para la tabla ecommerce.departamento: ~0 rows (aproximadamente)
INSERT INTO `departamento` (`idDepartamento`, `nombreD`) VALUES
	(1, 'San Marcos');

-- Volcando datos para la tabla ecommerce.detallecompra: ~0 rows (aproximadamente)

-- Volcando datos para la tabla ecommerce.detallefactura: ~11 rows (aproximadamente)
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
	(18, '2025-08-02 17:15:42', 3, 4.25, 12.75, 29, 4);

-- Volcando datos para la tabla ecommerce.empleado: ~0 rows (aproximadamente)

-- Volcando datos para la tabla ecommerce.factura: ~9 rows (aproximadamente)
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
	(29, 12.75, 'CVMB1', '2025-08-02 17:15:42', 1);

-- Volcando datos para la tabla ecommerce.inventario: ~7 rows (aproximadamente)
INSERT INTO `inventario` (`idInventario`, `fechaIngreso`, `fechaCaducidad`, `lote`, `cantidad`, `estadoInventario`, `createdAt`, `updatedAt`, `idProducto`) VALUES
	(1, '2025-07-01 08:30:00', '2025-12-01 00:00:00', 'Lote-A001', 24, 1, '2025-07-24 03:04:32', '2025-08-02 05:51:54', 1),
	(2, '2025-07-10 10:00:00', '2025-11-15 00:00:00', 'Lote-A002', 0, 1, '2025-07-24 03:04:32', '2025-07-25 03:00:40', 1),
	(3, '2025-07-05 09:00:00', '2025-10-10 00:00:00', 'Lote-B001', 30, 1, '2025-07-24 03:04:32', '2025-08-02 22:33:13', 2),
	(4, '2025-06-28 07:45:00', '2025-09-30 00:00:00', 'Lote-C001', 36, 1, '2025-07-24 03:04:32', '2025-08-02 23:15:42', 3),
	(5, '2025-07-15 11:15:00', '2025-11-30 00:00:00', 'Lote-C002', 25, 1, '2025-07-24 03:04:32', '2025-07-24 03:04:32', 3),
	(6, '2025-07-12 13:30:00', '2025-12-31 00:00:00', 'Lote-D001', 47, 1, '2025-07-24 03:04:32', '2025-08-02 22:48:31', 4),
	(7, '2025-07-02 08:00:00', '2025-10-20 00:00:00', 'Lote-E001', 25, 1, '2025-07-24 03:04:32', '2025-07-24 03:04:32', 5);

-- Volcando datos para la tabla ecommerce.movimientoinventario: ~11 rows (aproximadamente)
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
	(15, 3, '2025-08-02 17:15:42', 4, 1);

-- Volcando datos para la tabla ecommerce.municipio: ~0 rows (aproximadamente)
INSERT INTO `municipio` (`idMunicipio`, `nombreM`) VALUES
	(1, 'San Marcos');

-- Volcando datos para la tabla ecommerce.producto:
INSERT INTO `producto` (`idProducto`, `nombreP`, `precio`, `stockActual`, `descripcion`, `stockMinimo`, `imagen`, `estadoProducto`, `precioMayoreo`, `precioCompra`, `marca`, `idCategoria`) VALUES
	(1, 'Amoxicilina 500mg', 12.50, 5, 'Antibiótico de amplio espectro en cápsulas.', 7, 'https://colsubsidio.vteximg.com.br/arquivos/ids/160862-1200-1200/7702605100309.jpg?v=637111976003900000', 1, 10.00, 9.00, 'Genfar', 2),
	(2, 'Ibuprofeno 400mg', 6.00, 50, 'Antiinflamatorio y analgésico común.', 5, 'https://walmartgt.vtexassets.com/arquivos/ids/466273/Analg-sico-Ibuprofeno-Advil-12-Tabletas-Caja-200mg-2-59877.jpg?v=638419036749800000', 1, 5.00, 4.50, 'Advil', 3),
	(3, 'Loratadina 10mg', 4.25, 40, 'Antialérgico para aliviar estornudos y picazón.', 6, 'https://www.clarityne.com.co/sites/g/files/vrxlpx36421/files/2023-12/prod-1.png', 1, 3.50, 3.00, 'Claritin', 4),
	(4, 'Paracetamol 500mg', 4.00, 60, 'Reduce la fiebre y el dolor leve.', 5, 'https://i0.wp.com/babycentergt.com/wp-content/uploads/2024/02/P005309.jpg?fit=800%2C800&ssl=1', 1, 3.20, 3.00, 'Tylenol', 5),
	(5, 'Cefalexina 500mg', 15.75, 25, 'Tratamiento de infecciones respiratorias o urinarias.', 8, 'https://s3.amazonaws.com/online.storage/MEDCO/Products/811fa26e-c87c-4e45-a868-5937c24dc32f.png', 1, 12.00, 11.50, 'MK', 2);

-- Volcando datos para la tabla ecommerce.rol: ~0 rows (aproximadamente)

-- Volcando datos para la tabla ecommerce.tipomovimiento: ~0 rows (aproximadamente)
INSERT INTO `tipomovimiento` (`idTipoMovimiento`, `tipoM`) VALUES
	(1, 'Venta');

-- Volcando datos para la tabla ecommerce.usuario: ~0 rows (aproximadamente)
INSERT INTO `usuario` (`idUsuario`, `password`, `estadoUsuario`, `createdAt`, `updatedAt`, `email`) VALUES
	(1, '$2b$10$6YCbSazebSIKpPMsv2j.1uaUcuIL7/9kMrpoLjat3w91B1m1ZrLNK', 1, '2025-07-22 00:54:18', '2025-07-22 00:54:18', 'hola@gmail.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

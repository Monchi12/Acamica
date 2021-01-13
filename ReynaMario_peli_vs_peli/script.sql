use competencias;

CREATE TABLE `competencias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) DEFAULT NULL,
  `filtro` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `voto` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `competencia_id` int unsigned DEFAULT NULL,
  `pelicula_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_competencia_idx` (`competencia_id`),
  KEY `fk_pelicula_idx` (`pelicula_id`),
  CONSTRAINT `fk_competencia` FOREIGN KEY (`competencia_id`) REFERENCES `competencias` (`id`),
  CONSTRAINT `fk_pelicula` FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=430 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

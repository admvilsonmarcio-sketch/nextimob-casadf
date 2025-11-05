CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `provider` enum('LOCAL','GOOGLE') NOT NULL DEFAULT 'LOCAL',
  `role` varchar(64) NOT NULL DEFAULT 'AGENT',
  `created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `users_id` PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `users_provider_idx` ON `users` (`provider`);

CREATE TABLE `imoveis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) NOT NULL,
  `titulo` varchar(191) NOT NULL,
  `descricao` text,
  `status` enum('DRAFT','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `tipo` varchar(120) NOT NULL DEFAULT 'residencial',
  `cidade` varchar(120) NOT NULL,
  `estado` varchar(5) NOT NULL,
  `bairro` varchar(120) DEFAULT NULL,
  `preco` decimal(15,2) NOT NULL DEFAULT '0.00',
  `area` decimal(10,2) DEFAULT NULL,
  `quartos` int DEFAULT NULL,
  `banheiros` int DEFAULT NULL,
  `vagas` int DEFAULT NULL,
  `destaque` int NOT NULL DEFAULT 0,
  `created_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CONSTRAINT `imoveis_id` PRIMARY KEY (`id`),
  UNIQUE KEY `imoveis_slug_idx` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `imoveis_status_idx` ON `imoveis` (`status`);
CREATE INDEX `imoveis_cidade_estado_idx` ON `imoveis` (`cidade`, `estado`);
CREATE INDEX `imoveis_preco_idx` ON `imoveis` (`preco`);
CREATE INDEX `imoveis_destaque_idx` ON `imoveis` (`destaque`);

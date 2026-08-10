CREATE DATABASE IF NOT EXISTS tramites_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE tramites_db;

CREATE TABLE cliente (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tipo_doc        ENUM('DNI', 'CE', 'RUC') NOT NULL,
    num_doc         VARCHAR(20) NOT NULL,
    nombres         VARCHAR(100) NOT NULL,
    ap_paterno      VARCHAR(100) NOT NULL,
    ap_materno      VARCHAR(100) NULL,
    email           VARCHAR(150) NULL,
    telefono        VARCHAR(20) NULL,
    fecha_nac       DATE NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_cliente_doc UNIQUE (tipo_doc, num_doc)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tramite (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codigo          VARCHAR(20) NOT NULL,
    cliente_id      INT UNSIGNED NOT NULL,
    placa           VARCHAR(10) NULL,
    marca           VARCHAR(50) NOT NULL,
    modelo          VARCHAR(50) NOT NULL,
    anio            SMALLINT UNSIGNED NOT NULL,
    estado          ENUM('REGISTRADO','EN_FIRMAS','PRESENTADO','OBSERVADO','INSCRITO','CERRADO','ANULADO')
                    NOT NULL DEFAULT 'REGISTRADO',
    monto           DECIMAL(10,2) NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_tramite_codigo UNIQUE (codigo),
    CONSTRAINT fk_tramite_cliente FOREIGN KEY (cliente_id)
        REFERENCES cliente(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT chk_tramite_anio CHECK (anio BETWEEN 1990 AND 2027),
    INDEX idx_tramite_estado (estado),
    INDEX idx_tramite_cliente (cliente_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tramite_seguimiento (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tramite_id      INT UNSIGNED NOT NULL,
    estado_anterior VARCHAR(20) NULL,
    estado_nuevo    VARCHAR(20) NOT NULL,
    comentario      VARCHAR(255) NULL,
    usuario         VARCHAR(100) NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_seguimiento_tramite FOREIGN KEY (tramite_id)
        REFERENCES tramite(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX idx_seguimiento_tramite (tramite_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO cliente (id, tipo_doc, num_doc, nombres, ap_paterno, ap_materno, email, telefono, fecha_nac) VALUES
(1, 'DNI', '45678912', 'Carlos', 'Ramírez', 'Soto', 'carlos.ramirez@mail.com', '987654321', '1990-05-14'),
(2, 'DNI', '71234567', 'María', 'Gonzales', 'Pérez', 'maria.gonzales@mail.com', '956123478', '1995-11-02'),
(3, 'RUC', '20601234567', 'Transportes', 'Andina', NULL, 'contacto@tandina.com', '014567890', NULL),
(4, 'CE', '001234567', 'Luis', 'Fernández', 'Vega', NULL, '999888777', '1988-03-22');


INSERT INTO tramite (id, codigo, cliente_id, placa, marca, modelo, anio, estado, monto) VALUES
(1, 'INM-2026-0001', 1, 'ABC-123', 'Toyota', 'Corolla', 2018, 'REGISTRADO', 350.00),
(2, 'INM-2026-0002', 2, 'XYZ-789', 'Hyundai', 'Accent', 2020, 'EN_FIRMAS', 420.00),
(3, 'INM-2026-0003', 3, NULL,      'Kia',     'Sportage', 2022, 'INSCRITO', 600.00),
(4, 'INM-2026-0004', 4, 'DEF-456', 'Nissan',  'Sentra',   2019, 'ANULADO', 300.00);


INSERT INTO tramite_seguimiento (tramite_id, estado_anterior, estado_nuevo, comentario, usuario) VALUES
(1, NULL, 'REGISTRADO', 'Registro inicial del trámite', 'operador'),
(2, NULL, 'REGISTRADO', 'Registro inicial del trámite', 'operador'),
(2, 'REGISTRADO', 'EN_FIRMAS', 'Documentos enviados a firma', 'operador'),
(3, NULL, 'REGISTRADO', 'Registro inicial del trámite', 'operador'),
(3, 'REGISTRADO', 'EN_FIRMAS', 'Documentos enviados a firma', 'operador'),
(3, 'EN_FIRMAS', 'PRESENTADO', 'Presentado ante registros', 'operador'),
(3, 'PRESENTADO', 'INSCRITO', 'Inscripción confirmada', 'operador'),
(4, NULL, 'REGISTRADO', 'Registro inicial del trámite', 'operador'),
(4, 'REGISTRADO', 'ANULADO', 'Cliente desistió del trámite', 'operador');
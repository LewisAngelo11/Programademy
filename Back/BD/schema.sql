CREATE TYPE estado_curso AS ENUM ('activo', 'eliminado');

CREATE TABLE rango (
    id_rango SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    min_experiencia INT NOT NULL CHECK (min_experiencia >= 0),
    icono VARCHAR(255)
);

CREATE TABLE curso (
	id_curso SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	descripcion VARCHAR(255) NOT NULL,
	fecha_creacion DATE DEFAULT CURRENT_DATE
    estado estado_curso DEFAULT 'activo' NOT NULL;
);

CREATE TABLE modulo (
    id_modulo SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    orden INT NOT NULL
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_rango_actual INT,
    experiencia_total INT DEFAULT 0 CHECK (experiencia_total >= 0),
    fecha_registro DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_usuario_rango
        FOREIGN KEY (id_rango_actual)
        REFERENCES rango(id_rango)
        ON DELETE SET NULL
);

CREATE TABLE leccion (
    id_leccion SERIAL PRIMARY KEY,
    id_modulo INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    contenido_teorico TEXT,
    orden INT NOT NULL,
    CONSTRAINT fk_leccion_modulo
        FOREIGN KEY (id_modulo)
        REFERENCES modulo(id_modulo)
        ON DELETE CASCADE
);

CREATE TABLE quiz (
    id_quiz SERIAL PRIMARY KEY,
    id_modulo INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    tiempo_limite_segundos INT CHECK (tiempo_limite_segundos > 0),
    puntos_recompensa INT DEFAULT 0 CHECK (puntos_recompensa >= 0),
    CONSTRAINT fk_quiz_modulo
        FOREIGN KEY (id_modulo)
        REFERENCES modulo(id_modulo)
        ON DELETE CASCADE
);

CREATE TABLE pregunta (
    id_pregunta SERIAL PRIMARY KEY,
    id_quiz INT NOT NULL,
    enunciado TEXT NOT NULL,
    opciones JSON NOT NULL,
    indice_correcta INT NOT NULL,
    CONSTRAINT fk_pregunta_quiz
        FOREIGN KEY (id_quiz)
        REFERENCES quiz(id_quiz)
        ON DELETE CASCADE
);

CREATE TABLE intento_quiz (
    id_intento SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_quiz INT NOT NULL,
    calificacion INT CHECK (calificacion >= 0),
    tiempo_tomado INT CHECK (tiempo_tomado >= 0),
    fecha_intento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_intento_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,
    CONSTRAINT fk_intento_quiz
        FOREIGN KEY (id_quiz)
        REFERENCES quiz(id_quiz)
        ON DELETE CASCADE
);

CREATE TABLE logro (
    id_logro SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    condicion VARCHAR(255),
    icono VARCHAR(255)
);

CREATE TABLE usuario_logro (
    id_relacion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_logro INT NOT NULL,
    fecha_obtencion DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_usuario_logro_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON DELETE CASCADE,
    CONSTRAINT fk_usuario_logro_logro
        FOREIGN KEY (id_logro)
        REFERENCES logro(id_logro)
        ON DELETE CASCADE,
    CONSTRAINT unique_usuario_logro UNIQUE (id_usuario, id_logro)
);
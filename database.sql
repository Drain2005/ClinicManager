-- ============================================
-- ClinicManager - Base de données PostgreSQL
-- ============================================

-- À exécuter connecté à PostgreSQL
-- Crée la base si elle n'existe pas :
-- CREATE DATABASE "Gestion_medecin";

-- ============================================
-- Table : utilisateurs
-- ============================================

CREATE TABLE IF NOT EXISTS utilisateurs (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- ============================================
-- Table : medecins
-- ============================================

CREATE TABLE IF NOT EXISTS medecins (
    id SERIAL PRIMARY KEY,
    numed VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(150) NOT NULL,
    jours INTEGER NOT NULL CHECK (jours >= 0),
    taux NUMERIC(12,2) NOT NULL CHECK (taux >= 0)
);

-- ============================================
-- Utilisateur administrateur
-- username : admin
-- password : admin123
-- ============================================

INSERT INTO utilisateurs (username, password)
VALUES (
    'admin',
    '$2b$10$25bwyxIOBUXdB1NpnIgq9eZ/MvlhEzPlIJ.QSTDSEBlQV7jp7d0wa'
)
ON CONFLICT (username) DO NOTHING;
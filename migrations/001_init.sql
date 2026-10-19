-- Up
CREATE TABLE usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE rol (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE paciente (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL UNIQUE REFERENCES usuario(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  telefono TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE profesional (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL UNIQUE REFERENCES usuario(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  especialidad TEXT NOT NULL,
  matricula TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE disponibilidad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profesional_id UUID NOT NULL REFERENCES profesional(id) ON DELETE CASCADE,
  franja_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  franja_fin TIMESTAMP WITH TIME ZONE NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('available', 'booked', 'cancelled')), -- 'booked' means an appointment exists
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profesional_id, franja_inicio)
);

-- Partial unique index: only one active booking per slot
CREATE UNIQUE INDEX idx_active_booking_per_slot ON disponibilidad(profesional_id, franja_inicio) WHERE estado = 'available';

CREATE TABLE cita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disponibilidad_id UUID NOT NULL REFERENCES disponibilidad(id) ON DELETE CASCADE,
  paciente_id UUID NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
  estado TEXT NOT NULL CHECK (estado IN ('scheduled', 'attended', 'cancelled', 'no_show')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE encuentro (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cita_id UUID NOT NULL UNIQUE REFERENCES cita(id) ON DELETE CASCADE,
  notas TEXT,
  diagnostico TEXT,
  version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE adjunto (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  encuentro_id UUID NOT NULL REFERENCES encuentro(id) ON DELETE CASCADE,
  nombre_original TEXT NOT NULL,
  path_en_servidor TEXT NOT NULL,
  tipo_mime TEXT NOT NULL,
  tamano_bytes INTEGER NOT NULL,
  subido_por UUID NOT NULL REFERENCES usuario(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL REFERENCES usuario(id),
  accion TEXT NOT NULL,
  recurso_tipo TEXT NOT NULL,
  recurso_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for filtering/ordering (RF-04)
CREATE INDEX idx_disponibilidad_profesional ON disponibilidad(profesional_id);
CREATE INDEX idx_disponibilidad_franja ON disponibilidad(franja_inicio, franja_fin);
CREATE INDEX idx_cita_paciente ON cita(paciente_id);
CREATE INDEX idx_cita_estado ON cita(estado);
CREATE INDEX idx_cita_disponibilidad ON cita(disponibilidad_id);
CREATE INDEX idx_encuentro_cita ON encuentro(cita_id);
CREATE INDEX idx_adjunto_encuentro ON adjunto(encuentro_id);
CREATE INDEX idx_auditoria_actor ON auditoria(actor_id);
CREATE INDEX idx_auditoria_accion ON auditoria(accion);
CREATE INDEX idx_auditoria_timestamp ON auditoria(timestamp);

-- Insert default roles
INSERT INTO rol (nombre) VALUES ('patient'), ('professional'), ('staff'), ('admin');

-- This migration is idempotent (RF-27)
-- It can be safely re-run

-- Migration: Enhance sessions table and create meetings table
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS token VARCHAR(50);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS topic VARCHAR(255);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS objective TEXT;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS session_format VARCHAR(50) DEFAULT '1-on-1';
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS current_jp INT DEFAULT 0;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS target_jp INT DEFAULT 6;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS progress_note VARCHAR(255);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS alert_type VARCHAR(20);
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS alert_text TEXT;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS alert_author VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token) WHERE token IS NOT NULL;

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    meeting_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    scheduled_date VARCHAR(100),
    meeting_type VARCHAR(50) DEFAULT 'Luring',
    location VARCHAR(255),
    summary TEXT,
    jp_collected INT DEFAULT 2,
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_meetings_session_id ON meetings(session_id);
CREATE INDEX IF NOT EXISTS idx_meetings_meeting_number ON meetings(session_id, meeting_number);


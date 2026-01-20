# cleanup_db.py
import sys
sys.path.append('.')
from backend.core.db import engine
from sqlalchemy import text

with engine.connect() as conn:
    conn.execute(text('DROP TABLE IF EXISTS task CASCADE;'))
    conn.execute(text('DROP TABLE IF EXISTS session CASCADE;'))
    conn.execute(text('DROP TABLE IF EXISTS account CASCADE;'))
    conn.execute(text('DROP TABLE IF EXISTS verification CASCADE;'))
    conn.execute(text('DROP TABLE IF EXISTS "user" CASCADE;'))
    conn.commit()
    print('Dropped old tables successfully')
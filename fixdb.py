# fix_db.py
import sys
# Backend folder ko path mein add karte hain taake imports chalen
sys.path.append('.')

from backend.core.db import engine
from sqlalchemy import text

print("Fixing database columns for Better Auth...")

with engine.connect() as conn:
    # 1. Account Table Fix
    try:
        # Quotes "createdAt" zaroori hain taake case-sensitive rahe
        conn.execute(text('ALTER TABLE account ADD COLUMN "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now();'))
        conn.execute(text('ALTER TABLE account ADD COLUMN "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now();'))
        print("✅ Added columns to 'account' table.")
    except Exception as e:
        print(f"⚠️ Account table info: {e}")

    # 2. Session Table Fix (Ye bhi aksar missing hota hai)
    try:
        conn.execute(text('ALTER TABLE session ADD COLUMN "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now();'))
        conn.execute(text('ALTER TABLE session ADD COLUMN "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now();'))
        print("✅ Added columns to 'session' table.")
    except Exception as e:
        print(f"⚠️ Session table info: {e}")
        
    conn.commit()

print("🎉 Database successfully patched! You can now Sign Up.")
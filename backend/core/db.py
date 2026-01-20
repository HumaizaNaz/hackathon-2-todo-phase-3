from sqlmodel import create_engine, Session, SQLModel
from .config import settings
from models.user import User
from models.task import Task
from models.conversation import Conversation, Message
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text

engine = create_engine(settings.DATABASE_URL, echo=True)

def create_db_and_tables():
    # First, update schema to add new columns if they don't exist (for existing records)
    with engine.connect() as conn:
        try:
            # Add name column to user table if it doesn't exist
            conn.execute(text("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                                   WHERE table_name = 'user' AND column_name = 'name') THEN
                        ALTER TABLE "user" ADD COLUMN name VARCHAR(255);
                    END IF;
                END $$;
            """))

            # Add completed column to task table if it doesn't exist
            conn.execute(text("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                                   WHERE table_name = 'task' AND column_name = 'completed') THEN
                        ALTER TABLE task ADD COLUMN completed BOOLEAN DEFAULT FALSE;
                    END IF;
                END $$;
            """))

            # Add created_at column to task table if it doesn't exist
            conn.execute(text("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                                   WHERE table_name = 'task' AND column_name = 'created_at') THEN
                        ALTER TABLE task ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
                    END IF;
                END $$;
            """))

            # Add updated_at column to task table if it doesn't exist
            conn.execute(text("""
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                                   WHERE table_name = 'task' AND column_name = 'updated_at') THEN
                        ALTER TABLE task ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
                    END IF;
                END $$;
            """))

            conn.commit()
        except Exception as e:
            # If the columns already exist or there's another issue, continue
            print(f"Note: Could not modify tables (may already be updated): {e}")
            conn.rollback()

    # Create all tables (this won't recreate existing tables but will ensure all defined models exist)
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

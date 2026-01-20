from ..core.db import create_db_and_tables

def upgrade():
    """Create all tables defined in models."""
    create_db_and_tables()

def downgrade():
    """Drop all tables (use with caution in production)."""
    # SQLModel doesn't provide a direct `drop_all` without engine access,
    # so this would typically be handled by a proper migration tool like Alembic.
    # For this simple example, we'll leave it as a placeholder.
    print("Downgrade not implemented for initial migration without Alembic.")

if __name__ == "__main__":
    print("Running initial migration...")
    upgrade()
    print("Initial migration complete.")

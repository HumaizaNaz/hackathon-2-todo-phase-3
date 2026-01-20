# core/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    BETTER_AUTH_SECRET: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # ✅ Ignore any extra variables in .env

settings = Settings()

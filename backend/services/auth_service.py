# services/auth_service.py

from datetime import timedelta
from typing import Optional
from sqlmodel import Session
from passlib.context import CryptContext

from models.user import User
from core.jwt_auth import create_access_token  # ✅ JWT creation
from core.jwt_auth import settings             # ✅ JWT settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify password against hash (truncate to 72 bytes for bcrypt)
    """
    truncated_password = plain_password[:72] if len(plain_password) > 72 else plain_password
    return pwd_context.verify(truncated_password, hashed_password)


def authenticate_user(email: str, password: str, session: Session) -> Optional[User]:
    """
    Authenticate user by email and password
    """
    from sqlmodel import select
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_user_access_token(user: User) -> str:
    """
    Create JWT access token for user
    """
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "name": user.name or user.email},
        expires_delta=access_token_expires
    )
    return access_token

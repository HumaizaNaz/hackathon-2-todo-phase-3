from typing import Optional
from sqlmodel import Session
from models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    # Truncate password to 72 bytes if needed to comply with bcrypt limitations
    truncated_password = password[:72] if len(password) > 72 else password
    return pwd_context.hash(truncated_password)

def create_user(email: str, password: str, session: Session) -> User:
    hashed_password = get_password_hash(password)
    user = User(email=email, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_by_email(email: str, session: Session) -> Optional[User]:
    return session.query(User).filter(User.email == email).first()

# core/jwt_auth.py
import uuid
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from core.config import settings

security = HTTPBearer(auto_error=False)

# ✅ JWT Token creation
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.BETTER_AUTH_SECRET, algorithm=settings.ALGORITHM)
    return encoded_jwt

# ✅ JWT verification dependency for FastAPI
def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> uuid.UUID:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(credentials.credentials, settings.BETTER_AUTH_SECRET, algorithms=[settings.ALGORITHM])
        sub = payload.get("sub")
        if not sub:
            raise HTTPException(status_code=401, detail="Invalid token")
        return uuid.UUID(sub)
    except (JWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

# ✅ Optional middleware to attach user_id to request.state
async def jwt_middleware(request: Request, call_next):
    request.state.user_id = None
    auth = request.headers.get("authorization")

    if auth and auth.startswith("Bearer "):
        try:
            payload = jwt.decode(auth.split(" ")[1], settings.BETTER_AUTH_SECRET, algorithms=[settings.ALGORITHM])
            sub = payload.get("sub")
            if sub:
                request.state.user_id = uuid.UUID(sub)
        except Exception:
            pass

    return await call_next(request)

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from core.db import create_db_and_tables
from routes import auth, tasks, chat
from core.jwt_auth import jwt_middleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables...")
    create_db_and_tables()
    print("Tables created!")
    yield

class ProxyHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Check for X-Forwarded-Proto header to determine if request was originally HTTPS
        forwarded_proto = request.headers.get("x-forwarded-proto")
        if forwarded_proto:
            # Update the request URL scheme based on the forwarded proto
            request.scope["scheme"] = forwarded_proto

        # Check for X-Forwarded-Host header to determine the original host
        forwarded_host = request.headers.get("x-forwarded-host")
        if forwarded_host:
            request.scope["server"] = (forwarded_host, None)

        response = await call_next(request)
        return response


app = FastAPI(lifespan=lifespan)

# Add proxy headers middleware to handle HTTPS behind reverse proxy
app.add_middleware(ProxyHeadersMiddleware)

app.middleware("http")(jwt_middleware)

# Specific CORS configuration to allow frontend access
origins = [
    "http://localhost:3000",           # Local frontend development
    "http://localhost",                # Localhost without port
    "https://localhost:3000",          # HTTPS local development
    "https://humaiza-todo-app.hf.space",  # Your deployed backend (HTTPS)
    "http://humaiza-todo-app.hf.space",   # Your deployed backend (HTTP)
    "https://*.vercel.app",            # Vercel deployed frontend
    "https://*.pages.dev",             # Cloudflare Pages deployed frontend
    "https://*.huggingface.app",       # Hugging Face Spaces frontend
    "http://*.huggingface.app",        # Hugging Face Spaces frontend (HTTP)
    "*"                                # Allow all origins during development (remove in production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo App Backend!"}

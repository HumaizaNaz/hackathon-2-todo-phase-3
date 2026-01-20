# main.py - This now runs the HTTP wrapper for compatibility with AI agent
import uvicorn
import sys
import os

if __name__ == "__main__":
    # Add the current directory to the path so imports work
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))

    # Import and run the HTTP wrapper app
    from http_wrapper import app
    uvicorn.run(app, host="127.0.0.1", port=8003)

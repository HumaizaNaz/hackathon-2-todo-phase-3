import os
import google.generativeai as genai

# Load the API key from the environment
api_key = os.getenv("GEMINI_API_KEY", "AIzaSyCsUrdDpGW_m_SOrge-GuR_8mvm8vp9gYs")
print(f"Using API key: {api_key[:10]}..." if api_key else "No API key found!")

# Configure the API
genai.configure(api_key=api_key)

try:
    # Test with a simple model
    model = genai.GenerativeModel('gemini-pro')

    # Make a simple request
    response = model.generate_content("Say hello")
    print("API key is working correctly!")
    print(f"Response: {response.text}")

except Exception as e:
    print(f"Error occurred: {e}")
    print("There might be an issue with the API key or Google Cloud setup.")
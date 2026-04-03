import requests

BASE_URL = "http://localhost:8700"
TIMEOUT = 30

def test_post_api_auth_signin_login_user():
    signup_url = f"{BASE_URL}/api/auth/signup"
    signin_url = f"{BASE_URL}/api/auth/signin"

    # Create a unique user for testing
    import uuid
    unique_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    user_data = {
        "name": "Test User",
        "email": unique_email,
        "password": "TestPass123!"
    }

    try:
        # Sign up the user first
        signup_resp = requests.post(signup_url, json=user_data, timeout=TIMEOUT)
        assert signup_resp.status_code == 200, f"Signup failed: {signup_resp.text}"

        # Attempt to sign in with correct credentials
        signin_payload = {
            "email": unique_email,
            "password": user_data["password"]
        }
        signin_resp = requests.post(signin_url, json=signin_payload, timeout=TIMEOUT)
        assert signin_resp.status_code == 200, f"Signin failed: {signin_resp.text}"

        tokens = signin_resp.json()
        assert "accessToken" in tokens, "accessToken not found in response"
        assert "refreshToken" in tokens, "refreshToken not found in response"

    finally:
        # Cleanup: If there was any API to delete the user, it would go here
        # Since no delete endpoint is specified in PRD, skip deletion
        pass

test_post_api_auth_signin_login_user()
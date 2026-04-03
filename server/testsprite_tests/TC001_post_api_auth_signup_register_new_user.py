import requests
import uuid

BASE_URL = "http://localhost:8700"
TIMEOUT = 30

def test_post_api_auth_signup_register_new_user():
    url = f"{BASE_URL}/api/auth/signup"
    unique_email = f"testuser_{uuid.uuid4().hex}@example.com"
    payload = {
        "name": "Test User",
        "email": unique_email,
        "password": "StrongP@ssw0rd!"
    }
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"
    try:
        json_data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # Validate UserObject fields - checking presence and types
    assert isinstance(json_data, dict), "Response JSON should be a dictionary representing UserObject"
    assert "name" in json_data and isinstance(json_data["name"], str), "UserObject missing or invalid 'name'"
    assert "email" in json_data and isinstance(json_data["email"], str), "UserObject missing or invalid 'email'"
    assert "id" in json_data and isinstance(json_data["id"], (str, int)), "UserObject missing or invalid 'id' field"

test_post_api_auth_signup_register_new_user()
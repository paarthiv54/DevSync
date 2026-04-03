import requests
import uuid

BASE_URL = "http://localhost:8700"
TIMEOUT = 30

def test_get_api_project_id_retrieve_project_details():
    # Step 1: Sign up a new user
    user_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    user_password = "TestPass123!"
    signup_payload = {
        "name": "Test User",
        "email": user_email,
        "password": user_password
    }
    signup_resp = requests.post(f"{BASE_URL}/api/auth/signup", json=signup_payload, timeout=TIMEOUT)
    assert signup_resp.status_code == 200, f"Signup failed: {signup_resp.text}"

    # Step 2: Sign in to get access token
    signin_payload = {
        "email": user_email,
        "password": user_password
    }
    signin_resp = requests.post(f"{BASE_URL}/api/auth/signin", json=signin_payload, timeout=TIMEOUT)
    assert signin_resp.status_code == 200, f"Signin failed: {signin_resp.text}"
    tokens = signin_resp.json()
    access_token = tokens.get("accessToken")
    assert access_token, "No accessToken in signin response"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    # Step 3: Create a new project to obtain a valid project ID
    project_payload = {
        "title": "Test Project Retrieve",
        "description": "Project created for retrieval test"
    }
    create_proj_resp = requests.post(f"{BASE_URL}/api/project/", json=project_payload, headers=headers, timeout=TIMEOUT)
    assert create_proj_resp.status_code == 200, f"Project creation failed: {create_proj_resp.text}"
    project_obj = create_proj_resp.json()
    project_id = project_obj.get("_id") or project_obj.get("id")
    assert project_id, "Project ID not found in creation response"

    try:
        # Step 4: Retrieve the project details using GET /api/project/:id
        get_resp = requests.get(f"{BASE_URL}/api/project/{project_id}", headers=headers, timeout=TIMEOUT)
        assert get_resp.status_code == 200, f"Project retrieval failed: {get_resp.text}"
        project_data = get_resp.json()

        # Validate returned object has expected fields
        assert project_data.get("_id") == project_id or project_data.get("id") == project_id, "Returned project ID mismatch"
        assert "title" in project_data, "Project title missing from response"
        assert project_data["title"] == project_payload["title"], "Project title mismatch"
        assert "description" in project_data, "Project description missing from response"
        assert project_data["description"] == project_payload["description"], "Project description mismatch"

    finally:
        # Cleanup: delete the created project
        # Assume DELETE /api/project/:id with Authorization is supported
        del_resp = requests.delete(f"{BASE_URL}/api/project/{project_id}", headers=headers, timeout=TIMEOUT)
        # Deletion might be 200 or 204; accept both
        assert del_resp.status_code in (200, 204, 202), f"Project deletion failed: {del_resp.text}"

test_get_api_project_id_retrieve_project_details()
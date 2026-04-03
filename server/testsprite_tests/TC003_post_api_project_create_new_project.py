import requests
import uuid

BASE_URL = "http://localhost:8700"
TIMEOUT = 30

def test_post_api_project_create_new_project():
    # First, sign up a new user to get credentials
    signup_url = f"{BASE_URL}/api/auth/signup"
    signin_url = f"{BASE_URL}/api/auth/signin"
    project_url = f"{BASE_URL}/api/project/"

    unique_suffix = str(uuid.uuid4())
    user_name = f"TestUser{unique_suffix}"
    user_email = f"testuser{unique_suffix}@example.com"
    user_password = "TestPass123!"

    signup_payload = {
        "name": user_name,
        "email": user_email,
        "password": user_password
    }

    project_resp = None
    access_token = None

    try:
        # Sign up the user
        signup_resp = requests.post(signup_url, json=signup_payload, timeout=TIMEOUT)
        assert signup_resp.status_code == 200, f"Signup failed: {signup_resp.text}"
        signup_data = signup_resp.json()
        # Validate signup response contains user id
        assert "id" in signup_data or "_id" in signup_data, "Signup response missing user id"

        # Sign in the user to obtain JWT token
        signin_payload = {
            "email": user_email,
            "password": user_password
        }
        signin_resp = requests.post(signin_url, json=signin_payload, timeout=TIMEOUT)
        assert signin_resp.status_code == 200, f"Signin failed: {signin_resp.text}"
        signin_data = signin_resp.json()
        assert "accessToken" in signin_data, "Signin response missing accessToken"
        access_token = signin_data["accessToken"]

        # Create a new project with valid JWT
        project_payload = {
            "title": "New Project Title",
            "description": "Description of the new project"
        }
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        project_resp = requests.post(project_url, json=project_payload, headers=headers, timeout=TIMEOUT)
        assert project_resp.status_code == 200, f"Project creation failed: {project_resp.text}"
        project_data = project_resp.json()

        # Validate that ProjectObject contains expected fields
        assert isinstance(project_data, dict), "Project response is not a JSON object"
        assert "title" in project_data and project_data["title"] == project_payload["title"], "Project title not returned correctly"
        assert "description" in project_data and project_data["description"] == project_payload["description"], "Project description not returned correctly"
        assert "id" in project_data or "_id" in project_data, "Project ID not returned"

    finally:
        # Cleanup: delete the created project if exists
        project_id = None
        try:
            if project_resp and project_resp.status_code == 200:
                pj = project_resp.json()
                project_id = pj.get("id") or pj.get("_id")
        except Exception:
            pass

        if project_id and access_token:
            # Delete the project using DELETE (assuming this endpoint exists)
            delete_url = f"{BASE_URL}/api/project/{project_id}"
            try:
                requests.delete(delete_url, headers={"Authorization": f"Bearer {access_token}"}, timeout=TIMEOUT)
            except Exception:
                pass

        # Cleanup: delete created user
        # No explicit delete user endpoint described in PRD, so skipping user cleanup


test_post_api_project_create_new_project()

import requests
import uuid

BASE_URL = "http://localhost:8700"
TIMEOUT = 30

def test_post_api_project_works_id_add_work_to_project():
    # Step 1: Sign up a new user to get valid credentials
    signup_url = f"{BASE_URL}/api/auth/signup"
    user_email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    signup_payload = {
        "name": "Test User",
        "email": user_email,
        "password": "TestPass123!"
    }

    signup_resp = requests.post(signup_url, json=signup_payload, timeout=TIMEOUT)
    assert signup_resp.status_code == 200, f"Signup failed: {signup_resp.text}"

    # Step 2: Sign in to get JWT token
    signin_url = f"{BASE_URL}/api/auth/signin"
    signin_payload = {
        "email": user_email,
        "password": "TestPass123!"
    }
    signin_resp = requests.post(signin_url, json=signin_payload, timeout=TIMEOUT)
    assert signin_resp.status_code == 200, f"Signin failed: {signin_resp.text}"
    tokens = signin_resp.json()
    access_token = tokens.get("accessToken")
    assert access_token, "No accessToken received"

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    # Step 3: Create a new project to get a valid project id
    create_project_url = f"{BASE_URL}/api/project/"
    project_payload = {
        "title": "Test Project for Work Addition",
        "description": "Project description for testing add work endpoint"
    }
    project_resp = requests.post(create_project_url, json=project_payload, headers=headers, timeout=TIMEOUT)
    assert project_resp.status_code == 200, f"Project creation failed: {project_resp.text}"
    project_obj = project_resp.json()
    project_id = project_obj.get("_id") or project_obj.get("id")
    assert project_id, "No project ID returned in project creation response"

    try:
        # Step 4: Add work to the created project
        add_work_url = f"{BASE_URL}/api/project/works/{project_id}"
        work_payload = {
            "workTitle": "Test Work Title",
            "details": "Details about the test work item"
        }
        add_work_resp = requests.post(add_work_url, json=work_payload, headers=headers, timeout=TIMEOUT)
        assert add_work_resp.status_code == 200, f"Add work to project failed: {add_work_resp.text}"
        work_obj = add_work_resp.json()

        # Validate the returned WorkObject contains the submitted data
        assert isinstance(work_obj, dict), "Returned WorkObject is not a dictionary"
        assert work_obj.get("workTitle") == work_payload["workTitle"], "workTitle mismatch"
        assert work_obj.get("details") == work_payload["details"], "details mismatch"
        assert "_id" in work_obj or "id" in work_obj, "WorkObject missing id"

    finally:
        # Cleanup: Delete the created project to leave system in clean state
        delete_project_url = f"{BASE_URL}/api/project/{project_id}"
        del_resp = requests.delete(delete_project_url, headers=headers, timeout=TIMEOUT)
        # Accept either 200 OK or 204 No Content for deletion success
        assert del_resp.status_code in (200, 204), f"Failed to delete project during cleanup: {del_resp.text}"

test_post_api_project_works_id_add_work_to_project()
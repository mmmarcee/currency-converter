import pytest
import requests


Host = "http://localhost:5139"

def test_good_user():
    load = {
          "username": "artem775",
        "password": "SuperPassword1223",
        "telegramChatId": 1830005021
    }
    
    
    response = requests.post(
                f"{Host}/api/auth/register",
        json = load,
        timeout=10
    )
    print(response)
    assert response.status_code in (200,201)
    info = response.json()
    
   
    



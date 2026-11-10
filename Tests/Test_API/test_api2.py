import requests

def test_get():
   response =  requests.get("https://api.frankfurter.dev/v2/rate/")
   assert response.status_code == 200
   assert response.json()["id"] == 1
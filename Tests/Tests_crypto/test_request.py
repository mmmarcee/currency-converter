import requests

url = "http://localhost:5139/api/crypto/convert?from=bitcoin&to=eur&amount=1"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)

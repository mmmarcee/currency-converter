import requests, time

BASE_URL = "http://localhost:5139/api/crypto/convert"

currencies = [
    "bitcoin", "ethereum", "tether", "binancecoin", "ripple",
    
    "stellar", "bitcoin-cash", "near", "dai", "uniswap",

    "usd-coin", "solana", "tron", "hyperliquid", "zcash",
  
    "dogecoin", "monero", "chainlink", "leo-token", "cardano"]

TO_CUR = ["usd","rub","eur"]




def convert_all(to_cur=TO_CUR, amount=1):
    results = {}
    for cur in currencies:
        try:
            r = requests.get(BASE_URL, params={"from": cur, "to": to_cur, "amount": amount}, timeout=10)
            r.raise_for_status()
            results[cur] = r.json()
            print(f"{cur}: 200")
        except requests.exceptions.RequestException as e:
            results[cur] = {"error": str(e)}
            print(f"{cur}: ОШИБКА — {e}")
        time.sleep(12.0)
    return results

if __name__ == "__main__":
    for cur, data in convert_all().items():
        print(f"{cur}: {data}")
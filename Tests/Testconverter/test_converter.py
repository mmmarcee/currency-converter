import re
from playwright.sync_api import Playwright, sync_playwright, expect, Page
import pytest

vverh_valuti = ["RUB"]
snizu_valuti = ["USD","AUD", "GBP", "CAD", "CNY", "EUR", "NZD", "CHF", "JPY", "KZT" ]

kolvo = 14

chislo = "9" * kolvo

@pytest.fixture(scope = "module")    
def browser():
    with sync_playwright() as B:
        browser = B.chromium.launch(headless=False)
        yield B
        browser.close()

@pytest.fixture(scope = "function")     
def context_page(B):
    context = B.new_context(
        viewport = {"weight": 1920, "height": 1080}
    )
    page = context.new_page()
    yield page
    page.close()
        
def test_one_run(page):
    page = context_page.new_page()
    page.goto("http://localhost:5173/")
    page.get_by_role("textbox").first.click()
    page.get_by_role("textbox").first.fill(chislo)
    
    for v in vverh_valuti:
        page.get_by_role("img", name="down").first.click()
        page.get_by_text(v).first.click()
        
   
    for s in snizu_valuti:
    # Открываем список
        page.get_by_role("img", name="down").nth(1).click()
    try:
        page.get_by_role("listitem").filter(has_text=s).first.click()
    except Exception:
        page.screenshot(path=f"error_{s}.png")
    
        page.get_by_role("button", name="Convert", exact=True).click()
        page.wait_for_timeout(2000) 
    
    
    context_page.close()
    browser.close()

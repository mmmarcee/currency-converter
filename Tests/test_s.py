import re
from playwright.sync_api import Playwright, sync_playwright, expect, Page
import pytest

vverh_valuti = ["RUB"]
snizu_valuti = ["USD","AUD", "GBP", "CAD", "CNY", "EUR", "NZD", "CHF", "JPY", "KZT" ]

kolvo = 14

chislo = "9" * kolvo

def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173/")
    page.get_by_role("textbox").first.click()
    page.get_by_role("textbox").first.fill(chislo)
    for v in vverh_valuti:
        page.get_by_role("img", name="down").first.click()
        page.get_by_text(v).first.click()
        
        
        for s in snizu_valuti:
            page.get_by_role("img", name="down").nth(1).click()
            page.get_by_role("listitem").filter(has_text= s).nth(1).click()
            page.get_by_text(s).nth(1).click()
            
            page.get_by_role("button", name="Convert", exact=True).click()
    
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)

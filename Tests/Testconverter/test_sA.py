import re
from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173/")
    page.get_by_role("img", name="down").first.click()
    page.get_by_text("RUB").first.click()
    page.get_by_role("img", name="down").nth(1).click()
    page.get_by_text("USD").nth(2).click()
    page.get_by_role("img", name="down").nth(1).click()
    page.get_by_text("RUB").nth(2).click()
    page.get_by_role("img", name="down").nth(1).click()
    page.get_by_text("AUD").nth(1).click()
    page.get_by_role("textbox").first.click()
    page.get_by_role("textbox").first.fill("9999999999")
    page.get_by_role("button", name="Convert", exact=True).click()
    page.close()

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)

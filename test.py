from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

# Chrome opciók
options = webdriver.ChromeOptions()
options.add_argument("--disable-blink-features=AutomationControlled")  
options.add_argument("--start-maximized")
options.add_argument("--disable-infobars")
options.add_argument("--disable-web-security")
options.add_argument("--disable-site-isolation-trials")
options.add_argument("--disable-features=IsolateOrigins,site-per-process")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# Valós user-agent
options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/123.0.0.0 Safari/537.36"
)

# WebDriver jelek elrejtése
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

# WebDriver inicializálása
szerviz=Service(ChromeDriverManager().install())
driver=webdriver.Chrome(service=szerviz,options=options)
# WebDriver jel eltávolítása JS-ből
driver.execute_cdp_cmd(
    "Page.addScriptToEvaluateOnNewDocument",
    {
        "source": """
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
        """
    },
)

try:
    driver.get("http://127.0.0.1:5500/html/autok.html")
    time.sleep(2)
    delete=driver.find_element(By.ID,'BMW')
    delete.click()
    time.sleep(2)
    modify=driver.find_element(By.ID,"4")
    modify.click()
    time.sleep(2)

finally:
    driver.quit()
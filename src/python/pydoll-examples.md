# Examples From Documentation

#### Follows A Domain + Consistent Action Pattern

```python
import asyncio
from pydoll.browser.chrome import Chrome
from pydoll.constants import By

async def pydoll_example():
    # Create a browser instance
    browser = Chrome()
    await browser.start()

    # Get a page
    page = await browser.get_page()

    # Work with the page...
    await page.go_to("https://example.com")

    # Clean up when done
    await browser.stop()

# Run your example with asyncio
asyncio.run(pydoll_example())
```

#### Selecting Selectors

```python
# Navigate to a search engine
await page.go_to("https://www.google.com")

# Find the search input field
search_box = await page.find_element(By.NAME, "q")

# Type into the search box
await search_box.type_keys("Pydoll browser automation")

# Find and click the search button
search_button = await page.find_element(By.NAME, "btnK")
await search_button.click()

# Wait for results to load
results = await page.wait_element(By.CSS_SELECTOR, "#search")

# Find all result links
links = await page.find_elements(By.CSS_SELECTOR, "a h3")

# Print the first 3 result titles
for i, link in enumerate(links[:3]):
    text = await link.text
    print(f"Result {i+1}: {text}")

```

---

#### More Refinded, Specific Approach with `Options`

```python
import asyncio
import sys
from pydoll.browser.chrome import Chrome
from pydoll.constants import By
from pydoll.browser.options import Options

# This script is designed to open a GitHub repo and star the project
# pageLink      -> https://github.com/autoscrape-labs/pydoll
# pageSelector  -> '//form[@action="/autoscrape-labs/pydoll/star"]//button'
async def main():
    options = Options()
    options.binary_location = '/usr/bin/google-chrome-stable'
    options.add_argument('--headless=new')
    options.add_argument('--window-size=1280,720')
    options.add_argument('--disable-notifications')
    # ^CUSTOM BROWSER CONFIGURATION^
    async with Chrome() as browser:
        pageLink = sys.argv[1]
        pageSelector = sys.argv[2]
        await browser.start()
        page = await browser.get_page()
        await page.go_to(pageLink)
        star_button = await page.wait_element(
            By.XPATH, pageSelector,
            timeout=5,
            raise_exc=False
        )
        if not star_button:
            print("Ops! The button was not found.")
            return

        await star_button.click()
        await asyncio.sleep(3)

asyncio.run(main())

```


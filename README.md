[README.md](https://github.com/user-attachments/files/33345745/README.md)
# playwright-core-utils

A lightweight TypeScript library of reusable Playwright helpers. It wraps common web actions, waits and assertions behind simple, selector-based methods, so test suites stay short, readable and consistent.

## Features

- **Simple selector-based API**: `click('#login')`, `enterText('#email', 'a@b.com')`
- **Auto scroll-into-view** before clicking, typing and reading text
- **Built-in waits** with configurable timeouts (default 120s) and clear error messages
- **Iframe support** for typing into inputs and contenteditable editors
- **Checkbox and toggle helpers** that fall back to clicking the label/wrapper for custom-styled controls
- **Ready-made assertions** for visibility, text, attributes and input values
- **Single entry point**: everything is exported from `index.ts`

## Tech stack

TypeScript, Playwright (`@playwright/test`), Node.js

## Project structure

```
src/
├── Initialization.ts   # Holds the Playwright Page instance
├── WebOperations.ts    # Actions, waits and element state helpers
├── Assertions.ts       # Reusable assertions
└── index.ts            # Re-exports all of the above
```

The classes build on each other:

```
Initialization  ->  WebOperations  ->  Assertions
```

`Assertions` therefore includes every method from `WebOperations` and `Initialization`, so one object gives you actions, waits and assertions together.

## Installation

```bash
git clone https://github.com/dubeyshuchi/playwright-core-utils.git
cd playwright-core-utils
npm install
npm run build
```

## Usage

```ts
import { test } from '@playwright/test';
import { Assertions } from 'playwright-core-utils'; // or the relative path to the build output

test('login flow', async ({ page }) => {
  const web = new Assertions(page);

  await page.goto('https://example.com/login');

  await web.enterText('#email', 'user@example.com');
  await web.enterText('#password', 'secret');
  await web.clickButtonByText('Sign in');

  await web.waitForTextVisibility('Welcome', 30);
  await web.checkElementVisibility('.dashboard');
  await web.checkInputValue('#search', '');
});
```

## API reference

### Actions (`WebOperations`)

| Method | Description |
| --- | --- |
| `click(selector, { force? })` | Clicks the first matching element (scrolls into view first) |
| `clickByText(text, options?)` | Clicks the first element with the exact text |
| `clickButtonByText(name)` | Clicks a button by its accessible name |
| `clickLinkByText(text)` | Clicks a link by its accessible name |
| `enterText(selector, text)` | Clears the field, then types the text |
| `clear(selector)` | Clears an input |
| `enterTextInIframe(iframeSelector, selector, text)` | Fills an element inside an iframe |
| `fillInFrame(frameSelector, targetSelector, text)` | Clears and fills an input or contenteditable inside an iframe |
| `check(selector)` / `uncheck(selector)` | Sets a checkbox, with a label-click fallback for custom controls |
| `toggleOn(selector)` | Clicks the toggle's wrapper element |
| `pressEnter()` / `pressTab()` / `pressKey(key)` | Keyboard actions |
| `reload()` / `close()` | Reloads or closes the page |
| `wait(seconds)` | Fixed wait (use sparingly) |

### Waits (`WebOperations`)

| Method | Description |
| --- | --- |
| `waitForElementVisibility(selector, seconds)` | Waits until the element is visible |
| `waitForElementInvisibility(selector, seconds)` | Waits until the element is detached from the DOM |
| `waitUntilHidden(selector, seconds)` | Waits until the element is hidden |
| `waitForElementToDisappear(locatorOrSelector, seconds = 60)` | Accepts a `Locator` or a selector string |
| `waitForElementEnabled(selector, seconds?)` | Waits until the element is visible and enabled |
| `waitForTextVisibility(text, seconds?)` | Waits for text to appear (default 120s) |
| `waitForTextInvisibility(text, seconds?)` | Waits for text to go away (default 120s) |
| `waitForTextInsideButtonVisibility(text, seconds)` | Waits for a button containing the text |

### State and data (`WebOperations`)

| Method | Description |
| --- | --- |
| `getText(selector)` | Returns the element's text content |
| `getCount(selector)` | Returns the number of matching elements |
| `isElementVisible(selector)` | Returns whether the element is visible |
| `isElementDisabled(selector)` | Returns whether the element is disabled |
| `isChecked(selector)` | Returns whether a checkbox is checked |
| `isToggleOn(selector)` | Returns whether a custom toggle is on |
| `isTextVisible(text, seconds = 5)` | Returns `true` or `false` without throwing |

### Assertions (`Assertions`)

| Method | Description |
| --- | --- |
| `checkElementVisibility(selector)` | Passes if at least one matching element exists |
| `checkElementInvisibility(selector)` | Passes if no matching element exists |
| `checkTextVisibility(text)` | Passes if the text is visible |
| `checkTextInvisibility(text, seconds?)` | Passes once the text is gone |
| `checkPresenceOfTextInsideElement(selector, text)` | Passes if the text appears in the matching elements |
| `checkAbsenceOfTextInsideElement(selector, text)` | Passes if the text does not appear in the matching elements |
| `checkAttributeValue(selector, attribute, text)` | Passes if the attribute contains the text |
| `checkInputValue(selector, value)` | Passes if the input has the exact value |

## Design notes

- Methods that take a selector act on the **first match** (`.nth(0)` / `.first()`).
- Wait methods throw descriptive errors, so failures are easy to diagnose in test reports.
- Subclass `Assertions` or `WebOperations` to add page-specific helpers for your own project.

## License

[Add your license here, for example MIT]

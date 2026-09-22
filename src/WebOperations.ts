import { Locator } from '@playwright/test';
import { Initialization } from './Initialization';
import { expect } from '@playwright/test';

export class WebOperations extends Initialization {
  async reload() {
    await this.page.reload();
  }

  async close() {
    await this.page.close();
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async getCount(selector: string) {
    return await this.page.locator(selector).count();
  }

  async click(selector: string, options?: { force: boolean }) {
    const ele = this.page.locator(selector).nth(0);
    try {
      await ele.scrollIntoViewIfNeeded();
    } catch (error) {
      // continue to click
    }
    await ele.click({ force: options?.force });
  }

  async clickByText(text: string, options?: { force: boolean }) {
    const ele = this.page.locator(`text="${text}"`).nth(0);
    await ele.scrollIntoViewIfNeeded();
    await ele.click(options ?? { force: true });
  }

  async clickButtonByText(buttonName: string) {
    await this.page.getByRole('button', { name: buttonName }).nth(0).click();
  }

  async clickLinkByText(text: string) {
    await this.page.getByRole('link', { name: text }).nth(0).click();
  }

  async enterText(selector: string, text: any) {
    const ele = this.page.locator(selector).nth(0);
    await ele.scrollIntoViewIfNeeded();
    await ele.clear();
    await ele.fill(String(text));
  }

  async enterTextInIframe(iframeElement: string, selector: string, text: string) {
    const iframeEle = await this.page.waitForSelector(iframeElement);
    const ele = await iframeEle.contentFrame();
    await ele?.locator(selector).fill(text);
  }

  async wait(timeInSeconds: number) {
    await this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async waitForTextVisibility(text: string, timeInSeconds?: number) {
    let customTimeout = 0;
    if (typeof timeInSeconds !== 'undefined') {
      customTimeout = timeInSeconds * 1000;
    } else {
      customTimeout = 120 * 1000;
    }
    try {
      await this.page.waitForSelector(`text="${text}"`, {
        timeout: customTimeout,
      });
    } catch (error) {
      throw new Error(`${text} not found`);
    }
  }

  async waitForTextInvisibility(text: string, timeInSeconds?: number) {
    let customTimeout = 0;
    if (typeof timeInSeconds !== 'undefined') {
      customTimeout = timeInSeconds * 1000;
    } else {
      customTimeout = 120 * 1000;
    }
    try {
      await this.page.waitForSelector(`text="${text}"`, {
        state: 'detached',
        timeout: customTimeout,
      });
    } catch (error) {
      throw new Error(`${text} not found`);
    }
  }

  async waitForElementEnabled(locator: string, timeInSeconds?: number) {
    const timeout = (timeInSeconds ?? 120) * 1000;

    try {
      const element = this.page.locator(locator);

      // wait until element is visible
      await element.waitFor({ state: 'visible', timeout });

      // wait until element is enabled
      await expect(element).toBeEnabled({ timeout });
    } catch (error) {
      throw new Error(`Element "${locator}" is not enabled within ${timeout / 1000}s`);
    }
  }

  async waitForTextInsideButtonVisibility(text: string, timeoutInSeconds: number) {
    await this.page
      .getByRole('button')
      .filter({ hasText: text })
      .first()
      .waitFor({
        state: 'visible',
        timeout: timeoutInSeconds * 1000,
      });
  }

  async waitForElementVisibility(selector: string, timeInSeconds: number) {
    try {
      const ele = this.page.locator(selector).first();
      await ele.waitFor({ state: 'visible', timeout: timeInSeconds * 1000 });
    } catch (error) {
      throw new Error(`${selector} selector is not visible`);
    }
  }

  async waitForElementInvisibility(selector: string, timeInSeconds: number) {
    try {
      const ele = this.page.locator(selector).first();
      await ele.waitFor({ state: 'detached', timeout: timeInSeconds * 1000 });
    } catch (error) {
      throw new Error(`${selector} selector is still visible`);
    }
  }

  async waitForElementToDisappear(
    target: Locator | string,
    timeoutInSeconds = 60
  ): Promise<void> {
    const locator =
      typeof target === 'string'
        ? this.page.locator(target)
        : target;

    await locator.waitFor({
      state: 'hidden',
      timeout: timeoutInSeconds * 1000,
    });
  }

  async waitUntilHidden(selector: string, timeInSeconds: number) {
    try {
      const ele = this.page.locator(selector).first();
      await ele.waitFor({ state: 'hidden', timeout: timeInSeconds * 1000 });
    } catch (error) {
      throw new Error(`${selector} selector is not hidden`);
    }
  }

  async isElementDisabled(selector: string) {
    const ele = this.page.locator(selector);
    await ele.scrollIntoViewIfNeeded();
    return await ele.isDisabled();
  }

  async isElementVisible(selector: string) {
    const ele = this.page.locator(selector);
    return await ele.isVisible();
  }

  async check(selector: string): Promise<void> {
    const checkbox = this.page.locator(selector);

    if (await checkbox.isChecked()) return;

    try {
      await checkbox.check({ force: true });
    } catch {
      await checkbox.evaluate((el) => {
        const clickable =
          el.closest('label') ||
          el.parentElement?.querySelector('div');

        (clickable as HTMLElement)?.click();
      });
    }
  }

  async uncheck(selector: string): Promise<void> {
    const checkbox = this.page.locator(selector);

    if (!(await checkbox.isChecked())) return;

    try {
      await checkbox.uncheck({ force: true });
    } catch {
      await checkbox.evaluate((el) => {
        const clickable =
          el.closest('label') ||
          el.parentElement?.querySelector('div');

        (clickable as HTMLElement)?.click();
      });
    }
  }

  async clear(selector: string) {
    const ele = this.page.locator(selector).nth(0);
    await ele.scrollIntoViewIfNeeded();
    await ele.clear();
  }

  async isChecked(selector: string) {
    return await this.page.locator(selector).isChecked();
  }

  async getText(selector: string) {
    const ele = this.page.locator(selector);
    await ele.scrollIntoViewIfNeeded();
    return await ele.textContent();
  }

  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  /**
   * Fill text inside an iframe element (contenteditable / input / textarea)
   * @param frameSelector iframe css selector
   * @param targetSelector selector inside iframe
   * @param text text to input
   */
  async fillInFrame(frameSelector: string, targetSelector: string, text: string): Promise<void> {
    const target = this.page.frameLocator(frameSelector).locator(targetSelector);

    await target.waitFor({ state: 'visible', timeout: 80_000 });
    await target.click();

    await target.evaluate((el: any) => {
      if (el.isContentEditable) {
        el.innerHTML = '';
      } else {
        el.value = '';
      }
    });

    await target.fill(text);
  }

  async toggleOn(selector: string): Promise<void> {
    const checkbox = this.page.locator(selector);

    await checkbox.evaluate((el) => {
      const wrapper =
        el.closest('label') ||
        el.parentElement?.querySelector('div');

      (wrapper as HTMLElement)?.click();
    });
  }

  async isToggleOn(selector: string): Promise<boolean> {
    const checkbox = this.page.locator(selector);

    return checkbox.evaluate((el) => {
      const wrapper =
        el.closest('label') ||
        el.parentElement?.querySelector('div');

      if (!wrapper) return false;

      return (
        wrapper.getAttribute('aria-checked') === 'true' ||
        wrapper.className.includes('peer-checked')
      );
    });
  }

  async isTextVisible(text: string, timeoutInSeconds: number = 5): Promise<boolean> {
    const timeout = timeoutInSeconds * 1000;

    try {
      const locator = this.page.getByText(text, { exact: false });

      await locator.waitFor({ state: 'visible', timeout });
      return await locator.isVisible();
    } catch {
      return false;
    }
  }
}
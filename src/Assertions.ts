import { expect } from '@playwright/test';
import { WebOperations } from './WebOperations';

export class Assertions extends WebOperations {
  async checkElementInvisibility(selector: string) {
    expect((await this.page.$$(selector)).length, `${selector} selector is visible`).toBe(0);
  }

  async checkElementVisibility(selector: string) {
    expect((await this.page.$$(selector)).length, `${selector} selector is not visible`).toBeGreaterThanOrEqual(1);
  }

  async checkPresenceOfTextInsideElement(selector: string, text: string) {
    await this.page.locator(selector).nth(0).scrollIntoViewIfNeeded();
    const allTexts = await this.page.locator(selector).allTextContents();
    expect(allTexts.toString(), `${text} is present`).toContain(text);
  }

  async checkAbsenceOfTextInsideElement(selector: string, text: string) {
    const allTexts = await this.page.locator(selector).allTextContents();
    expect(allTexts.toString().includes(text), `${text} is not present`).toBe(false);
  }

  async checkTextVisibility(text: string) {
    const ele = this.page.getByText(text).nth(0);
    await ele.scrollIntoViewIfNeeded();
    expect(await ele.isVisible(), text).toBeTruthy();
  }

  async checkTextInvisibility(text: string, timeInSeconds?: number) {
    let customTimeout = 0;
    if (typeof timeInSeconds !== 'undefined') {
      customTimeout = timeInSeconds * 1000;
    } else {
      customTimeout = 120 * 1000;
    }
    const ele = this.page.getByText(text).nth(0);
    await ele.waitFor({ state: 'detached', timeout: customTimeout });
  }

  async checkAttributeValue(selector: string, attribute: string, text: string) {
    const ele = this.page.locator(selector);
    await ele.scrollIntoViewIfNeeded();
    expect(await ele.getAttribute(attribute), `${attribute} attribute value is not correct`).toContain(text);
  }

  async checkInputValue(selector: string, value: string) {
    const ele = this.page.locator(selector);
    await expect(ele).toHaveValue(value);
  }
}
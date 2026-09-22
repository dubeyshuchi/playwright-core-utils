"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assertions = void 0;
const test_1 = require("@playwright/test");
const WebOperations_1 = require("./WebOperations");
class Assertions extends WebOperations_1.WebOperations {
    async checkElementInvisibility(selector) {
        (0, test_1.expect)((await this.page.$$(selector)).length, `${selector} selector is visible`).toBe(0);
    }
    async checkElementVisibility(selector) {
        (0, test_1.expect)((await this.page.$$(selector)).length, `${selector} selector is not visible`).toBeGreaterThanOrEqual(1);
    }
    async checkPresenceOfTextInsideElement(selector, text) {
        await this.page.locator(selector).nth(0).scrollIntoViewIfNeeded();
        const allTexts = await this.page.locator(selector).allTextContents();
        (0, test_1.expect)(allTexts.toString(), `${text} is present`).toContain(text);
    }
    async checkAbsenceOfTextInsideElement(selector, text) {
        const allTexts = await this.page.locator(selector).allTextContents();
        (0, test_1.expect)(allTexts.toString().includes(text), `${text} is not present`).toBe(false);
    }
    async checkTextVisibility(text) {
        const ele = this.page.getByText(text).nth(0);
        await ele.scrollIntoViewIfNeeded();
        (0, test_1.expect)(await ele.isVisible(), text).toBeTruthy();
    }
    async checkTextInvisibility(text, timeInSeconds) {
        let customTimeout = 0;
        if (typeof timeInSeconds !== 'undefined') {
            customTimeout = timeInSeconds * 1000;
        }
        else {
            customTimeout = 120 * 1000;
        }
        const ele = this.page.getByText(text).nth(0);
        await ele.waitFor({ state: 'detached', timeout: customTimeout });
    }
    async checkAttributeValue(selector, attribute, text) {
        const ele = this.page.locator(selector);
        await ele.scrollIntoViewIfNeeded();
        (0, test_1.expect)(await ele.getAttribute(attribute), `${attribute} attribute value is not correct`).toContain(text);
    }
    async checkInputValue(selector, value) {
        const ele = this.page.locator(selector);
        await (0, test_1.expect)(ele).toHaveValue(value);
    }
}
exports.Assertions = Assertions;

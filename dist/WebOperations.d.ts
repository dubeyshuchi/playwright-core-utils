import { Locator } from '@playwright/test';
import { Initialization } from './Initialization';
export declare class WebOperations extends Initialization {
    reload(): Promise<void>;
    close(): Promise<void>;
    pressEnter(): Promise<void>;
    pressKey(key: string): Promise<void>;
    getCount(selector: string): Promise<number>;
    click(selector: string, options?: {
        force: boolean;
    }): Promise<void>;
    clickByText(text: string, options?: {
        force: boolean;
    }): Promise<void>;
    clickButtonByText(buttonName: string): Promise<void>;
    clickLinkByText(text: string): Promise<void>;
    enterText(selector: string, text: any): Promise<void>;
    enterTextInIframe(iframeElement: string, selector: string, text: string): Promise<void>;
    wait(timeInSeconds: number): Promise<void>;
    waitForTextVisibility(text: string, timeInSeconds?: number): Promise<void>;
    waitForTextInvisibility(text: string, timeInSeconds?: number): Promise<void>;
    waitForElementEnabled(locator: string, timeInSeconds?: number): Promise<void>;
    waitForTextInsideButtonVisibility(text: string, timeoutInSeconds: number): Promise<void>;
    waitForElementVisibility(selector: string, timeInSeconds: number): Promise<void>;
    waitForElementInvisibility(selector: string, timeInSeconds: number): Promise<void>;
    waitForElementToDisappear(target: Locator | string, timeoutInSeconds?: number): Promise<void>;
    waitUntilHidden(selector: string, timeInSeconds: number): Promise<void>;
    isElementDisabled(selector: string): Promise<boolean>;
    isElementVisible(selector: string): Promise<boolean>;
    check(selector: string): Promise<void>;
    uncheck(selector: string): Promise<void>;
    clear(selector: string): Promise<void>;
    isChecked(selector: string): Promise<boolean>;
    getText(selector: string): Promise<string | null>;
    pressTab(): Promise<void>;
    /**
     * Fill text inside an iframe element (contenteditable / input / textarea)
     * @param frameSelector iframe css selector
     * @param targetSelector selector inside iframe
     * @param text text to input
     */
    fillInFrame(frameSelector: string, targetSelector: string, text: string): Promise<void>;
    toggleOn(selector: string): Promise<void>;
    isToggleOn(selector: string): Promise<boolean>;
    isTextVisible(text: string, timeoutInSeconds?: number): Promise<boolean>;
}

import { WebOperations } from './WebOperations';
export declare class Assertions extends WebOperations {
    checkElementInvisibility(selector: string): Promise<void>;
    checkElementVisibility(selector: string): Promise<void>;
    checkPresenceOfTextInsideElement(selector: string, text: string): Promise<void>;
    checkAbsenceOfTextInsideElement(selector: string, text: string): Promise<void>;
    checkTextVisibility(text: string): Promise<void>;
    checkTextInvisibility(text: string, timeInSeconds?: number): Promise<void>;
    checkAttributeValue(selector: string, attribute: string, text: string): Promise<void>;
    checkInputValue(selector: string, value: string): Promise<void>;
}

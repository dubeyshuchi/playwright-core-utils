import { Page } from '@playwright/test';

export class Initialization {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
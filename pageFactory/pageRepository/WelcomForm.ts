import { Page, BrowserContext, Locator, expect } from '@playwright/test';

export class WelcomForm { 
    readonly page: Page; 
    readonly context: BrowserContext; 
    readonly DISMISS_BUTTON : Locator;
    
    
    constructor(page: Page, context : BrowserContext){ 
        this.page = page; 
        this.context = context; 
        this.DISMISS_BUTTON = page.getByLabel('Close Welcome Banner'); 

    }

    async DismissIfAppear(): Promise<void> {
        // Check if a dialog is visible (modify selector as needed)
        const isDialogVisible = await this.DISMISS_BUTTON.isVisible();

        if (isDialogVisible) {
            // Close the dialog (modify selector and action as needed)
            await this.DISMISS_BUTTON.click();
            await this.page.waitForTimeout(2000); // Optional wait for dialog to close
        }
        
    }

}
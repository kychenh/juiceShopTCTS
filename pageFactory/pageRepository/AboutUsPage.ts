import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { Topbar } from './Topbar';



export class AboutUs { 
    readonly page: Page;
    readonly context: BrowserContext;
    readonly topbar : Topbar; 
    readonly HEADINGTEXT : Locator; 

    constructor(page: Page, context : BrowserContext) { 
        this.page = page;
        this.context = context;
        this.HEADINGTEXT = this.page.getByRole('heading', { name: 'About Us' }); 
        this.topbar = new Topbar(page, context); 
    }

    async verifyHeadingAboutUsAppear() : Promise<void> {
        await expect(this.HEADINGTEXT).toBeVisible();
    }

    async gotoAboutUs () : Promise<void> { 
        await this.topbar.selectAboutUs();
    }
}
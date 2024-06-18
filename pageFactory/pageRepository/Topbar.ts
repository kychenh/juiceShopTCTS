import { Page, BrowserContext, Locator, expect } from '@playwright/test';

export class Topbar { 
    readonly page: Page; 
    readonly context: BrowserContext; 
    readonly ACCOUNT_BUTTON : Locator;
    readonly LOGIN_MENUITEM : Locator; 
    readonly LOGOUT_MENUITEM : Locator; 
    readonly SHOPCART_BUTTON : Locator;
    readonly MAINMENU_BUTTON : Locator; 
    readonly ABOUTUS_MENUITEM : Locator; 

  
    constructor(page: Page, context : BrowserContext){ 
        this.page = page; 
        this.context = context; 
        this.ACCOUNT_BUTTON = this.page.getByLabel('Show/hide account menu');
        this.SHOPCART_BUTTON = page.locator("app-navbar button", {hasText:'basket'});
        
        this.LOGIN_MENUITEM = this.page.getByRole('menuitem', { name: 'Go to login page' }); 
        this.LOGOUT_MENUITEM = this.page.getByRole('menuitem', { name: 'Logout' });

        this.MAINMENU_BUTTON = this.page.getByLabel('Open Sidenav');
        this.ABOUTUS_MENUITEM = this.page.getByLabel('Go to about us page');

    }

    async selectLoginMenu(): Promise<void> {
        await this.ACCOUNT_BUTTON.click(); 
        await this.LOGIN_MENUITEM.click();
        
    }

    async selectLogoutMenu():Promise<void> { 
        await this.ACCOUNT_BUTTON.click(); 
        await this.LOGOUT_MENUITEM.click();
    }

    async verifyBaseket(): Promise<void> {
        await expect(this.SHOPCART_BUTTON).toBeVisible();
    }

    async selectAboutUs() : Promise<void> { 
       await this.MAINMENU_BUTTON.click();
       await this.ABOUTUS_MENUITEM.click();
    }

}
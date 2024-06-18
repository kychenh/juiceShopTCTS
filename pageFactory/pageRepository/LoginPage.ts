import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
import { RegisterForm } from './RegisterForm';
import { Topbar } from './Topbar';
import { WelcomForm } from './WelcomForm';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly topbar: Topbar;
    readonly welcomform : WelcomForm;

    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly SHOPCART_BUTTON: Locator;
    readonly DISMISS_BUTTON : Locator;
    readonly NOTYETCUSTOMER_LINK:Locator; 

    readonly ERROR_MSG : Locator; 

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.getByRole('textbox', {name: 'email'});
        
        this.PASSWORD_EDITBOX = page.getByRole('textbox', {name: 'password'});
        this.LOGIN_BUTTON = page.locator('#loginButton');
        
        
        this.NOTYETCUSTOMER_LINK = page.getByRole('link', { name: 'Not yet a customer?' });
        this.ERROR_MSG = page.getByText('Invalid email or password.');

        this.topbar = new Topbar(this.page, this.context);
        this.welcomform = new WelcomForm(this.page, this.context);
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/#/login", {timeout: 60000, waitUntil:"domcontentloaded"});
        await webActions.delay(3000);
        await this.welcomform.DismissIfAppear();
    }

    async clickOnLoginMainButton(): Promise<void> {
        await this.LOGIN_BUTTON.click();
    }

    async loginToApplication(): Promise<void> {
        // const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testConfig.username);
        await this.PASSWORD_EDITBOX.fill(testConfig.password);
        await this.LOGIN_BUTTON.click();
        
        await webActions.delay(3000);
        await this.welcomform.DismissIfAppear();
        
    }

    async loginFormVisible():Promise<void> {
        await expect(this.LOGIN_BUTTON).toBeVisible();
    }

    

    async gotoRegisterForm(): Promise<RegisterForm> { 
        
        await this.NOTYETCUSTOMER_LINK.click(); 
        const registerfrm = new RegisterForm(this.page, this.context); 
        return registerfrm; 
    }

    async enterEmail(email):Promise<void> { 
        await this.USERNAME_EDITBOX.fill(email);
    }

    async enterPassword(pass) : Promise<void> { 
        await this.PASSWORD_EDITBOX.fill(pass); 
    }

    async clickSubmit(): Promise<void> {
        await this.LOGIN_BUTTON.click();
    }

    async verifyErrorMessageAppear(): Promise<void> {
        await expect(this.ERROR_MSG).toBeVisible();
    }
}
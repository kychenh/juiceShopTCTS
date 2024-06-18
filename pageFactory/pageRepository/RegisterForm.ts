import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';
import { Context } from 'vm';
import { Topbar } from './Topbar';
import { promises } from 'dns';
import exp = require('constants');
import { WelcomForm } from './WelcomForm';


let webActions: WebActions;

export class RegisterForm { 
    readonly page : Page;
    readonly context: BrowserContext;
    readonly topbar : Topbar; 
    readonly welcomform: WelcomForm;

    readonly EMAIL_INPUT : Locator; 
    readonly PASSWORD1_INPUT: Locator; 
    readonly PASSWORD2_INPUT : Locator; 
    readonly QUESTION_DROPBOX : Locator; 
    readonly QUESTION_LISTBOX:Locator;
    readonly ANSWER_INPUT : Locator; 
    readonly SUBMIT_BUTTON : Locator;
    readonly REGISTER_COMOPLETE_MESSAGE: Locator; 
    
    readonly LINKTOLOGINFORM_LINK:Locator;
    // readonly EMAIL_ERR :Locator;
    // readonly PASSWORD1_ERR : Locator; 
    // readonly PASSWORD2_ERR : Locator; 
    
    
    constructor(page: Page, context : BrowserContext) { 
        this.page = page;
        this.context = context; 
        this.EMAIL_INPUT = this.page.getByLabel('Email address field'); 
        this.PASSWORD1_INPUT= this.page.getByLabel('Field for the password') ; 
        this.PASSWORD2_INPUT = this.page.getByLabel('Field to confirm the password');
        this.QUESTION_DROPBOX = this.page.getByLabel('Selection list for the').locator('span') ;
        this.ANSWER_INPUT = this.page.getByPlaceholder('Answer to your security') ; 
        this.SUBMIT_BUTTON = this.page.getByLabel('Button to complete the') ;
        this.REGISTER_COMOPLETE_MESSAGE = this.page.getByText('Registration completed');
        this.QUESTION_LISTBOX = this.page.locator("div[role='listbox'] [role='option']");
        this.LINKTOLOGINFORM_LINK = this.page.getByRole('link', { name: 'Already a customer?' });
        this.welcomform = new WelcomForm(this.page, this.context);

    } 

    async gotoRegisterFormByURL() : Promise<void> {
        await this.page.goto('/#/register');
        await this.welcomform.DismissIfAppear();

    }

    async fillData(email, pass1, pass2, question, answer): Promise<void> { 
        this.fillEmail(email); 
        await this.PASSWORD1_INPUT.fill(pass1)
        await this.PASSWORD2_INPUT.fill(pass2);
        await this.QUESTION_DROPBOX.click();
        await this.QUESTION_LISTBOX.filter({hasText: question}).click();
        await this.ANSWER_INPUT.fill(answer);
    }

    async fillEmail(email):Promise<void> { 
        await this.EMAIL_INPUT.fill(email);  
    }

    async verifyEmailInvalidErrMsg():Promise<void> {
        await expect(this.page.getByText('Email address is not valid.')).toBeVisible();
    }

    async verifyPassInvalidErrMsg():Promise<void> {
        await expect(this.page.getByText('Please provide a password.')).toBeVisible();
    }


    async verifyErroMessage(msg : string) : Promise<void> {
        await expect(this.page.getByAltText(msg)).toBeVisible();
    }

    async verifyFormVisible():Promise<void> {
        await expect(this.ANSWER_INPUT).toBeVisible(); 
    }


    async clickLinktoLogin():Promise<void> {
        await this.welcomform.DismissIfAppear();
        await this.LINKTOLOGINFORM_LINK.click();
    }

    async verifyCompelteMsgVisible(): Promise<void> { 
        await expect(this.REGISTER_COMOPLETE_MESSAGE).toBeVisible();
    }
}
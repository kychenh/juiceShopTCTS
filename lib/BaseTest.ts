import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { WebActions } from '@lib/WebActions';
import { RegisterForm } from '@pages/RegisterForm';
import { AboutUs } from '@pages/AboutUsPage';


const test = baseTest.extend<{
    loginPage: LoginPage;
    webActions: WebActions;
    registerform : RegisterForm;
    aboutus : AboutUs;
    
    testInfo: TestInfo;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    registerform: async ({page,context}, use) => {
        await use(new RegisterForm(page, context));
    }, 
    aboutus : async ({page, context}, use) => {
        await use(new AboutUs(page, context));
    }
    
})

export default test;
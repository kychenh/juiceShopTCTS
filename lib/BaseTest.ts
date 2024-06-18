import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
// import { ElementsPage } from '@pages/ElementsPage';
// import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
// import { WidgetsPage } from '@pages/WidgetsPage';
// import { InteractionsPage } from '@pages/InteractionsPage';
import { WebActions } from '@lib/WebActions';
import { RegisterForm } from '@pages/RegisterForm';
import { AboutUs } from '@pages/AboutUsPage';
// import AxeBuilder from '@axe-core/playwright';

const test = baseTest.extend<{
    loginPage: LoginPage;
    webActions: WebActions;
    registerform : RegisterForm;
    aboutus : AboutUs;
    // elementsPage: ElementsPage;
    // alertsFrameWindowsPage: AlertsFrameWindowsPage;
    // widgetsPage: WidgetsPage;
    // interactionsPage: InteractionsPage;
    // makeAxeBuilder: AxeBuilder;
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
    // elementsPage: async ({ page, context }, use) => {
    //     await use(new ElementsPage(page, context));
    // },
    // alertsFrameWindowsPage: async ({ page, context }, use) => {
    //     await use(new AlertsFrameWindowsPage(page, context));
    // },
    // widgetsPage: async ({ page, context }, use) => {
    //     await use(new WidgetsPage(page, context));
    // },
    // interactionsPage: async ({ page, context }, use) => {
    //     await use(new InteractionsPage(page, context));
    // },
    // makeAxeBuilder: async ({ page }, use) => {
    //     await use(new AxeBuilder({ page })
    //         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    //         .exclude('#commonly-reused-element-with-known-issue'));
    // }
})

export default test;
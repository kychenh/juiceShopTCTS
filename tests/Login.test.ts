import test from '@lib/BaseTest';
import { testConfig } from '../testConfig';
// We can use Steps like in Cucmber format as shown below

test(`Verify Login with valid credential`, { tag: '@Smoke'}, async ({ loginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    
    await test.step(`Login to application`, async () => {
        await loginPage.loginToApplication();
    });

    await test.step(`Verify User is logged in and verify baseket menu appear`, async () => {
        await loginPage.topbar.verifyBaseket();
    });
}); 

test("Verify login valid email, invalid password.  ", async ({loginPage}) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });

    await test.step("Enter the email", async () => {
        await loginPage.enterEmail(testConfig.username); 
    }); 

    await test.step("Enter the invalid password", async () => {
        await loginPage.enterPassword('1111111111');
    });

    await test.step("click submit button", async () => {
        await loginPage.clickSubmit();
    })

    await test.step("Verify the error message appear", async () => {
        await loginPage.verifyErrorMessageAppear();
    });
})

test("Verify user can logout after login successfully", async ({loginPage}) => {
    await test.step("", async () => {
        
    }); await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    
    await test.step(`Login to application`, async () => {
        await loginPage.loginToApplication();
    });

    await test.step("click logout menu", async () => {
        await loginPage.topbar.selectLogoutMenu();
    }); 

});


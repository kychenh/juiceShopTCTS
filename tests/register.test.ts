import test from '@lib/BaseTest';
import { resourceUsage } from 'process';
import { testConfig } from '../testConfig';

test("1 verify user can goto register form", async ({loginPage, registerform}) => {
    await test.step("Open login page", async () => {
        await loginPage.navigateToURL();
    });
    
    await test.step("Goto Register form", async () => {
        await loginPage.gotoRegisterForm();
    });
    
    await test.step("Verify the register Form is opened",async () => {
        await registerform. verifyFormVisible(); 
    });
    
} );

test("Verify invalid email show error message", async ({loginPage, registerform}) => {
    await test.step("Open login page", async () => {
        await loginPage.navigateToURL();
    });

    await test.step("Goto Register form", async () => {
        await loginPage.gotoRegisterForm();
    });

    await test.step("Enter invalid email", async () => {
        await registerform.fillEmail("fakestringhere"); 
    });

    await registerform.PASSWORD1_INPUT.click();
    await registerform.verifyEmailInvalidErrMsg(); 
});

test("Verify the invalid password show error message", async ({loginPage, registerform}) => {
    await test.step("Open login page", async () => {
        await loginPage.navigateToURL();
    });

    await test.step("Goto Register form", async () => {
        await loginPage.gotoRegisterForm();
    });

    await test.step("Click the password field", async () => {
        await registerform.PASSWORD1_INPUT.click();
    });

    await test.step("Click the confirm password field", async () => {
        await registerform.PASSWORD2_INPUT.click();
    });

    await test.step("Verify the password needed is shown", async () => {
        await registerform.verifyPassInvalidErrMsg();
    });

});

test("Verify the ummatch password show error message", async ({loginPage, registerform}) => {
    await test.step("Open login page", async () => {
        await loginPage.navigateToURL();
    });

    await test.step("Goto Register form", async () => {
        await loginPage.gotoRegisterForm();
    });

    await test.step("Enter valid email", async () => {
        await registerform.fillEmail(testConfig.username);
    });

    await test.step("Enter password field 1", async () => {
        await registerform.PASSWORD1_INPUT.fill('password1');
    });

    await test.step("Enter password field 2", async () => {
        await registerform.PASSWORD1_INPUT.fill('password2');
    });

    await test.step("Verify error unmatch message is shown", async () => {
        await registerform.verifyErroMessage('Passwords do not match');
    });

});

test("Verify the valid data allow to register successfully", async ({loginPage, registerform}) => {
    await test.step("Open login page", async () => {
        await loginPage.navigateToURL();
    });

    await test.step("Goto Register form", async () => {
        await loginPage.gotoRegisterForm();
    });

    await test.step("Fill data for all fields", async () => {
        await registerform.fillData(testConfig.username, testConfig.password, testConfig.password, '' , '01/01/2000'); 
    });

    await test.step("Click submit button", async () => {
        await registerform.SUBMIT_BUTTON.click();
    });

    await test.step("Verify complete successfully message appear", async () => {
        await registerform.verifyCompelteMsgVisible();
    });

    

    // await test.step("", async () => {
        
    // });
});

test("Verify the hyperlink 'alredy customer' lead to login form", async ({loginPage, registerform}) => {
    await test.step("Goto Register Form by URL ", async () => {
        await registerform.gotoRegisterFormByURL();
    });

    await test.step("Click the hyperlink 'already customer' ", async () => {
        await registerform.clickLinktoLogin(); 
    }) ;

    await test.step("Verify the login page is visible.", async () => {
        await loginPage.loginFormVisible();
    });
});

// test("", async ({loginPage, registerform}) => {
//     await test.step("", async () => {
        
//     })
// })
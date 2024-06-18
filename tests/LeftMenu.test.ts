import test from '@lib/BaseTest';

test("Verify about menu of left menu", async ({aboutus, loginPage}) => {
    await test.step("Got to login page frist", async () => {
        await loginPage.navigateToURL();    
    });
    
    await test.step("Select about us menu item", async () => {
        await aboutus.gotoAboutUs();
    });
    await test.step("verify the heading text is appear", async () => {
        await aboutus.verifyHeadingAboutUsAppear();
    });
    
});
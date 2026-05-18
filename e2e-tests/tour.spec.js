const { test, expect } = require('@playwright/test');

test.describe('Collage App Tour', () => {
    test('Check if the tour contains the new interaction text', async ({ page }) => {
        await page.goto('http://localhost:1313/collage/');
        
        // Click the tour button
        await page.locator('#btn-tour').click();
        
        // Ensure popover is visible
        const popover = page.locator('.driver-popover');
        await expect(popover).toBeVisible();
        
        // Click "Next" until we reach the Board description (which is the last step)
        // Step 1: Welcome
        // Step 2: Drop Zone
        // Step 3: Cycle
        // Step 4: Stretch
        // Step 5: Settings
        // Step 6: Export
        // Step 7: Board (The Canvas & Interactions)
        
        for (let i = 0; i < 6; i++) {
            await page.locator('.driver-popover-next-btn').click();
            await page.waitForTimeout(300); // Wait for animation
        }
        
        // Now we should be on the last step
        const title = await page.locator('.driver-popover-title').innerText();
        const desc = await page.locator('.driver-popover-description').innerText();
        
        console.log("Final Step Title:", title);
        console.log("Final Step Desc:", desc);
        
        expect(title).toBe('The Canvas & Interactions');
        expect(desc).toContain('Drag inside a photo to adjust its crop');
    });
});

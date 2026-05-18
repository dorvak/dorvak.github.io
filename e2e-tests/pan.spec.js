const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Collage App Image Panning', () => {
    test('Can pan a cropped image inside its slot', async ({ page }) => {
        await page.goto('http://localhost:1313/collage/');
        
        // Upload one image
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator('#drop-zone').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles([path.join(__dirname, 'test-images/landscape.jpg')]);
        
        // Wait for render
        await page.waitForTimeout(500);

        // Turn on stretch to force the portrait image to crop into the A4 page height
        await page.locator('#btn-stretch').click();
        await page.waitForTimeout(500);

        const slotBg = page.locator('.slot-bg').first();
        
        // Check initial background position
        const initialPos = await slotBg.evaluate(el => el.style.backgroundPosition);
        
        // Perform a mouse drag
        const box = await slotBg.boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        // Move mouse 50 pixels down and right
        await page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 50, { steps: 10 });
        await page.mouse.up();
        
        // Check new background position
        const newPos = await slotBg.evaluate(el => el.style.backgroundPosition);
        
        console.log(`Initial position: ${initialPos}`);
        console.log(`New position: ${newPos}`);
        
        expect(initialPos).not.toEqual(newPos);
        expect(newPos).toContain('calc'); // Should use our calculated offset format
    });
});

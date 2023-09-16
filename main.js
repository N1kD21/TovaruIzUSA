const { Keyboard } = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const googleUsername = "your_email";
const googlePassword = "your_password";

(async () => {
   const browser = await puppeteer.launch({
      headless: false,
      args:[
         '--no-sandbox',
         '--disable-gpu',
         '--enable-webgl',
      ]
   }); 

   const loginUrl = "https://mail.google.com/";
   const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36'; 
   const page = await browser.newPage();
   await page.setUserAgent(ua);
   await page.goto(loginUrl, { waitUntil: 'networkidle2' });
   await page.type('input[type="email"]', googleUsername);
   await page.keyboard.press('Enter');
   await page.waitForTimeout(2000);
   await page.type('input[type="password"]', googlePassword);
  await page.keyboard.press('Enter');
   
   await page.waitForTimeout(2000);

  await page.waitForSelector('div.bsU');
  const unreadCount = await page.$eval('div.bsU', el => el.innerText);  
  console.log(`Кількість непрочитаних листів: ${unreadCount}`);

  await browser.close();
})();
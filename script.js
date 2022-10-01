const puppeteer = require("puppeteer");
const fs=require("fs");
const request = require("request");
const id="biheg51831@vvaa1.com";
const pw="ythack123";
//const urls=require("./links.json");
let url=[];
let string = "https://www.youtube.com/";
async function login()
{
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
       // slowMo : 100
      });
      let pages = await browser.pages();
      let tab = pages[0];
      await tab.goto("https://www.youtube.com/account/login/");
      await tab.waitForSelector(".whsOnd.zHQkBf")
      await tab.type(".whsOnd.zHQkBf", id);
      await tab.waitForSelector('span[jsname="V67aGc"]')
      await tab.click('span[jsname="V67aGc"]')
      await tab.waitForSelector("input[name='password']", {visible: true})
      await tab.type("input[name='password']", "ythack123");
      await tab.keyboard.press("Enter");
      await tab.waitForSelector("#search", {visible: true})
      await tab.type("#search", "Manipal Hospitals")
      await tab.keyboard.press("Enter to start");
      await tab.waitForSelector(".style-scope.ytd-channel-renderer.no-transition",{visible:true})
      await tab.click(".style-scope.ytd-channel-renderer.no-transition")
      await tab.waitForTimeout(2000);
      await tab.waitForSelector(".tab-content.style-scope.tp-yt-paper-tab",{visible:true})
      let allTabs= await tab.$$(".tab-content.style-scope.tp-yt-paper-tab");
      let videoTab=allTabs[1];
      await videoTab.click();
     // yha se link nikalne ka process start kr rha
    await tab.waitForNavigation('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail',{waitUntil:"load"})
     //await tab.waitForSelector('#thumbnail',{visible:true})
      let allvideotags=await tab.$$('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')
      for(let i=0;i<allvideotags.length;i++)
      {
      var videoLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); },allvideotags[i])
          url.push(string+videoLink);
          await tab.keyboard.press("PageDown");
          await tab.waitForTimeout(500)
      }
      fs.writeFileSync("./links.json",JSON.stringify(url));
      for(let i=0;i<=url.length;i++)
      {
          let newTab = await browser.newPage();;
         // await newTab.goto(url[i]);
          //await newTab.waitForNavigation(".yt-simple-endpoint.style-scope.ytd-toggle-button-renderer",{waitUntil:'load'})
          await newTab.goto(url[i],{"waitUntil":["load","networkidle2"]});
          let likebutton=await newTab.$$('a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer');
          await newTab.waitForTimeout(2000);
          let like=likebutton[6]
          await like.click();
          await newTab.waitForTimeout(2000);
          await newTab.close();
  
      }
      await tab.close();
    }login();
    

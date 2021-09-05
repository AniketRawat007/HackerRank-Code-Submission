const loginLink = "https://www.hackerrank.com/auth/login";
const emailpassObj = require("./secrets");
const { answers } = require("./codes");
const puppeteer = require("puppeteer");
// creates headless browser
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page, browser;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened ")
        let gPageOpenPromise = newTab.goto(loginLink);
        return gPageOpenPromise;
    }).then(function () {
        let emailWillBeEnteredPromise = page.type("input[id='input-1']", emailpassObj.email, { delay: 50 });
        return emailWillBeEnteredPromise;
    }).then(function () {
        let passwordWillBeEnteredPromise = page.type("input[type='password']",emailpassObj.password, { delay: 50 });
        return passwordWillBeEnteredPromise;
    }).then(function () {
        let loginWillBeDOnepromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        return loginWillBeDOnepromise;
    })
    .then(function () {
        let clickedOnAlgoPromise = waitAndClick(".track-card a[data-attr2='algorithms']", page);
        return clickedOnAlgoPromise;
    }).then(function () {
        let getToWarmUp = waitAndClick("input[value='warmup']", page);
        return getToWarmUp;
    }).then(function () {
        let waitFor3SecondsPromise = page.waitFor(3000);
        return waitFor3SecondsPromise;
    })
    // .then(function () {
    //     let challengeClickPromise = page.click(".challenge-submit-btn", { delay: 100 });
    //     return challengeClickPromise;``

    // })
    .then(function(){
        let AllChallangesArrPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:100});
        return AllChallangesArrPromise;
    }).then(function(questionsArr){
       // n number of question first
       console.log("number of questions",questionsArr.length);
       let qWillBeSolvedPromise=quesstionSolver(page,questionsArr[0],answers[0]);
       return qWillBeSolvedPromise;
    })


function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                let clickModal =
                    cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err)
            })
    }
    )
}

function quesstionSolver(page,question,anwers){
    return new Promise(function(resolve,reject){
        let qWillBeClickedPromise=question.click();
        //click
        // code type
        // ctrl A+ctrl x
        // click on editor
        // ctrl A+ctrl V
        //reached to editor
        
        qWillBeClickedPromise.then(function(){
            let waitForEditorToBeInFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditorToBeInFocus;
        })
        //click
        .then(function(){
            return waitAndClick(".checkbox-input",page);
        })
        .then(function(){
            return page.waitForSelector("textarea.custominput",{visible:true});
        })
        .then(function(){
            return page.type("textarea.custominput",answers,{delay:10});
        })
        .then(function(){
            let ctrlIsPressedP=page.keyboard.down("Control");
            return ctrlIsPressedP;
        })
        .then(function(){
            let AIsPressedP=page.keyboard.press("A",{delay:100});
            return AIsPressedP;
        })
        .then(function(){
            return page.keyboard.press("X",{delay:100});
        })
        .then(function(){
            let ctrlIsPressedP=page.keyboard.up("Control");
            return ctrlIsPressedP;
        })
        .then(function(){
            let waitForEditorToBeInFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditorToBeInFocus;
        })
        .then(function(){
            let ctrlIsPressedP=page.keyboard.down("Control");
            return ctrlIsPressedP;
        })
        .then(function(){
            let AIsPressedP=page.keyboard.press("A",{delay:100});
            return AIsPressedP;
        })
        .then(function(){
            return page.keyboard.press("X",{delay:100});
        })
        .then(function(){
            let ctrlIsPressedP=page.keyboard.up("Control");
            return ctrlIsPressedP;
        })
        .then(function(){
            return page.keyboard.type(answers,{delay:100});
        })
        .then(function(){
            return page.click(".hr-monaco__run-code",{delay:50});
        })
        .then(function(){
            return page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",{delay:1000})
        })
        .then(function(){
            return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",{delay:100});
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            console.log(err);
            reject(err);
        })

    })
}
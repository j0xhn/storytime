const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    describe('chromedriver test', () => {
      it('just do stuff', (done) => {
        var driver = new webdriver.Builder().
        usingServer('http://127.94.0.1:4444/wd/hub').
        withCapabilities({
          'browserName': 'chrome',
        }).build();
        driver.get('http://www.google.com/ncr');
        driver.findElement(By.name('q')).sendKeys('webdriver');
        driver.findElement(By.name('btnG')).click();
        console.log('before wait');
        driver.wait(until.titleIs('webdriver - Google Search'), 5000).then(function(){
          console.log('after wait');
          done();
        });
      });
    });

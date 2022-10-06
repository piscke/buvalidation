const {Builder, By, until} = require("selenium-webdriver")

async function example(){
    try {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://resultados.tse.jus.br/oficial/app/index.html#/eleicao;zn=0002;se=0824/dados-de-urna;e=e544;uf=ap;ufbu=ap;mubu=06050/boletim-de-urna");

        // await driver.manage().window().maximize();

        // await driver.findElement(By.xpath("//ion-icon[@src='assets/icones/marcador.svg']")).click();

        // //seleciona estado
        // await driver.findElement(By.xpath("//input[@formcontrolname='uf']")).click();
        // const estados = await driver.findElements(By.xpath("//div[@role='listbox']//mat-option]"));
        // estados[0].click();

        // //seleciona municipio
        // await driver.findElement(By.xpath("//input[@formcontrolname='uf']")).click();
        // const municipios = await driver.findElements(By.xpath("//div[@role='listbox']//mat-option]"));
        // municipios[0].click();

        await driver.findElement(By.xpath("//ion-button[contains(@class, 'button-block')]")).click();

        await driver.wait(until.elementLocated(By.xpath("//a[text() = ' Baixar o arquivo BU ']")), 30000);

        const elements = await driver.findElements(By.xpath("//p[text() = 'Comparecimento']/following-sibling::p[1]"));

        let values = [];

        await Promise.all(elements.map(async element => {
            const text = await element.getText();
            values.push(text);
        }));

        const result = values.every( v => v === values[0]);
        if (!result){
            console.log(values);
        } 
    }
    finally {
        await driver.quit();
    }
}

example();
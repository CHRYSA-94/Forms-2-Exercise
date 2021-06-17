import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(val:{value: number,currencyCode:string }, newCurrency: string): any {
    // const euroToDollar = 1.198;
    // const euroToYen = 132.52;
    // const dollarToEuro = 0.835;
    // const dollarToYen = 110.695;
    // const yenToDollar = 0.00903546;
    // const yenToEuro = 0.00755258;

//1os tropos kai o kaliteros giati ginetai mono enas ipologismos. kaleitai kat eftheian i katallili function
     const allData ={
        EUR: {
          EUR: (data = val.value) => { return "€" + data* 1},
          USD: (data = val.value) => { return "€" + data* 0.835 },
          JPY: (data = val.value) => { return "€" + data* 0.00755258 }
        },
        USD: {
          EUR: (data = val.value) => { return "$" + data* 1.198},
          USD: (data = val.value) => { return "$" + data* 1 },
          JPY: (data = val.value) => { return "$" + data* 0.00903546 }
        },
        JPY: {
          EUR: (data = val.value) => { return "¥" + data* 132.52},
          USD: (data = val.value) => { return "¥" + data* 110.695 },
          JPY: (data = val.value) => { return "¥" + data* 1 }
        }
      }

      return allData[newCurrency][val.currencyCode]()

//2os tropos alla oxi toso kalos giati i filter ektelei pollous ipologismous pou meiwnei to performance tou app
    // const obj =[
    //   { newCurrencyCode:"EUR", previousCurrencyCode:"EUR", multiplicationFactor: 1, symbol:"€"},
    //   { newCurrencyCode:"EUR", previousCurrencyCode:"USD", multiplicationFactor: 0.835, symbol:"€" },
    //   { newCurrencyCode:"EUR", previousCurrencyCode:"JPY", multiplicationFactor: 0.00755258, symbol:"€" },
    //   { newCurrencyCode:"USD", previousCurrencyCode:"USD", multiplicationFactor: 1, symbol:"$" },
    //   { newCurrencyCode:"USD", previousCurrencyCode:"EUR", multiplicationFactor: 1.198, symbol:"$" },
    //   { newCurrencyCode:"USD", previousCurrencyCode:"JPY", multiplicationFactor: 0.00903546, symbol:"$" },
    //   { newCurrencyCode:"JPY", previousCurrencyCode:"JPY", multiplicationFactor: 1, symbol:"¥" },
    //   { newCurrencyCode:"JPY", previousCurrencyCode:"USD", multiplicationFactor: 110.695, symbol:"¥" },
    //   { newCurrencyCode:"JPY", previousCurrencyCode:"EUR", multiplicationFactor: 132.52, symbol:"¥" }
    // ]

    // return obj.filter(eachObject => eachObject.newCurrencyCode === newCurrency && eachObject.previousCurrencyCode === val.currencyCode)
    //        .map(ob => ob.symbol +val.value*ob.multiplicationFactor )


           }


}

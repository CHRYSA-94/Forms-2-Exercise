import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(val:{value: number,currencyCode:string }, newCurrency: string): any {
    const euroToDollar = 1.198;
    const euroToYen = 132.52;
    const dollarToEuro = 0.835;
    const dollarToYen = 110.695;
    const yenToDollar = 0.00903546;
    const yenToEuro = 0.00755258;


             if(newCurrency === "EUR") {
               if(val.currencyCode === "EUR") {
                return  "€" + val.value

               } else if(val.currencyCode === "USD") {
                return "€" + val.value* dollarToEuro

               } else if(val.currencyCode === "JPY") {
                return "€" + val.value* yenToEuro
               }
             }
             else if(newCurrency === "USD") {
              if(val.currencyCode === "USD") {
                return  "$" + val.value

               } else if(val.currencyCode === "EUR") {
                return "$" + val.value* euroToDollar

               } else if(val.currencyCode === "JPY") {
                return "$" + val.value* yenToDollar
               }
             }
             else if(newCurrency === "JPY") {
              if(val.currencyCode === "JPY") {
                return  "¥" + val.value

               } else if(val.currencyCode === "EUR") {
                return "¥" + val.value* euroToYen

               } else if(val.currencyCode === "USD") {
                return "¥" + val.value* dollarToYen
               }
             }


            //  switch(newCurrency) {
            //  case "EUR":
            //    {value : "€" + val.value, currencyCode : newCurrency }
            //  break;
            //  case "USD":
            //    {value : "$" + val.value, currencyCode : newCurrency }
            //  break;
            //  case "JPY":
            //    {value : "¥" + val.value, currencyCode : newCurrency }
            //  break;

           }


}

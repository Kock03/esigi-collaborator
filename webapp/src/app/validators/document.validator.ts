import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DocumentValidator {
  constructor() {}

  static isValidCpf(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
         return false;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return false;
        } else {
          return { cpfNotValid: true };
        }
     }
   return true;
 };
  }

  static isValidCnpj(): ValidatorFn {
    return (control: AbstractControl): Validators => {
        const cnpj = control.value;
    if (!cnpj) return false
  

    const isString = typeof cnpj === 'string'
    const validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj)
  

    if (!validTypes) return false
  

    if (isString) {

        const isnum = /^\d+$/.test(cnpj);
        if (!isnum && typeof cnpj === 'string') return false;
 
      if (cnpj.length > 18) return false
  

      const digitsOnly = /^\d{14}$/.test(cnpj)
      
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj)
  
  
      if (digitsOnly || validFormat) true
 
      else return false
    }
  
  
    const match = cnpj.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []
  

    if (numbers.length !== 14) return false
    
  
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
  
 
    const calc = (x: number) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0
  
      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }
  
      const result = 11 - (sum % 11)
  
      return result > 9 ? 0 : result
    }
  
 
    const digits = numbers.slice(12)
    
 
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false
  
 
    const digit1 = calc(13)
    return digit1 === digits[1]
  }
}
}

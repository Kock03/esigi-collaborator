export class DocumentValidator {
  static isValidCpf(cpf: string) {
    if (cpf) {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      if (cpf.length < 11) {
        return true;
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
  }
  static isValidCnpj(cnpj: string) {
    if (cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, '');

      if (cnpj == '') return false;

      if (cnpj.length != 14)
        return false;

      if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

      let numbers, digits, size, post, result, sum, i;

      size = cnpj.length - 2
      numbers = cnpj.substring(0, size);
      digits = cnpj.substring(size);
      sum = 0;

      post = size - 7;
      for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - post) * post--;
        if (post < 2)
          post = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(0))
        return false;

      size = size + 1;
      numbers = cnpj.substring(0, size);
      sum = 0;
      post = size - 7;
      for (i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * post--;
        if (post < 2)
          post = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result != digits.charAt(1))
        return false;

      return true;
    }
  }
}





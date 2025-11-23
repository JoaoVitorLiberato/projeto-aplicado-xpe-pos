export class Address {
  private readonly address: {
    "cep": string,
    "logradouro": string,
    "bairro": string,
    "cidade": string,
    "uf": string,
    "numero": string,
    "complemento": string,
    "referencia": string
  };

  constructor(address: {
    "cep": string,
    "logradouro": string,
    "bairro": string,
    "cidade": string,
    "uf": string,
    "numero": string,
    "complemento": string,
    "referencia": string
  }) {
    const cepRegex = /^[0-9]{8}$/;
    if (!address.cep) {
      throw new Error("CEP é obrigatório");
    }

    if (!cepRegex.test(address.cep.replace(/\D/g, ''))) {
      throw new Error("CEP é inválido");
    }

    if (
      ![
        "65272000",
        "65272-000"
      ].includes(String(address.cep))
    ) {
      throw new Error("A nossa loja atua apenas na cidade de Santa Luzia do Paruá.");
    }

    if (!address.logradouro || address.logradouro.trim() === '') {
      throw new Error("Logradouro é obrigatório");
    }
  
    if (!address.bairro || address.bairro.trim() === '') {
      throw new Error("Bairro é obrigatório");
    }
  
    if (!address.cidade || address.cidade.trim() === '') {
      throw new Error("Cidade é obrigatória");
    }
  
    if (!address.uf || address.uf.trim() === '' || address.uf.length !== 2) {
      throw new Error("UF é obrigatória");
    }
  
    if (!address.numero || address.numero.trim() === '') {
      throw new Error("Número de endereço é obrigatório");
    }
  
    this.address = address;
  }

  getValue() {
    return this.address;
  }
}
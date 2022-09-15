export class ResumeTemplate{

    Font: {};
    DocDefinition: {};

    constructor(data: any) {
        this.fontDefinition()
        this.createTemplate(data)
    }

    fontDefinition(){
        const fonts = {
            Montserrat: {
              normal: './font/Montserrat-Regular.ttf',
              bold: './font/Montserrat-Bold.ttf',
              italics: './font/Montserrat-Italic.ttf',
              bolditalics: './font/Montserrat-BoldItalic.ttf'
            },
          };

          return fonts
    }

    async createTemplate(data: any){
        const docDefinition = {
            background: function () {
              return { image: './assets/fundo.jpg', height: 842, width: 595 }
            },
            pageMargins: [40, 80],
      
            content: [
      
              { text: data.firstName + ' ' + data.lastName, fontSize: 28, color: '#8637C2 ', alignment: 'center', bold: true },
              { text: 'Dados', fontSize: 17, margin: [0, 20, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 150, height: 13, },
              {
                margin: [0, 0, 4, 0],
                text: [
                  { text: ' Data de Aniversário: ', fontSize: 14 },
                  { text: data.birthDate, margin: [0, 6, 4, 0], fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Gênero: ', fontSize: 14 },
                  { text: data.gender, fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Estado civil: ', fontSize: 14 },
                  { text: data.maritalStatus, fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: 'CPF: ', fontSize: 14 },
                  { text: data.cpf, fontSize: 13 },
                ]
              },
              { text: 'Contato', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 190, height: 15, },
              {
                margin: [0, 0, 4, 0],
                text: [
                  { text: ' Telefone: ', fontSize: 14 },
                  { text: `${data.Phone}`, margin: [0, 6, 4, 0], fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Estado civil: ', fontSize: 14 },
                  { text: data.maritalStatus, fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Email: ', fontSize: 14 },
                  { text: data.email, fontSize: 13 },
                ],
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' LinkedIn: ', fontSize: 14 },
                  { text: data.linkedin, fontSize: 13 },
                ]
              },
              { text: 'Endereço', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 215, height: 15, },
              {
                margin: [0, 0, 4, 0],
                text: [
                  { text: ' Rua: ', fontSize: 14 },
                  { text: data.Address.street , margin: [0, 6, 4, 0], fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Bairro: ', fontSize: 14 },
                  { text: data.Address.district, margin: [0, 6, 4, 0], fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Complemento: ', fontSize: 14 },
                  { text: data.Address.complement, fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' Cidade: ', fontSize: 14 },
                  { text: data.Address.city, fontSize: 13 },
                ]
              },
              {
                margin: [0, 6, 4, 0],
                text: [
                  { text: ' CEP: ', fontSize: 14 },
                  { text: data.Address.cep, fontSize: 13 },
                ]
              },
              { text: 'Escolaridade', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 235, height: 15, },
              [data.Educations],
              { text: 'Idiomas', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 190, height: 15, },
              [data.Lanuages],
              { text: 'Tecnologias', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 235, height: 15, },
              [data.Skills],
              { text: 'Experiências', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
              { image: './assets/linha.jpg', width: 245, height: 15, },
              [data.Expriences]
            ],
      
            defaultStyle: {
              font: 'Montserrat',
    
            }
          };

          return this.DocDefinition = await docDefinition;
    }
}
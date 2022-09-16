import { ResumeDataModel } from "./resume-data-model";

export class ResumeTemplate {

  Font: {};
  DocDefinition: {};
  Educations: any[];
  Languages: any[];
  Skills: any[];
  Experiences: any[];

  constructor(data: any) {
    this.createTemplate(new ResumeDataModel(data))
  }

  educationsTemplate(Educations: any[]) {
    let educations = [];

    Educations.forEach(function (education) {
      educations.push(
        {
          margin: [0, 0, 4, 0],
          text: [

            { text: `Escolaridade: `, fontSize: 14 },
            { text: education.schooling, fontSize: 13 }
          ]
        });

      educations.push(
        {
          margin: [0, 6, 4, 0],
          text: [
            { text: `Instituição: `, fontSize: 14 },
            { text: education.institution, fontSize: 13 }]
        });

      educations.push(
        {
          margin: [0, 6, 4, 0],
          text: [
            { text: `Curso: `, fontSize: 14 },
            { text: education.course, fontSize: 13 }]
        });

      educations.push(
        {
          margin: [0, 6, 15, 0],
          text: [
            { text: `Situação: `, fontSize: 14 },
            { text: education.situation, fontSize: 13 }]
        });
    })

    return this.Educations = educations
  }

  languagesTemplate(Languages: any[]) {
    let languages = [];

    Languages.forEach(function (language) {
      languages.push(
        { text: ` ${language.languageName} - ${language.degreeOfInfluence}`, margin: [0, 6, 4, 0], fontSize: 13, }
      );
    })
    return this.Languages = languages;
  }

  skillsTemplate(Skills: any[]) {
    let skills = [];

    Skills.forEach(function (skill) {
      skills.push({
        margin: [0, 0, 4, 0],
        text: [
          { text: `Tecnologia: `, fontSize: 14 },
          { text: skill.technology, fontSize: 13, },]
      });
      skills.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Tempo de Experiência: `, fontSize: 14 },
          { text: skill.yearsExperience, fontSize: 13, }]
      });
      skills.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Período: `, fontSize: 14 },
          { text: skill.typeOfPeriod, fontSize: 13, }]
      });
      skills.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Senioridade:  `, fontSize: 14 },
          { text: skill.seniority, fontSize: 13, }]
      });
      if (skill.currentPosition === false) {
        skills.push({
          margin: [0, 6, 4, 0],
          text: [
            { text: `Posição:  `, fontSize: 14 },
            { text: 'Antiga', fontSize: 13, }]
        });

      } else {
        skills.push({
          margin: [0, 6, 4, 0],
          text: [
            { text: `Posição:  `, fontSize: 14 },
            { text: 'Atual', fontSize: 13, }]
        });
      }
    })

    return this.Skills = skills

  }

  experiencesTemplate(Experiences: any[]) {
    let experiences = [];

    Experiences.forEach(function (experience) {
      experiences.push({
        margin: [0, 0, 4, 0],
        text: [
          { text: `Nome da Empresa:  `, fontSize: 14 },
          { text: experience.companyName, fontSize: 13, }
        ]
      });
      experiences.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Localidade:  `, fontSize: 14 },
          { text: experience.locality, fontSize: 13, }]
      });
      experiences.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Cargo:  `, fontSize: 14 },
          { text: experience.office, fontSize: 13, }
        ]
      });
      experiences.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Setor:  `, fontSize: 14 },
          { text: experience.sector, fontSize: 13, }
        ]
      });
      if (experience.active === false) {
        experiences.push({
          margin: [0, 6, 4, 0],
          text: [
            { text: `Status de Contratação:  `, fontSize: 14 },
            { text: `Antiga contratação`, fontSize: 13, }
          ]
        });
        experiences.push({
          margin: [0, 6, 4, 0],
          text: [
            { text: `Início/Término:  `, fontSize: 14 },
            { text: ` ${experience.startMonth}/${experience.startYear} - ${experience.terminusMonth}/${experience.terminusYear}`, fontSize: 13, }
          ]
        });
      } else {
        experiences.push({
          margin: [0, 6, 4, 0],
          text: [
            { text: `Status de Contratação:  `, fontSize: 14 },
            { text: `Emprego Atual`, fontSize: 13, }
          ]
        });
        experiences.push({
          margin: [0, 6, 4, 0],
          text: [
            { text: `Início: `, fontSize: 14 },
            { text: `${experience.startMonth}/${experience.startYear}`, fontSize: 13, }
          ]
        });
      }
      experiences.push({
        margin: [0, 6, 4, 0],
        text: [
          { text: `Descrição: `, fontSize: 14 },
          { text: `${experience.description}`, fontSize: 13, },
        ],
      }, { text: ' ', margin: 10 }
      );

    })

    return this.Experiences = experiences
  }


  async createTemplate(data: any) {
    this.educationsTemplate(data.Educations)
    this.languagesTemplate(data.Languages);
    this.skillsTemplate(data.Skills);
    this.experiencesTemplate(data.Experiences);

    const fonts = {
      Montserrat: {
        normal: './font/Montserrat-Regular.ttf',
        bold: './font/Montserrat-Bold.ttf',
        italics: './font/Montserrat-Italic.ttf',
        bolditalics: './font/Montserrat-BoldItalic.ttf'
      },
    };

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
            { text: data.Address.street, margin: [0, 6, 4, 0], fontSize: 13 },
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
        [this.Educations],
        { text: 'Idiomas', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
        { image: './assets/linha.jpg', width: 190, height: 15, },
        [this.Languages],
        { text: 'Tecnologias', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
        { image: './assets/linha.jpg', width: 235, height: 15, },
        [this.Skills],
        { text: 'Experiências', fontSize: 17, margin: [0, 35, 0, 0], flex: true, color: '#8637C2 ', bold: true },
        { image: './assets/linha.jpg', width: 245, height: 15, },
        [this.Experiences]
      ],
      defaultStyle: {
        font: 'Montserrat',

      }
    };

    return this.DocDefinition = docDefinition, this.Font = fonts;
  }
}
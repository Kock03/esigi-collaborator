export class ResumeTreatmentModel {

    firstName: string;
    lastName: string;
    login: string;
    birthDate: string;
    gender: string;
    maritalStatus: string;
    cpf: string;
    phone: string;
    email: string;
    linkedin: string;
    Address: {};
    Educations: any[];
    Languages: any[];
    Skills: any[];
    Experiences: any[];

    constructor(data: any) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.login = data.login;
        this.birthDate = data.birthDate;
        this.gender = this.genderTreatment(data.gender);
        this.maritalStatus = this.maritalStatusTreatment(data.maritalStatus);
        this.cpf = data.cpf;
        this.phone = this.phoneTratment(data.Phone);
        this.Address = this.addressTratment(data.Address); 
        this.educationsTratment(data.Educations);
        this.languagesTratment(data.Languages);
        this.skillsTratment(data.Skills);
        this.experiencesTreatment(data.Experiences);
    }

    genderTreatment(gender: number) {
        switch (gender) {
            case 1:
                return this.gender = 'Masculino'
            case 2:
                return this.gender = "Feminino"
            case 3:
                return this.gender = "Indefinido"
        }
    }

    maritalStatusTreatment(maritalStatus: number) {
        switch (maritalStatus) {
            case 1:
                return this.maritalStatus = 'Solteiro(a)';
            case 2:
                return this.maritalStatus = 'Casado(a)';
            case 3:
                return this.maritalStatus = 'Separado(a)';
            case 4:
                return this.maritalStatus = 'Divorciado(a)';
            case 5:
                return this.maritalStatus = 'Viuvo(a)';
        }
    }

    phoneTratment(Phone: any) {
        return this.phone = `(${Phone.ddd}) +${Phone.ddi} ${Phone.phoneNumber}`
    }

    addressTratment(Address: any) {
        return this.Address = {
            street: `${Address.street}, ${Address.number}`,
            district: Address.district,
            complement: Address.complement,
            city: `${Address.city} - ${Address.state}`,
            cep: Address.cep
        }
    }

    educationsTratment(Educations: any[]) {
        let educations = [];

   
            Object.keys(Educations).forEach(key => {
                switch (Educations[key].schooling && Educations[key].situation) {
                    case 1:
                        Educations[key].schooling = 'Ensino Fundaental', Educations[key].situation = 'Parada';
                    case 2:
                        Educations[key].schooling = 'Ensino Médio', Educations[key].situation = 'Completa';
                    case 3:
                        Educations[key].schooling = 'Ensino Superior', Educations[key].situation = 'Em Progresso'
                }
            })


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
        this.Educations = educations;
    }

    languagesTratment(Languages: any[]) {
        let languages = [];

        Object.keys(Languages).forEach(key => {
            Languages[key]
            switch (Languages[key].degreeOfInfluence) {
                case 1:
                    return Languages[key].degreeOfInfluence = 'Leitura, Escrita e Conversação';
                case 2:
                    return Languages[key].degreeOfInfluence = 'Escrita';
                case 3:
                    return Languages[key].degreeOfInfluence = 'Leitura';
                case 4:
                    return Languages[key].degreeOfInfluence = 'Conversação';
                case 5:
                    return Languages[key].degreeOfInfluence = 'Escrita e Leitura';
                case 6:
                    return Languages[key].degreeOfInfluence = 'Escrita e Conversação';
            }
        })

        Languages.forEach(function (language) {
            languages.push(
                { text: ` ${language.languageName} - ${language.degreeOfInfluence}`, margin: [0, 6, 4, 0], fontSize: 13, }
            );
        })
        this.Languages = languages;
    }

    async skillsTratment(Skills: any[]) {
        let skills = [];

        Object.keys(Skills).forEach(key => {
            Skills[key]
            switch (Skills[key]
                .typeOfPeriod && Skills[key]
                .seniority) {
                case 1:
                    return Skills[key]
                        .typeOfPeriod = 'Mês(s)', Skills[key]
                            .seniority = 'Júnior';
                case 2:
                    return Skills[key]
                        .typeOfPeriod = 'Ano(s)', Skills[key]
                            .seniority = 'Full Stack';
                case 3:
                    return Skills[key]
                        .seniority = 'Sênior';
            }
            if (Skills[key]
                .currentPosition === 1) {
                Skills[key]
                    .currentPosition = 'Posição Atual'
            } else {
                Skills[key]
                    .currentPosition = 'Posição Antiga'
            }
        })

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
        this.Skills = await skills;
    }

    async experiencesTreatment(Experiences: any[]){
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

          this.Educations =  await experiences
    }



}
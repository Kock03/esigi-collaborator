export class ResumeDataModel {

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
        this.Experiences = data.Experiences;
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
        return this.Educations = Educations;
    }

    languagesTratment(Languages: any[]) {
        Object.keys(Languages).forEach(key => {
            Languages[key]
            switch (Languages[key].degreeOfInfluence) {
                case 1:
                    Languages[key].degreeOfInfluence = 'Leitura, Escrita e Conversação';
                case 2:
                    Languages[key].degreeOfInfluence = 'Escrita';
                case 3:
                    Languages[key].degreeOfInfluence = 'Leitura';
                case 4:
                    Languages[key].degreeOfInfluence = 'Conversação';
                case 5:
                    Languages[key].degreeOfInfluence = 'Escrita e Leitura';
                case 6:
                    Languages[key].degreeOfInfluence = 'Escrita e Conversação';
            }
        })


        return this.Languages = Languages;

    }

    async skillsTratment(Skills: any[]) {
        Object.keys(Skills).forEach(key => {
            Skills[key]
            switch (Skills[key]
                .typeOfPeriod && Skills[key]
                .seniority) {
                case 1:
                    Skills[key]
                        .typeOfPeriod = 'Mês(s)', Skills[key]
                            .seniority = 'Júnior';
                case 2:
                    Skills[key]
                        .typeOfPeriod = 'Ano(s)', Skills[key]
                            .seniority = 'Full Stack';
                case 3:
                    Skills[key]
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


        return this.Skills = Skills;
    }




}
export class ResumeTemplateModel{

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
    Educations: [];
    Languages: [];
    Skills: [];
    Experiences: [];

    constructor(data: any) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.login = data.login;
        this.birthDate = data.birthDate;
        this.gender = data.gender; //
        this.maritalStatus = data.maritalStatus; //
        this.cpf = data.cpf;
        this.phone = data.phone; //
        this.Address = data.Address; //
        this.Educations = data.Educations; //
        this.Languages = data.Languages; //
        this.Skills = data.Skills; //
        this.Experiences = data.Experiences; //
    }


}
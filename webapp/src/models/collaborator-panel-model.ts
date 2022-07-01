export class CollaboratorPanelModel {
    id!: string;
    firstNameCorporateName!: string;
    lastNameFantasyName!: string;
    office!: string;
  
    constructor(collaboratorPanel: any) {
      this.id = collaboratorPanel.id
      this.firstNameCorporateName = collaboratorPanel.first_name_corporate_name;
      this.lastNameFantasyName = collaboratorPanel.last_name_fantasy_name;
      this.office = collaboratorPanel.office;
    }
  }
  
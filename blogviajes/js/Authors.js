export class Authors{

    constructor(nif, name, surname, dobirth, role){
        this.nif = nif;
        this.name = name;
        this.surname = surname;
        this.dobirth = dobirth;
        this.role = role;
    }

    render(){
        return `nif: ${this.nif}, name: ${this.name}, surname: ${this.surname}, dobirth: ${this.dobirth}, role: ${this.role}`;
    }
}
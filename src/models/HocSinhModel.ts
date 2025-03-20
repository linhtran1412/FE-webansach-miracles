
class HocSinhModel{
id?:number;
    department?:string;//co the bi null
    email?:string;
    first_name?:string;
    last_name?:string;

    constructor(
        id?:number,
        department?:string,//co the bi null
    email?:string,
    first_name?:string,
    last_name?:string
    ) {
      this.id=id;
      this.department=department;
      this.email=email;
      this.first_name=first_name;
      this.last_name=last_name;

    }

}
export default HocSinhModel;
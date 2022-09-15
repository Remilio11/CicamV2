export class RegistroPersona{
    _id?: number;
    Nombres_Reg: String;
    NomUser_Reg: String;
    Correo_Reg: String;
    Pwd_Reg: String;

    constructor (Nombres_Reg: String,  NomUser_Reg: String, Correo_Reg: String, Pwd_Reg: String){
        this.Nombres_Reg = Nombres_Reg;
        this.NomUser_Reg = NomUser_Reg;
        this.Correo_Reg = Correo_Reg;
        this.Pwd_Reg = Pwd_Reg;
    }

}
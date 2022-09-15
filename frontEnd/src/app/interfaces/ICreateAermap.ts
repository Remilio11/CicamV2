export interface ICreateAermap{
    X: string;
    Y: string;
    Zona: string;
    X_SC: string;
    Y_SC: string;
    Zona_SC: string;
    DatoHorizontal: string;
    fuentes: ISource[];
    X_InicioCuad_RC: string;
    X_NumRep_RC: string;
    X_SepRep_RC: string;
    Y_InicioCuad_RC: string;
    Y_SepRep_RC: string;
    Y_NumRep_RC: string;
}

export interface ISource{
    latitud: string;
    longitud: string;
    hlvlMar: string;
}
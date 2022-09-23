import { ISource } from "./ICreateAermap";

export interface ICreateAermod{
    AVERTIME: string; POLLUTID: string; RECTABLE: string; MAXTABLE: string; MAXIFILE: string;
    stacks: IAermodSource[];
}

export interface IAermodSource {
    source: ISource;
    stack: {
        TE: string;
        AF: string;
        TG: string;
        VG: string;
        DF: string;
    }
}
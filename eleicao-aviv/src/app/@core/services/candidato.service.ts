import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { BaseService } from "./@base/base.service";
import { Candidato } from "../models/candidato.model";

@Injectable()
export class CandidatoService extends BaseService {
    
    constructor(private httpClient: HttpClient) { 
        super();
    }

    public listarCandidatos(): Observable<Candidato[]> {
        return this.httpClient.get<Candidato[]>(`${this.endpoint}/candidatos/`);
    }

    public inserirCandidato(candidato: Candidato): Observable<Candidato> {
        return this.httpClient.post<Candidato>(`${this.endpoint}/candidatos/`, candidato);
    }
}
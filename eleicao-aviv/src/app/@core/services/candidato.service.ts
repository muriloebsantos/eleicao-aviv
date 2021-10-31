import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { BaseService } from "./@base/base.service";
import { Candidato } from "../models/candidato.model";

@Injectable()
export class CandidatoService extends BaseService {
    
    constructor(private httpClient: HttpClient) { 
        super();
    }

    public onCandidatoInseridoOuAlterado: Subject<Candidato> = new Subject<Candidato>();

    public listarCandidatos(): Observable<Candidato[]> {
        return this.httpClient.get<Candidato[]>(`${this.endpoint}/candidatos/`);
    }

    public inserirCandidato(candidato: Candidato): Observable<Candidato> {
        return this.httpClient.post<Candidato>(`${this.endpoint}/candidatos/`, candidato);
    }

    public atualizarCandidato(id: string, candidato: Candidato): Observable<Candidato> {
        return this.httpClient.put<Candidato>(`${this.endpoint}/candidatos/${id}`, candidato);
    }

    public obterCandidato(id: string): Observable<Candidato> {
        return this.httpClient.get<Candidato>(`${this.endpoint}/candidatos/${id}`);
    }
}
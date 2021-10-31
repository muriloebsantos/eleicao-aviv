import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Eleicao } from "../models/eleicao.model";
import { BaseService } from "./@base/base.service";

@Injectable()
export class EleicaoService extends BaseService {
    
    constructor(private httpClient: HttpClient) { 
        super();
    }

    public eleicao?: Eleicao;

    public obterEleicaoPorCodigo(codigo: string): Observable<Eleicao> {
        return this.httpClient.get<Eleicao>(`${this.endpoint}/eleicoes/${codigo}`);
    }

    public listarEleicoes(): Observable<Eleicao[]> {
        return this.httpClient.get<Eleicao[]>(`${this.endpoint}/eleicoes`);
    }

    public inserirEleicao(eleicao: Eleicao): Observable<Eleicao> {
        return this.httpClient.post<Eleicao>(`${this.endpoint}/eleicoes`, eleicao);
    }
}
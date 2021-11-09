import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Voto } from "../models/voto.model";
import { BaseService } from "./@base/base.service";

@Injectable()
export class VotacaoService extends BaseService {

    constructor(private httpClient: HttpClient) { 
        super();
    }
    
    public registrarVoto(voto: Voto): Observable<Voto> {
        return this.httpClient.post<Voto>(`${this.endpoint}/votos/`, voto);
    }

}
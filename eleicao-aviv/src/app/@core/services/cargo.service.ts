import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { BaseService } from "./@base/base.service";
import { Cargo } from "../models/cargo.model";
import { CargoCandidato } from "../models/cargo-candidato.model";

@Injectable()
export class CargoService extends BaseService {
    
    constructor(private httpClient: HttpClient) { 
        super();
    }

    public onCargoInseridoOuAlterado: Subject<Cargo> = new Subject<Cargo>();

    public listarCargos(eleicaoId: string): Observable<Cargo[]> {
        return this.httpClient.get<Cargo[]>(`${this.endpoint}/cargos?eleicaoId=${eleicaoId}`);
    }

    public inserirCargo(cargo: Cargo): Observable<Cargo> {
        return this.httpClient.post<Cargo>(`${this.endpoint}/cargos/`, cargo);
    }

    public atualizarCargo(id: string, cargo: Cargo): Observable<Cargo> {
        return this.httpClient.put<Cargo>(`${this.endpoint}/cargos/${id}`, cargo);
    }

    public obterCargo(id: string): Observable<Cargo> {
        return this.httpClient.get<Cargo>(`${this.endpoint}/cargos/${id}`);
    }

    public adicionarCandidatosAoCargo(cargoId: string, ids: string[]) {
        return this.httpClient.post<Cargo>(`${this.endpoint}/cargos/${cargoId}/candidatos`, ids);
    }

    public removerCandidatoDoCargo(cargoId: string, id: string) {
        return this.httpClient.delete(`${this.endpoint}/cargos/${cargoId}/candidatos/${id}`);
    }

    public listarCandidatosDoCargo(cargoId: string): Observable<CargoCandidato[]> {
        return this.httpClient.get<CargoCandidato[]>(`${this.endpoint}/cargos/${cargoId}/candidatos`);
    }
}
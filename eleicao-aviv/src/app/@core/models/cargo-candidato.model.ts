import { Candidato } from "./candidato.model";

export type CargoCandidato = {
    _id: string,
    cargoId: string,
    candidatoId: string,
    candidato: Candidato
}
export interface CargoCandidato {
    _id: string;
    cargoId: string;
    candidatoId: string;
    votos?: number;
    eleitoNesseCargo?: boolean;
    eleitoEmOutroCargo?: boolean;
    recusouCargo?: boolean;
}
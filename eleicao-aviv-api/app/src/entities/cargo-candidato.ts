export interface CargoCandidato {
    _id: string;
    cargoId: string;
    candidatoId: string;
    votos?: number;
    eleito?: boolean;
    recusado?: boolean;
}
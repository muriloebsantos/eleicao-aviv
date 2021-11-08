import { CargoCandidato } from "../entities/cargo-candidato";
import { CargoCandidatoRepository } from "../repositories/cargoCandidatoRepository";
import { v4 as uuid } from "uuid";
import { ApiError } from "../util/api-error";

export default class CargoCandidatoService {

    public obterCandidatosPorCargo(cargoId: string) : Promise<CargoCandidato[]> {
        return new CargoCandidatoRepository().obterCandidatosPorCargo(cargoId);
    }

    public excluirCargoCandidato(id: string)  {
        return new CargoCandidatoRepository().excluirCargoCandidato(id);
    }

    public async inserirCargoCandidato(cargoId: string, cargoCandidatoPayload: any): Promise<CargoCandidato> {
        const cargoCandidato: CargoCandidato = {
            _id: uuid(),
            cargoId: cargoId,
            candidatoId: cargoCandidatoPayload.candidatoId
        };

        const cargoCandidtoRepository = new CargoCandidatoRepository();
        const cargoCandidatoExistente = await cargoCandidtoRepository.obterCargoCandidato(cargoCandidato.cargoId, cargoCandidato.candidatoId);
        
        if(cargoCandidatoExistente) {
            throw new ApiError('Candidato já adicionado ao cargo', 409);
        }

        await cargoCandidtoRepository.inserirCargoCandidato(cargoCandidato);

        return cargoCandidato;
    }
}
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

    public async inserirCargoCandidato(cargoId: string, cargoCandidatoPayload: any): Promise<CargoCandidato[]> {
        const novosCargoCandidatos: CargoCandidato[] = [];
        const cargoCandidtoRepository = new CargoCandidatoRepository();
        const cargosCandidatosExistentes = await cargoCandidtoRepository.obterCandidatosPorCargo(cargoId);

        for(let candidatoId of cargoCandidatoPayload) {

            if(cargosCandidatosExistentes.find(c => c.candidatoId == candidatoId))
                continue;

            const cargoCandidato: CargoCandidato = {
                _id: uuid(),
                cargoId,
                candidatoId,
                votos: 0
            };

            novosCargoCandidatos.push(cargoCandidato);
        }

        if(novosCargoCandidatos.length > 0)
            await cargoCandidtoRepository.inserirCargoCandidatos(novosCargoCandidatos);

        return novosCargoCandidatos;
    }
}
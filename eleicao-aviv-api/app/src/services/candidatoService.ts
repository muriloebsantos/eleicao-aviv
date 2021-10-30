import { Candidato } from "../entities/candidato";
import CandidatoRepository from "../repositories/candidatoRepository";
import { ApiError } from "../util/api-error";

export default class CandidatoService {

    public async inserirCandidato(candidatoPayload: any): Promise<Candidato> {
        const candidato: Candidato = {
            _id: candidatoPayload.codigo,
            nome: candidatoPayload.nome,
            apelido: candidatoPayload.apelido,
            igrejaId: candidatoPayload.igrejaId,
            foto: candidatoPayload.foto,
            ativo: true
        };

        const candidatoRepository = new CandidatoRepository();
        const candidatoExistente = await candidatoRepository.obterCandidatoPorCodigo(candidato._id);

        if(candidatoExistente) {
            throw new ApiError('Já existe candidato cadastrado com esse código', 409);
        }

        await candidatoRepository.inserirCandidato(candidato);

        return candidato;
    }

    public obterCandidatoPorId(id: string): Promise<Candidato> {
        return new CandidatoRepository().obterCandidatoPorCodigo(id);
    }

    public listarCandidatos(): Promise<Candidato[]> {
        return new CandidatoRepository().listarCandidatos();
    }
}
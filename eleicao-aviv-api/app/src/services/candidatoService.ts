import { Candidato } from "../entities/candidato";
import CandidatoRepository from "../repositories/candidatoRepository";
import { ApiError } from "../util/api-error";
import { v4 as uuid } from "uuid";
import { String } from "aws-sdk/clients/appstream";

export default class CandidatoService {

    public async inserirCandidato(candidatoPayload: any): Promise<Candidato> {
        const candidato: Candidato = {
            _id: uuid(),
            matricula: Number(candidatoPayload.matricula),
            nome: candidatoPayload.nome,
            apelido: candidatoPayload.apelido,
            foto: candidatoPayload.foto,
            ativo: true
        };

        const candidatoRepository = new CandidatoRepository();
        const candidatoExistente = await candidatoRepository.obterCandidatoPorMatricula(candidato.matricula);

        if(candidatoExistente) {
            throw new ApiError('Já existe candidato cadastrado com essa matrícula', 409);
        }

        await candidatoRepository.inserirCandidato(candidato);

        return candidato;
    }

    public async atualizarCandidato(id: string, candidatoPayload: any): Promise<Candidato> {
        const candidato: Candidato = {
            _id: id,
            matricula: Number(candidatoPayload.matricula),
            nome: candidatoPayload.nome,
            apelido: candidatoPayload.apelido,
            foto: candidatoPayload.foto,
            ativo: true
        };

        const candidatoRepository = new CandidatoRepository();
        const candidatoExistente = await candidatoRepository.obterCandidatoPorMatricula(candidato.matricula);

        if(candidatoExistente && candidatoExistente._id != id) {
            throw new ApiError('Já existe candidato cadastrado com essa matrícula', 409);
        }

        await candidatoRepository.atualizarCandidato(id, candidato);

        return candidato;
    }

    public obterCandidatoPorId(id: String): Promise<Candidato> {
        return new CandidatoRepository().obterCandidatoPorId(id);
    }

    public listarCandidatos(): Promise<Candidato[]> {
        return new CandidatoRepository().listarCandidatos();
    }
}
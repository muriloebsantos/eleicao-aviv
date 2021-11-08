import { Cargo } from "../entities/cargo";
import { v4 as uuid } from "uuid";
import CargoRepository from "../repositories/cargoRepository";
import { ApiError } from "../util/api-error";

export class CargoService {

    public async inserirCargo(cargoPayload: any): Promise<Cargo> {
        const cargo: Cargo = {
            _id: uuid(),
            eleicaoId: cargoPayload.eleicaoId,
            nome: cargoPayload.nome,
            vagas: (cargoPayload.vagas && Number(cargoPayload.vagas)) || null
        };

        await new CargoRepository().inserirCargo(cargo);

        return cargo;
    }

    public async atualizarCargo(id: string, cargoPayload: any): Promise<Cargo> {
        const cargoRepository = new CargoRepository();
        const cargo = await cargoRepository.obterCargoPorCodigo(id);
        cargo.nome = cargoPayload.nome;
        cargo.vagas = (cargoPayload.vagas && Number(cargoPayload.vagas)) || null;

        await cargoRepository.atualizarCargo(id, cargo);

        return cargo;
    }

    public obterCargoPorId(id: string): Promise<Cargo> {
        return new CargoRepository().obterCargoPorCodigo(id);
    }

    public listarCargos(eleicaoId: string): Promise<Cargo[]> {
        return new CargoRepository().listarCargos(eleicaoId);
    }

    public async excluirCargo(id: string) {
        await new CargoRepository().excluirCargo(id);
    }

    public async iniciarVotacaoCargo(id: string) {
        const cargoRepository = new CargoRepository();
        const cargo = await cargoRepository.obterCargoPorCodigo(id);

        if(!cargo) {
            throw new ApiError('Cargo não cadastrado', 404);
        }

        if(cargo.dataInicioVotacao) {
            throw new ApiError('Votação já iniciada', 422);
        }

        const cargos = await cargoRepository.listarCargos(cargo.eleicaoId);

        if(cargos.find(c => c.dataInicioVotacao && !cargo.dataFimVotacao)) {
            throw new ApiError('Já existe uma votação em andamento', 409)
        }

        cargo.dataInicioVotacao = new Date();

        await cargoRepository.atualizarCargo(cargo._id, cargo);
    }
}
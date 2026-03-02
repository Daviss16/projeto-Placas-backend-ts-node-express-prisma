import { PrismaClient } from "@prisma/client"
import { PlacasRepository } from "../../../core/service/placas/placas";
import { Placas } from "../../../core/entities/placas";

export type PrismaProps = {
    prisma: PrismaClient;
}

export class PlacasRepositoryPrisma implements PlacasRepository {
    private constructor (readonly props: PrismaProps) {};

    public static build(props: PrismaProps) {
        return new PlacasRepositoryPrisma(props);
    }

    public async save(placa: Placas): Promise<void> {
        await this.props.prisma.placa.upsert({
            where: { id: placa.id },
            update: {
                placaCinza: placa.placaCinza,
                placaMercoS: placa.placaMercosul,
                estado: placa.estado,
                regiao: placa.regiao
            },
            create: {
                id: placa.id, 
                placaCinza: placa.placaCinza,
                placaMercoS: placa.placaMercosul,
                estado: placa.estado,
                regiao: placa.regiao
            },
        });
    }

    public async findPlaca(placaCinza: string): Promise<Placas | null> {
        const aPlaca = await this.props.prisma.placa.findFirst({
            where: { placaCinza : placaCinza}
        });

        if (!aPlaca) return null;

        const { id, placaMercoS,estado,regiao } = aPlaca;

        const placa = Placas.with(id,placaCinza,placaMercoS,estado,regiao);

        return placa;
    }

    public async listRegiao(regiao: string): Promise<Placas[]> {
        const aPlaca = await this.props.prisma.placa.findMany({
            where: {regiao: regiao}
        });

        const placas: Placas[] = aPlaca.map((p) => {
            const { id, placaCinza, placaMercoS, estado, regiao } = p;
            return Placas.with(id, placaCinza, placaMercoS, estado, regiao);
        })

        return placas;
    }


    public async searchLastFourDigits(lastFourDigits: string, estado: string): Promise<boolean> {
        const count = await this.props.prisma.placa.count({
            where: {
                estado: estado,
                placaCinza: { endsWith: lastFourDigits}
            }
        });

        return count > 0; 
    }

    public async delete(placaCinza: string): Promise<void> {
        const aPlaca = await this.props.prisma.placa.findFirst({
            where: { placaCinza: placaCinza }
        });

        if(!aPlaca) {
            throw new Error("A placa "+ placaCinza +" não foi encontrada.");
        };

        await this.props.prisma.placa.delete({
            where: { id: aPlaca.id }
        })
    }

}
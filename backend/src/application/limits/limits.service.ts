import { Service } from "typedi";
import { CreateLimitRequest, GetLimitsRequest, LimitResponse, UpdateLimitRequest } from "./limits.dto";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { Limit } from "@/models/limit.model";
import { Op } from "sequelize";

@Service()
export class LimitsService {

    private static toResponse(limit: Limit): LimitResponse {
        return {
            id: limit.id,
            name: limit.name,
            maxAmount: limit.maxAmount,
            maxDailyOrders: limit.maxDailyOrders,
        };
    }

    private static toResponseArray(limits: Limit[]): LimitResponse[] {
        return limits.map(limit => this.toResponse(limit));
    }

    async get(request: GetLimitsRequest): Promise<LimitResponse[]> {
        const whereCondition: any = {
            enabled: true
        };

        if (request.name) {
            whereCondition.name = {
                [Op.iLike]: `%${request.name}%`
            };
        }

        const limits = await Limit.findAll({
            where: whereCondition
        });
        return LimitsService.toResponseArray(limits);
    }


    async getById(id: string): Promise<LimitResponse> {
        const limit = await Limit.findOne({ where: { id, enabled: true } });

        if (!limit) {
            throw new NotFoundError(`Limit with id=${id} not found`);
        }

        return LimitsService.toResponse(limit);
    }

    async update(id: string, body: UpdateLimitRequest): Promise<LimitResponse> {
        const limit = await Limit.findOne({ where: { id, enabled: true } });

        if (!limit) {
            throw new NotFoundError(`Limit with id=${id} not found`);
        }

        const updateData: Partial<UpdateLimitRequest> = {};

        if (body.name !== undefined) {
            updateData.name = body.name;
        }
        if (body.maxAmount !== undefined) {
            updateData.maxAmount = body.maxAmount;
        }
        if (body.maxDailyOrders !== undefined) {
            updateData.maxDailyOrders = body.maxDailyOrders;
        }

        await limit.update(updateData);
        return LimitsService.toResponse(limit);
    }

    async create(body: CreateLimitRequest): Promise<LimitResponse> {
        const existingLimit = await Limit.findOne({ where: { name: body.name } });

        if (existingLimit) {
            throw new BadRequestError(`Limit with name '${body.name}' already exists`);
        }

        const limit = await Limit.create({ ...body });
        return LimitsService.toResponse(limit);
    }

    async delete(id: string): Promise<void> {
        const limit = await Limit.findOne({ where: { id, enabled: true } });

        if (!limit) {
            throw new NotFoundError(`Limit with id=${id} not found`);
        }

        await limit.update({ enabled: false });
    }

}

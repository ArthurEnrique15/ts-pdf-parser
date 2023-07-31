import { Request, Response } from 'express'
import { IGetTotalValuePerMonth } from '../../domain/use-cases/get-total-value-per-month'

export class GetTotalValuePerMonthController {
  constructor(private readonly getTotalValuePerMonthUseCase: IGetTotalValuePerMonth) {}

  async getTotalValuePerMonth(request: Request, response: Response) {
    const result = await this.getTotalValuePerMonthUseCase.getTotalValuePerMonth()
    return response.status(200).json(result)
  }
}

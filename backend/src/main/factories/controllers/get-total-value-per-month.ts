import { GetTotalValuePerMonthController } from '../../controllers/get-total-value-per-month'
import { makeGetTotalValuePerMonth } from '../use-cases/get-total-value-per-month'

export function makeGetTotalValuePerMonthController() {
  const getTotalValuePerMonthUseCase = makeGetTotalValuePerMonth()
  return new GetTotalValuePerMonthController(getTotalValuePerMonthUseCase)
}

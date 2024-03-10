import { EventType } from 'constraints'
import { IEvent } from 'interfaces'

export class StockLevelOkEvent implements IEvent {
  constructor(
    private readonly _stockQuantity: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    return this._machineId
  }

  getStockQuantity(): number {
    return this._stockQuantity
  }

  type() {
    return EventType.StockLevelOk
  }
}

import { EventType } from 'constraints'
import { IEvent } from 'interfaces'

export class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    return this._machineId
  }

  getRefillQuantity(): number {
    return this._refill
  }

  type() {
    return EventType.MachineRefill
  }
}

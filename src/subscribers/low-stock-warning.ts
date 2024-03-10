import { LowStockWarningEvent, MachineSaleEvent } from 'events'
import { ISubscriber } from 'interfaces'

export class LowStockWarningSubscriber implements ISubscriber {
  handle(event: LowStockWarningEvent): void {
    const machineId = event.machineId()
    const eventType = event.type()

    console.log(
      `[Subscriber - ${eventType}] Low stock warning from machine ${machineId} stock level: ${event.getStockQuantity()}`
    )
  }
}

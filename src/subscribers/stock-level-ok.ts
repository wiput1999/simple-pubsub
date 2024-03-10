import { StockLevelOkEvent } from 'events'
import { ISubscriber } from 'interfaces'

export class StockLevelOkSubscriber implements ISubscriber {
  handle(event: StockLevelOkEvent): void {
    const machineId = event.machineId()
    const eventType = event.type()

    console.log(
      `[Subscriber - ${eventType}] Stock level Ok from machine ${machineId} stock level: ${event.getStockQuantity()}`
    )
  }
}

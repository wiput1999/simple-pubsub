import { LowStockThreshold } from 'constraints'
import { MachineRefillEvent, StockLevelOkEvent } from 'events'
import { ISubscriber } from 'interfaces'
import { machineRepository } from 'repositories'
import { publishSubscribeService } from 'services'

export class MachineRefillSubscriber implements ISubscriber {
  handle(event: MachineRefillEvent): void {
    const machineId = event.machineId()
    const eventType = event.type()
    const refillQuantity = event.getRefillQuantity()
    const machine = machineRepository.findById(machineId)

    if (!machine) {
      console.log(
        `[Subscriber - ${eventType}] Machine not found id: ${machineId}`
      )

      return
    }

    const newStockLevel = machine.stockLevel + refillQuantity

    machine.stockLevel = newStockLevel

    console.log(
      `[Subscriber - ${eventType}] Refilled Machine id: ${machineId} with new stock ${newStockLevel}`
    )

    if (newStockLevel >= LowStockThreshold) {
      publishSubscribeService.publish(
        new StockLevelOkEvent(newStockLevel, machineId)
      )
    }
  }
}

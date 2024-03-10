import { LowStockThreshold } from 'constraints'
import { LowStockWarningEvent, MachineSaleEvent } from 'events'
import { ISubscriber } from 'interfaces'
import { machineRepository } from 'repositories'
import { publishSubscribeService } from 'services'

export class MachineSaleSubscriber implements ISubscriber {
  handle(event: MachineSaleEvent): void {
    const eventType = event.type()
    const soldQuantity = event.getSoldQuantity()
    const machineId = event.machineId()
    const machine = machineRepository.findById(machineId)

    if (!machine) {
      console.log(
        `[Subscriber - ${eventType}] Machine not found id: ${machineId}`
      )

      return
    }

    const newStockLevel = machine.stockLevel - soldQuantity

    machine.stockLevel = newStockLevel

    console.log(
      `[Subscriber - ${eventType}] Machine id: ${machineId} sold with quantity ${soldQuantity} with new stock ${newStockLevel}`
    )

    if (newStockLevel < LowStockThreshold) {
      publishSubscribeService.publish(
        new LowStockWarningEvent(newStockLevel, machineId)
      )
    }
  }
}

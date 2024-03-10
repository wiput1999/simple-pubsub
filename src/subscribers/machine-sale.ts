import { LowStockThreshold } from 'constraints'
import { LowStockWarningEvent, MachineSaleEvent } from 'events'
import { ISubscriber } from 'interfaces'
import { machineRepository } from 'repositories'
import { publishSubscribeService } from 'services'

export class MachineSaleSubscriber implements ISubscriber {
  handle(event: MachineSaleEvent): void {
    const eventType = event.type()
    const machineId = event.machineId()
    const machine = machineRepository.findById(machineId)

    if (!machine) {
      console.log(
        `[Subscriber - ${eventType}] Machine not found id: ${machineId}`
      )

      return
    }

    const newStockLevel = machine.stockLevel - event.getSoldQuantity()

    machine.stockLevel = newStockLevel

    if (newStockLevel < LowStockThreshold) {
      publishSubscribeService.publish(
        new LowStockWarningEvent(newStockLevel, machineId)
      )
    }
  }
}

import { MachineRefillEvent, MachineSaleEvent } from 'events'
import { randomMachine } from './random-machine'
import { IEvent } from 'interfaces'

export const eventGenerator = (): IEvent => {
  const random = Math.random()
  if (random < 0.5) {
    const saleQty = Math.random() < 0.5 ? 1 : 2 // 1 or 2
    return new MachineSaleEvent(saleQty, randomMachine())
  }
  const refillQty = Math.random() < 0.5 ? 3 : 5 // 3 or 5
  return new MachineRefillEvent(refillQty, randomMachine())
}

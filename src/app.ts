import { EventType } from 'constraints'
import { eventGenerator } from 'helpers/event-generator'
import { publishSubscribeService } from 'services'
import {
  MachineSaleSubscriber,
  MachineRefillSubscriber,
  LowStockWarningSubscriber,
  StockLevelOkSubscriber,
} from 'subscribers'

// program
;(async () => {
  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber()
  const refillSubscriber = new MachineRefillSubscriber()
  const lowStockWarningSubscriber = new LowStockWarningSubscriber()
  const stockLevelOkSubscriber = new StockLevelOkSubscriber()

  // create the PubSub service
  publishSubscribeService.subscribe(EventType.MachineSale, saleSubscriber)
  publishSubscribeService.subscribe(EventType.MachineRefill, refillSubscriber)
  publishSubscribeService.subscribe(
    EventType.LowStockWarning,
    lowStockWarningSubscriber
  )
  publishSubscribeService.subscribe(
    EventType.StockLevelOk,
    stockLevelOkSubscriber
  )

  // create 5 random events
  const events = [...Array(10)].map((i) => eventGenerator())

  // publish the events
  for (const event of events) {
    publishSubscribeService.publish(event)
  }
})()

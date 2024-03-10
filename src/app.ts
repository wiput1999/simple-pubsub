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
  console.log('[App] Initializing App')

  console.log('[App] Initializing Subscribers')
  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber()
  const refillSubscriber = new MachineRefillSubscriber()
  const lowStockWarningSubscriber = new LowStockWarningSubscriber()
  const stockLevelOkSubscriber = new StockLevelOkSubscriber()
  console.log('[App] Initialized Subscribers')

  console.log('[App] Initializing Subscribers to PubSub Service')
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
  console.log('[App] Initialized Subscribers to PubSub Service')

  console.log('[App] Generating Events')
  // create 5 random events
  const events = [...Array(10)].map((i) => eventGenerator())
  console.log('[App] Generated Events')

  console.log('[App] Publishing Events')
  // publish the events
  for (const event of events) {
    publishSubscribeService.publish(event)
  }
  console.log('[App] Published Events')

  console.log('[App] App Done')
})()

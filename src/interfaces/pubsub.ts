import { EventType } from 'constraints'
import { ISubscriber } from './subscriber'
import { IEvent } from './event'

export interface IPublishSubscribeService {
  subscribers: Map<EventType, ISubscriber>
  publish(event: IEvent): void
  subscribe(type: EventType, handler: ISubscriber): void
  unsubscribe(type: EventType): void
}

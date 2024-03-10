import { EventType } from 'constraints'
import { IPublishSubscribeService, ISubscriber, IEvent } from 'interfaces'

export class PublishSubscribeService implements IPublishSubscribeService {
  private static instance: PublishSubscribeService

  private constructor() {}

  subscribers = new Map<EventType, ISubscriber>()

  public static getInstance(): PublishSubscribeService {
    if (!this.instance) {
      this.instance = new PublishSubscribeService()
    }

    return this.instance
  }

  publish(event: IEvent): void {
    const eventType = event.type()
    console.log(`[Service - PubSub] Publishing event ${eventType}`)

    const subscriber = this.subscribers.get(event.type())

    if (!subscriber) {
      console.log(
        `[Service - PubSub] No subscriber subscribed for ${eventType} event`
      )

      return
    }

    subscriber.handle(event)
  }

  subscribe(type: EventType, subscriber: ISubscriber): void {
    console.log(`[Service - PubSub] Subscribing event ${type}`)
    this.subscribers.set(type, subscriber)
    console.log(`[Service - PubSub] Subscribed event ${type}`)
  }

  unsubscribe(type: EventType): void {
    console.log(`[Service - PubSub] Unsubscribing event ${type}`)
    this.subscribers.delete(type)
    console.log(`[Service - PubSub] Event ${type} has been unsubscribed`)
  }
}

export const publishSubscribeService = PublishSubscribeService.getInstance()

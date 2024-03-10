import { EventType } from 'constraints'

export interface IEvent {
  type(): EventType
  machineId(): string
}

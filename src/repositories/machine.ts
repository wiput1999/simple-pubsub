import { IRepository, Maybe } from 'interfaces'
import { Machine } from 'models'

export class MachineRepository implements IRepository<Machine> {
  public static instance: MachineRepository

  private constructor() {}

  public static getInstance() {
    if (!MachineRepository.instance) {
      this.instance = new MachineRepository()
    }

    return this.instance
  }

  private machines = [
    new Machine('001'),
    new Machine('002'),
    new Machine('003'),
  ]

  findById(id: string): Maybe<Machine> {
    return this.machines.find((machine) => machine.id === id)
  }
}

export const machineRepository = MachineRepository.getInstance()

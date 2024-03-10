export enum EventType {
  MachineRefill = 'MACHINE_REFILL',
  MachineSale = 'MACHINE_SALE',
  LowStockWarning = 'MACHINE_LOW_STOCK_WARNING',
  StockLevelOk = 'MACHINE_STOCK_LEVEL_OK',
}

export const LowStockThreshold = 3

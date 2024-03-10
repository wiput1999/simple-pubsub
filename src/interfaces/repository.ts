export type Maybe<T> = T | null | undefined

export interface IRepository<Model> {
  findById(id: string): Maybe<Model>
}

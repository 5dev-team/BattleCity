type EventHandler<T> = (...params: T[]) => unknown

class EventBus {
  
  private events: Map<string, Set<EventHandler<any>>> = new Map()
  
  public on<T>(event: string, handler: EventHandler<T>): void {
    if (this.events.has(event)) {
      this.events?.get(event)?.add(handler)
    } else {
      this.events.set(event, new Set([handler]))
    }
  }
  
  public once<T>(event: string, handler: EventHandler<T>): void {
    const onceFn = ((...res: T[]) => {
      handler(...res)
      this.off(event, onceFn)
    }) as EventHandler<T>

    this.on(event, onceFn)
  }
  
  public emit<T>(event: string, params?: T): void {
    this.events.get(event)?.forEach(handler => handler(params))
  }
  
  public off<T>(event: string, handler: EventHandler<T>): void {
    this.events.get(event)?.delete(handler)
  }
  
  public removeAll(): EventBus {
    this.events = new Map()
    return this
  }
}

export default EventBus

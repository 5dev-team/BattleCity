type IFn = (params?: any) => unknown

class EventBus {
  
  private events: Map<string, Set<IFn>> = new Map()
  
  public on(event: string, handler: IFn): void {
    if (this.events.has(event)) {
      this.events?.get(event)?.add(handler)
    } else {
      this.events.set(event, new Set([handler]))
    }
  }
  
  
  public once(event: string, handler: IFn): void {
    const onceFn = (...res: unknown[]) => {
      handler(...res)
      this.off(event, handler)
    }
    this.on(event, onceFn)
  }
  
  public emit(event: string, params?: unknown): void {
    this.events.get(event)?.forEach(handler => handler(params))
  }
  
  
  public off(event: string, handler: IFn): void {
    this.events.get(event)?.delete(handler)
  }
  
  
  public removeAll(): EventBus {
    this.events = new Map()
    return this
  }
}

export default EventBus

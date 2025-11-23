export interface IInternalNotification {
  send (data: Record<string,string|boolean|number>): Promise<any>
}
import { injectable } from "tsyringe";
import { IInternalNotification } from "../../../../Domain/Ports/Notifications/InterntalNotificationsPort.domain.ports.notifications";

@injectable()
export class InternalNotificationServiceAdapter implements IInternalNotification {
  send (data: Record<string, string|number|boolean>|any) {
    return new Promise((resolve) => resolve(data));
  }
}
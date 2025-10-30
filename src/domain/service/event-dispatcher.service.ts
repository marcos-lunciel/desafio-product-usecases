import EventDispatcher from "../event/@shared/event-dispatcher";
import EventHandlerInterface from "../event/@shared/event-handler.interface";
import EventInterface from "../event/@shared/event.interface";

export default class EventDispatcherService {
    private static eventDispatcher: EventDispatcher;

    private constructor() {}

    static getInstance(): EventDispatcher {
        if (!this.eventDispatcher) {
            this.eventDispatcher = new EventDispatcher();
        }
        return this.eventDispatcher;
    }

    static register(eventName: string, eventHandler: EventHandlerInterface): void {
        EventDispatcherService.getInstance().register(eventName, eventHandler);
    }

    static notify(event: EventInterface): void {
        EventDispatcherService.getInstance().notify(event);
    }
}
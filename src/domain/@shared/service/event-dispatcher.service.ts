import EventDispatcher from "../event/event-dispatcher";
import EventHandlerInterface from "../event/event-handler.interface";
import EventInterface from "../event/event.interface";

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
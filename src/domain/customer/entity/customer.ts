import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity{
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }
    
    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: Address) {
        this._address = address;
    }

    get isActive(): boolean {
        return this._active;
    }

    validate() { 
        if(this._id.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Id is required",
            })
        }
        if (this._name.length === 0) {
            this.notification.addError({
                context: "customer",
                message: "Name is required",
            })
        }
    }

    changeName(name: string) {
        this._name = name;  
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Address is required to activate a customer');
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
}
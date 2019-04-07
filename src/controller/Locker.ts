import {Client} from "./Client";

export class Locker {

    private id: number;
    private student: Client;
    private floor: string;
    private topLocker: boolean;

    constructor(num: number) {
        this.id = num;
        this.student = new Client("CUS", "IT", 6048273772, "cus.ca", 0, "Fourth", new Date("January 1, 2019 00:00:00"), "Top");
        this.topLocker = num % 2 !== 0;
        let f = num.toString();

        if (f.length === 4) {
            if (f.startsWith("2")) {
                this.floor = "Second Floor";
            } else if (f.startsWith("3")) {
                this.floor = "Third Floor";
            } else {
                this.floor = "Fourth Floor";
            }
        } else {
            this.floor = "Basement";
        }
    }

    public getLockerNumber(): number {
        return this.id;
    }

    public setClientOfLocker(student: Client): void {
        this.student = student;
    }

    public getLockerFloor(): string {
        return this.floor;
    }

    public top(): boolean {
        return this.topLocker;
    }

}

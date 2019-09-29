import LockerSystem from "./controller/LockerSystem";

async function start() {
    console.log("Locker Assignment Starting");
    const app = new LockerSystem();
    await app.getAvailableLockers("./test/data/Lockers.xlsx");
    await app.getAllClients("./test/data/Clients.xlsx");
    app.makeAssignments();
    await app.publishAssignment();
    app.persistAssignments();
}

start();
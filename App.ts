import LockerSystem from "./src/controller/LockerSystem";

(async function(){
    let ls = new LockerSystem();
    await ls.getAvailableLockers("./test/data/Lockers.xlsx");
    await ls.getAllClients("./test/data/Clients.xlsx");
    await ls.makeAssignments();
    await ls.publishAssignment();
});
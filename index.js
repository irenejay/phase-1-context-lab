
    function createEmployeeRecord(employeeArray) {
      return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
      };
    }
  
    function createEmployeeRecords(employeesArray) {
      return employeesArray.map(createEmployeeRecord);
    }
  
    function createTimeInEvent(employee, timeStamp) {
      const [date, hour] = timeStamp.split(' ');
    
   
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const formattedDate = `${year}-${month}-${day}`;
    
      const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour),
        date: formattedDate,
      };
    
      employee.timeInEvents.push(timeInEvent);
      return employee;
    }
    
  
    function createTimeOutEvent(employee, timeStamp) {
      const [date, hour] = timeStamp.split(' ');
      employee.timeOutEvents.push({ type: 'TimeOut', hour: parseInt(hour), date });
      return employee;
    }
  
    function hoursWorkedOnDate(employee, date) {
      const timeIn = employee.timeInEvents.find(event => event.date === date);
      const timeOut = employee.timeOutEvents.find(event => event.date === date);
      return (timeOut.hour - timeIn.hour) / 100;
    }
  
    function wagesEarnedOnDate(employee, date) {
      const hoursWorked = hoursWorkedOnDate(employee, date);
      return hoursWorked * employee.payPerHour;
    }
  
    function allWagesFor(employee) {
      const datesWorked = employee.timeInEvents.map(event => event.date);
      return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
    }
  
    function findEmployeeByFirstName(srcArray, firstName) {
      return srcArray.find(employee => employee.firstName === firstName);
    }
  
    function calculatePayroll(employeeArray) {
      return employeeArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
    }
  
    // Example usage:
    const employeeRecords = createEmployeeRecords([
      ["John", "Doe", "Developer", 25],
      ["Jane", "Doe", "Designer", 30],
    ]);
  
    const john = findEmployeeByFirstName(employeeRecords, "John");
    createTimeInEvent(john, "2024-01-16 0800");
    createTimeOutEvent(john, "2024-01-16 1700");
  
    console.log("Hours worked on 2024-01-16:", hoursWorkedOnDate(john, "2024-01-16"));
    console.log("Wages earned on 2024-01-16:", wagesEarnedOnDate(john, "2024-01-16"));
  
    console.log("Total wages for John:", allWagesFor(john));
  
    console.log("Total payroll for all employees:", calculatePayroll(employeeRecords));
  
  
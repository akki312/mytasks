const express = require('express');
const router = express.router();
const employee = require('../models/employee');

router.get('employees', async (req, res) =>{
    try {
        const employees = await employee.find();
        res.json(employees);
      } catch (err) {
        res.status(500).json({ message: err.message });
     }
});
router.get('.emplyees/:id', getEmployee, (req, res) => {
    res.json(res.employee);
});

router.post('/employees', async (req, res) => {
    const employee = new employee({
        name: req.body.name,
        department: req.body.department,
        salary: req.body.salary
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
});

router.patch('/employees/:id', getEmployee, async (req, res) => {
    if(req.body.name != null) {
        res.employee.name = req.body.name;
    }
    if (req.body.department != null){
        res.employee.department = req.body.department;
     }
     if(req.body.salary != null){
        res.employee.department = req.body.salary;
     }
     try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
     } catch (err) {
        res.status(400).json({ message: err.message});
     }
});

router.delete('/employees/:id', getEmployee, async (req, res) =>{
    try {
        await res.employee.remove();
        res.json({ message: 'employee deleted' });
     } catch (err) {
        
        res.status(500).json({ message: err.message });
     }
});

async function getEmployee(req, res, next) {
    try {
        employee = await employee.findByid(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'employees not found' });
         }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.employee = employee;
    next();
}
module.exports = router;


'use client';

import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, useToast, InputGroup, InputLeftElement, Input, IconButton, Flex, Spacer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeModal from './EmployeeModal';
import { Employee } from '../types/types';
import { ChevronUpIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import styles from './EmployeeView.module.css';

const EmployeeView = ({ employees: initialEmployees }: { employees: Employee[] }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useToast();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'position'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    axios.get('http://localhost:3333/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
        toast({
          title: 'Error',
          description: 'There was an error fetching the employees.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  const handleAddClick = () => {
    setSelectedEmployee(null);
    setIsEditMode(false);
    onOpen();
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    onOpen();
  };

  const handleDeleteClick = (employee: Employee) => {
    axios.delete(`http://localhost:3333/api/employees/${employee._id}`)
      .then(() => {
        setEmployees(employees.filter(e => e._id !== employee._id));
        toast({
          title: 'Employee deleted.',
          description: "Employee has been deleted successfully.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch(error => {
        console.error('There was an error deleting the employee!', error);
        toast({
          title: 'Error',
          description: 'There was an error deleting the employee.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);
  };

  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(filter.toLowerCase()) ||
      employee.position.toLowerCase().includes(filter.toLowerCase()) ||
      employee.department.toLowerCase().includes(filter.toLowerCase());;
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    const modifier = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name) * modifier;
    } else if (sortBy === 'position') {
      return a.position.localeCompare(b.position) * modifier;
    }
    return 0;
  });



  const handleSort = (key: 'name' | 'position') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (key: 'name' | 'position') => {
    if (sortBy === key) {
      return sortOrder === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
    }
    return null;
  };

  return (
    <Box className={styles.employeeView}>
      <Flex mb={4} alignItems="center" className={styles.controls}>
        <Button colorScheme="purple" onClick={handleAddClick} className={styles.addButton}>Add Employee</Button>
        <Spacer />
        <InputGroup width="auto" className={styles.filterInput}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input type="text" value={filter} onChange={handleFilterChange} placeholder="Search employee or role" />
        </InputGroup>
      </Flex>
      <Table variant="striped" className={styles.employeeTable}>
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('name')} cursor="pointer">
              <Flex alignItems="center">
                Name {getSortIcon('name')}
              </Flex>
            </Th>
            <Th onClick={() => handleSort('position')} cursor="pointer">
              <Flex alignItems="center">
                Role {getSortIcon('position')}
              </Flex>
            </Th>
            <Th>Department</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEmployees.map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.name}</Td>
              <Td>{employee.position}</Td>
              <Td>{employee.department}</Td>
              <Td className={styles.employeeActions}>
                <Button size="sm" colorScheme="blue" onClick={() => handleEditClick(employee)} className={styles.editButton}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteClick(employee)} ml={2} className={styles.deleteButton}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EmployeeModal isOpen={isOpen} onClose={onClose} isEditMode={isEditMode} employee={selectedEmployee} />
    </Box>
  );
};

export default EmployeeView;
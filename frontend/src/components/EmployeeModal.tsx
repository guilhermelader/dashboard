// components/EmployeeModal.tsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Employee } from "../types/types";
import styles from "./EmployeeModal.module.css";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  employee: Employee | null;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  isEditMode,
  employee,
}) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (isEditMode && employee) {
      setName(employee.name);
      setPosition(employee.position);
      setDepartment(employee.department);
      setHireDate(employee.hireDate.split("T")[0]);
    } else {
      setName("");
      setPosition("");
      setDepartment("");
      setHireDate("");
    }
  }, [isEditMode, employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      position,
      department,
      hireDate,
    };

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:3333/api/employees/${employee?._id}`,
          payload
        );
        toast({
          title: "Employee updated.",
          description: "Employee details have been updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        await axios.post("http://localhost:3333/api/employees", payload);
        toast({
          title: "Employee added.",
          description: "Employee has been added successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      onClose();
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error.",
        description: "There was an error saving the employee details.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            id="employee-form"
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Position</FormLabel>
              <Input
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Department</FormLabel>
              <Input
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hire Date</FormLabel>
              <Input
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" form="employee-form">
            {isEditMode ? "Update" : "Add"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeModal;

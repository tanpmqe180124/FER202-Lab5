import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function App() {
  const [students, setStudents] = useState([
    { name: "Nguyen Van A", code: "CODE12345", active: true, selected: false },
    { name: "Tran Van B", code: "CODE67890", active: false, selected: false },
  ]);

  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const inputRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!studentName || !studentCode) {
      alert("Please fill out all required fields.");
      return;
    }

    const newStudents = {
      name: studentName,
      code: studentCode,
      active: isActive,
      selected: false,
    };

    setStudents([newStudents, ...students]);
    setStudentName("");
    setStudentCode("");
    setIsActive(false);

    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    const newStudents = [...students];
    const isSelected = newStudents[index].selected;

    if (isSelected) {
      setSelectedCount(selectedCount - 1);
    }

    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const handleSelectStudent = (index) => {
    const newStudents = [...students];
    newStudents[index].selected = !newStudents[index].selected;

    const count = newStudents[index].selected
      ? selectedCount + 1
      : selectedCount - 1;

    setStudents(newStudents);
    setSelectedCount(count);
  };

  const handleClearStudent = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  const handleToggleStatus = (index) => {
    const newStudents = [...students];
    newStudents[index].active = !newStudents[index].active;
    setStudents(newStudents);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">
          Total Selected Students: {selectedCount}
        </h2>
        <Button
          variant="primary"
          onClick={handleClearStudent}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Clear
        </Button>
      </div>

      {/* Form */}
      <Form className="bg-white shadow-md rounded-lg p-6 mb-8">
        <Form.Group className="mb-4">
          <Form.Label className="block text-gray-700 text-sm font-bold mb-2">
            Student Name
          </Form.Label>
          <Form.Control
            ref={inputRef}
            value={studentName}
            type="text"
            placeholder="Enter Student Name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setStudentName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="block text-gray-700 text-sm font-bold mb-2">
            Student Code
          </Form.Label>
          <Form.Control
            value={studentCode}
            type="text"
            placeholder="Enter Student Code"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setStudentCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            label="Still Active"
            checked={isActive}
            className="text-gray-700"
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Student
        </Button>
      </Form>

      {/* Table */}
      <Table striped bordered hover className="mt-6">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="p-4">Select</th>
            <th className="p-4">Student Name</th>
            <th className="p-4">Student Code</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <Form.Check
                  type="checkbox"
                  checked={student.selected}
                  onChange={() => handleSelectStudent(index)}
                />
              </td>
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.code}</td>
              <td className="p-4">
                <Button
                  variant={student.active ? "info" : "secondary"}
                  onClick={() => handleToggleStatus(index)}
                  className={
                    student.active
                      ? "bg-green-500 text-black hover:bg-green-600"
                      : "bg-gray-400 hover:bg-gray-500"
                  }
                >
                  {student.active ? "Active" : "Inactive"}
                </Button>
              </td>

              <td className="p-4">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;

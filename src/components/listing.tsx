import { useEffect, useState } from "react";
import { fetchUsers, Employee } from "../../src/services";
import styled from "styled-components";
import SimpleModal from "./simpleModal";

const Wrapper = styled.div`
  border: 1px solid #000;
  width: 80%;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: #fed330;
  padding: 20px;
  font-weight: bold;
`;

const GridData = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 10px;
`;

export const Listing = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>();

  const getEmployees = async () => {
    const results = await fetchUsers();
    setEmployees(results);
  };
  var employeesData = employees;

  const showData = (id: number) => {
    const addressData = employeesData
      .filter((u) => u.id === id)
      .map((v) => [v.address, v.company]);

    setModalData(addressData);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <Wrapper>
        <Header>
          <div>Id</div>
          <div>Name</div>
          <div>User Name</div>
          <div>Email</div>
        </Header>
        {employees?.map((emp) => (
          <GridData>
            <div>{emp?.id}</div>
            <div>
              <a
                href="javascript: void(0)"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  showData(emp.id);
                }}
              >
                {emp?.name}
              </a>
            </div>
            <div>{emp?.username}</div>
            <div>{emp?.email}</div>
          </GridData>
        ))}
      </Wrapper>
      {<SimpleModal data={modalData} showModal={isModalOpen} />}
    </>
  );
};

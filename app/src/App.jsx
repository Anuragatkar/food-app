import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";
export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const res = await response.json();

        setData(res);
        setFilteredData(res);
        setLoading(false);
      } catch (err) {
        setError("Unable to fetch Data");
      }
    };
    init();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter)
    setSelectedBtn(type);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>{loading}</div>;

  return (
    <Main>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>
        <FilterContainer>
          <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("BreakFast")}>BrakFast</Button>
          <Button onClick={() => filterFood("Lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("Dinner")}>Dinner</Button>
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </Main>
  );
};

export default App;

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: boerder-box;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }

  @media (0 < width < 600px){
    flex-direction:column;
    height:120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 20px;
`;
export const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: whites;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;

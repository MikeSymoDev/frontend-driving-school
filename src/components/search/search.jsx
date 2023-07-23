import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllInstructors, fetchNearestInstructor } from '../../app/slices/instructorSlice';

const SearchComponent = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructors.instructors);
  const [searchOptions, setSearchOptions] = useState({
    zipCode: '',
  });
  const [filteredInstructors, setFilteredInstructors] = useState([]);

  useEffect(() => {
    dispatch(fetchAllInstructors());
  }, [dispatch]);

  useEffect(() => {
    // Filter instructors based on zip code when instructors or searchOptions.zipCode change
    const filtered = instructors.filter((instructor) =>
      instructor.postal_code.startsWith(searchOptions.zipCode)
    );
    setFilteredInstructors(filtered);
    // Pass the filteredInstructors to the onSubmit function to update the list in DriverOverview
    onSubmit(filtered);
  }, [instructors, searchOptions.zipCode, onSubmit]);

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchOptions({ ...searchOptions, [name]: value });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Dispatch the fetchNearestInstructor action here
    dispatch(fetchNearestInstructor(searchOptions.zipCode));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="zipCode"
          value={searchOptions.zipCode}
          onChange={handleSearchChange}
          placeholder="Search by zip code"
        />
        <button type="submit">Search</button>
      </form>

      <div className="instructors-list">
        {filteredInstructors.length > 0 ? (
          filteredInstructors.map((instructor) => (
            <div key={instructor.id}>
              <h3>{instructor.name}</h3>
              <p>Zip Code: {instructor.postal_code}</p>
            </div>
          ))
        ) : (
          <p>No instructors found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;

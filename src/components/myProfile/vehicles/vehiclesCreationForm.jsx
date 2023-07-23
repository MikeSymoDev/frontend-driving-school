import React, { useState } from 'react';
import './vehiclesCreationForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createNewVehicle } from '../../../app/slices/vehicleSlice';

export const VehiclesCreationForm = () => {
    const dispatch = useDispatch();
    const vehicleState = useSelector((store) => store.vehicles)
    const myVehicles = vehicleState.data


    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [transmission, setTransmission] = useState('M');
    const [fuelType, setFuelType] = useState('G');
    const [selectedYear, setSelectedYear] = useState('');

    const startYear = 1970;
    const endYear = 2024;

    // Generate an array of years dynamically with a loop
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
        years.push(i.toString());
    }

    // Sort the years array in descending order (newest first)
    years.sort((a, b) => b - a);

    const vehicleData = {
        make: make,
        model: model,
        year: selectedYear, // Use the selectedYear state instead of the year state
        transmission: transmission,
        fuel_type: fuelType,
    };



    // Function to handle year change
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const TRANSMISSION_OPTIONS = [
        { value: 'M', label: 'Manual' },
        { value: 'A', label: 'Automatic' },
    ];

    const FUELTYPE_OPTIONS = [
        { value: 'G', label: 'Gasoline' },
        { value: 'D', label: 'Diesel' },
        { value: 'H', label: 'Hybrid' },
        { value: 'E', label: 'Electric' }
    ];

    const createVehicleHandler = async (e) => {
        e.preventDefault();

        console.log(vehicleData)
        dispatch(createNewVehicle(vehicleData));

        setMake("")
        setModel("")
        setFuelType("G")
        setTransmission("M")
    };

    return (
        <>
            <div className="MyProfile-Vehicles">
                <h3>Create Vehicle</h3>
                {vehicleState.newCreated && <h4 className="creation-success">Vehicle has been created</h4>}
                {vehicleState.error && <h4 className="creation-failed"> No vehicle has been created</h4>}
                <div className="Create-Vehicle-Div">
                    <form className="Create-Vehicle-Form" onSubmit={(e) => createVehicleHandler(e)}>
                        <div className="Vehicle-Input-Container">
                            <div className="MyProfile-Vehicle-Left">
                                <div className="Create-Vehicle-Form-Element">
                                    <label>Make:</label>
                                    <input className="Create-Vehicle-Form-Input" type="text" value={make} required onChange={(e) => { setMake(e.target.value); }} />
                                </div>
                                <div className="Create-Vehicle-Form-Element">
                                    <label>Model:</label>
                                    <input className="Create-Vehicle-Form-Input" type="text" value={model} required onChange={(e) => { setModel(e.target.value); }} />
                                </div>
                                <div className="Create-Vehicle-Form-Element">
                                    <label>Year:</label>
                                    <select className='Create-Vehicle-Form-DropDown' required value={selectedYear} onChange={handleYearChange}>
                                        <option value="">Select Year</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="MyProfile-Vehicle-Right">
                                <div className="Create-Vehicle-Form-Element">
                                    <label>Transmission:</label>
                                    <select className='Create-Vehicle-Form-DropDown' required onChange={(e) => { setTransmission(e.target.value); }}>
                                        {TRANSMISSION_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="Create-Vehicle-Form-Element">
                                    <label>Fuel Type:</label>
                                    <select className='Create-Vehicle-Form-DropDown' required onChange={(e) => { setFuelType(e.target.value); }}>
                                        {FUELTYPE_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input className="submit" type="submit" value="CREATE VEHICLE" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

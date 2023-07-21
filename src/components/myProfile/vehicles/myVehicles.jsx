import { useDispatch, useSelector } from 'react-redux';
import './myVehicles.scss'
import { useEffect } from 'react';
import { deleteVehicle, fetchMyVehicles } from '../../../app/slices/vehicleSlice';




export const MyVehicles = () => {

    const dispatch = useDispatch();
    const vehicleState = useSelector((store) => store.vehicles)
    const myVehicles = vehicleState.data

    useEffect(() => {
        dispatch(fetchMyVehicles());
    }, [dispatch, vehicleState.newCreated, vehicleState.deleted]); // , vehicleState.deleted
    console.log(myVehicles)

    const handleDeleteVehicle = async (vehicleId) => {
        try {
          // Dispatch the deleteVehicle action with the vehicleId as an argument
          await dispatch(deleteVehicle(vehicleId));
      
          // Handle any success scenario, e.g., show a success message or reload data
          console.log('Vehicle deleted successfully.');
          // ... perform additional actions if needed ...
        } catch (error) {
          // Handle any error that might occur during the delete process
          console.error('Error deleting vehicle:', error.message);
          // ... perform error handling if needed ...
        }
      };


    return (

        <>
<div className='MyVehicles-Container'>
    <h2>My Vehicles</h2>
    <div className='MyVehicles-Grid'>
        {myVehicles.map((myVehicle) => (
            <div className='MyVehicle-Object' key={myVehicle.id}>
                <h3 className='MyVehicle-Object-Title'>{myVehicle.make} {myVehicle.model}</h3>
                <div className='MyVehicle-Object-Description'>
                    <p>Year: {myVehicle.year}</p>
                    <p>Transmission: {myVehicle.transmission}</p>
                    <p>Fuel Type: {myVehicle.fuel_type}</p>
                </div>
                <div className='MyVehicle-Object-Image'>
                    {myVehicle.vehicle_image.map((image, index) => (
                        <img key={index} src={image.image} alt={`Image ${index + 1}`} />
                    ))}
                </div>
                <div className='MyVehicle-Object-Button-Group'>
                    {/* Render "Upload Image" button only if there are no images in the vehicle_image array */}
                    {myVehicle.vehicle_image.length === 0 && (
                        <button className='small-button'>Upload Image</button>
                    )}
                    <button className='small-button'>Edit</button>
                    <button className='small-button' onClick={() => handleDeleteVehicle(myVehicle.id)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
</div>

        </>
    )
}
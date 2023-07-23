import { useDispatch, useSelector } from 'react-redux';
import './myVehicles.scss';
import { useEffect, useState } from 'react';
import { deleteVehicle, fetchMyVehicles } from '../../../app/slices/vehicleSlice';
import { deleteVehicleImage, uploadVehicleImage } from '../../../app/slices/vehicleImageSlice';

export const MyVehicles = () => {
  const dispatch = useDispatch();
  const vehicleState = useSelector((store) => store.vehicles);
  const vehicleImageState = useSelector((store) => store.vehicleImages);
  const vehicleImageData = vehicleImageState.images;
  const myVehicles = vehicleState.data;
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchMyVehicles());
  }, [dispatch, vehicleState.newCreated, vehicleState.deleted, vehicleImageData]);

  console.log(myVehicles);

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await dispatch(deleteVehicle(vehicleId));
      console.log('Vehicle deleted successfully.');
    } catch (error) {
      console.error('Error deleting vehicle:', error.message);
    }
  };

  const mapTransmissionToLabel = (transmission) => {
    const TRANSMISSION_OPTIONS = {
      M: 'Manual',
      A: 'Automatic'
    };
    return TRANSMISSION_OPTIONS[transmission] || '';
  };

  const mapFuelTypeToLabel = (fuelType) => {
    const FUELTYPE_OPTIONS = {
      D: 'Diesel',
      G: 'Gasoline',
      H: 'Hybrid',
      E: 'Electric'
    };
    return FUELTYPE_OPTIONS[fuelType] || '';
  };

  const handleDeleteImage = async (vehicleId, imageId) => {
    dispatch(deleteVehicleImage({ vehicleId, imageId }));
    setSelectedImage("")
  };

  const handleImageUpload = (vehicleId) => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    dispatch(uploadVehicleImage({ vehicleId, formData }));
    setSelectedImage("")
  };

  return (
    <>
      <div className='MyVehicles-Container'>
        <h2>My Vehicles</h2>
        <div className='MyVehicles-Grid'>
          {myVehicles.map((myVehicle) => (
            <div className='MyVehicle-Object' key={myVehicle.id}>
              <h3 className='MyVehicle-Object-Title'>
                {myVehicle.make} {myVehicle.model}
              </h3>
              <div className='MyVehicle-Object-Description'>
                <p>Year: {myVehicle.year}</p>
                <p>Transmission: {mapTransmissionToLabel(myVehicle.transmission)}</p>
                <p>Fuel Type: {mapFuelTypeToLabel(myVehicle.fuel_type)}</p>
              </div>
              <div className='MyVehicle-Object-Image'>
                {myVehicle.vehicle_image.map((image, index) => (
                  <img key={index} src={image.image} alt={`Image ${index + 1}`} />
                ))}
              </div>
              {myVehicle.vehicle_image.length === 0 && (
                <div className='No-Image-Container'>
                  <p>No image available</p>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      setSelectedImage(e.target.files[0]);
                    }}
                  />
                </div>
              )}
              <div className='MyVehicle-Object-Button-Group'>
                {myVehicle.vehicle_image.length === 0 && (
                  <button
                    className='small-button'
                    disabled={!selectedImage} // Disable the button when no image is selected
                    onClick={() => handleImageUpload(myVehicle.id)}
                  >
                    Upload Image
                  </button>
                )}
                {myVehicle.vehicle_image.length > 0 && (
                  <button
                    className='small-button'
                    onClick={() => handleDeleteImage(myVehicle.id, myVehicle.vehicle_image[0].id)}
                  >
                    Delete Image
                  </button>
                )}
                <button className='small-button' onClick={() => handleDeleteVehicle(myVehicle.id)}>
                  Delete Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
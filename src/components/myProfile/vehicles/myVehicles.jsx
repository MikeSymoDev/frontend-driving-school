import { useDispatch, useSelector } from 'react-redux';
import './myVehicles.scss'
import { useEffect, useRef, useState } from 'react';
import { deleteVehicle, fetchMyVehicles } from '../../../app/slices/vehicleSlice';
import { deleteVehicleImage, uploadVehicleImage } from '../../../app/slices/vehicleImageSlice';




export const MyVehicles = () => {

    const dispatch = useDispatch();
    const vehicleState = useSelector((store) => store.vehicles)
    const vehicleImageState = useSelector((store) => store.vehicleImages)
    const vehicleImageData = vehicleImageState.images
    const myVehicles = vehicleState.data
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        dispatch(fetchMyVehicles());
    }, [dispatch, vehicleState.newCreated, vehicleState.deleted, vehicleImageData]); // , vehicleState.deleted
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

      const mapTransmissionToLabel = (transmission) => {
        const TRANSMISSION_OPTIONS = {
            M: 'Manual',
            A: 'Automatic'
        };
        return TRANSMISSION_OPTIONS[transmission] || "";
      }
    
      const mapFuelTypeToLable = (fuelType) => {
        const FUELTYPE_OPTIONS = {
            D: "Diesel",
            G: "Gasoline",
            H: "Hybrid",
            E: "Electric"
        }
        return FUELTYPE_OPTIONS[fuelType] || "";
      }

      const fileInputRef = useRef(null);

      const handleUploadButtonClick = () => {
        // Open the file dialog when the button is clicked
        fileInputRef.current.click();
      };
      const handleUploadImage = async (vehicleId) => {
        try {
          if (!selectedImage) {
            console.error('No image selected.');
            return;
          }
      
          // Create FormData with the selected image
          const formData = new FormData();
          formData.append('image', selectedImage);
      
          // Dispatch the uploadVehicleImage action with the selected image and vehicleId as arguments
          await dispatch(uploadVehicleImage({ vehicleId, formData }));
      
          // Handle any success scenario, e.g., show a success message or reload data
          console.log('Image uploaded successfully.');
          setSelectedImage(null); // Reset the selected image after uploading
          // ... perform additional actions if needed ...
        } catch (error) {
          // Handle any error that might occur during the upload process
          console.error('Error uploading image:', error.message);
          // ... perform error handling if needed ...
        }
      };
      const handleDeleteImage = async (vehicleId, imageId) => {

        dispatch(deleteVehicleImage({ vehicleId, imageId }));
      }
    

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
                    <p>Transmission: {mapTransmissionToLabel(myVehicle.transmission)}</p>
                    <p>Fuel Type: {mapFuelTypeToLable(myVehicle.fuel_type)}</p>
                </div>
                <div className='MyVehicle-Object-Image'>
                    {myVehicle.vehicle_image.map((image, index) => (
                        <img key={index} src={image.image} alt={`Image ${index + 1}`} />
                    ))}
                </div>
                <div className='MyVehicle-Object-Button-Group'>
                    {/* Render "Upload Image" button only if there are no images in the vehicle_image array */}
                    {myVehicle.vehicle_image.length === 0 && (
                        <>
                {/* Hidden file input */}
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                    handleUploadImage(myVehicle.id);
                  }}
                />
                {/* Combined button */}
                
                  <button className='small-button' onClick={handleUploadButtonClick}>
                    Upload Image
                  </button>
                
                         </>
                    )}
                    {myVehicle.vehicle_image.length > 0 && (
                        <button className='small-button' onClick={() => handleDeleteImage(myVehicle.id, myVehicle.vehicle_image[0].id)}>Delete Image</button>
                    )}
                    <button className='small-button'>Edit</button>
                    <button className='small-button' onClick={() => handleDeleteVehicle(myVehicle.id)}>Delete Vehicle</button>
                </div>
            </div>
        ))}
    </div>
</div>

        </>
    )
}
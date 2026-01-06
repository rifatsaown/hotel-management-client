import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import uploadPhoto from '../../components/uploadPhoto';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = '';

      // Upload image if provided
      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        imageUrl = await uploadPhoto(imageFile);
      }

      // Prepare room data
      const roomData = {
        name: data.name,
        type: data.type,
        price: parseFloat(data.price),
        size: data.size,
        capacity: parseInt(data.capacity),
        bedType: data.bedType,
        description: data.description,
        amenities: data.amenities
          ? data.amenities.split(',').map((a) => a.trim())
          : [],
        image: imageUrl,
        available: data.available === 'true',
        featured: data.featured === 'true',
      };

      // Send to backend
      const response = await axiosSecure.post('/rooms/addroom', roomData);

      if (response.data.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Room added successfully',
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error adding room:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text:
          error.response?.data?.message ||
          'Failed to add room. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Galaxies Hotel | Add Room</title>
      </Helmet>
      <div className="w-full px-4 pb-10">
        <div className="bg-base-200 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Add New Room</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Room Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Room Name*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Deluxe Ocean View Suite"
                {...register('name', { required: 'Room name is required' })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-error text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Room Type and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Room Type*</span>
                </label>
                <select
                  {...register('type', { required: 'Room type is required' })}
                  className="select select-bordered"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Room Type
                  </option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="Presidential">Presidential Suite</option>
                  <option value="Family">Family Room</option>
                </select>
                {errors.type && (
                  <span className="text-error text-sm mt-1">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Price per Night*
                  </span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 150.00"
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 0, message: 'Price must be positive' },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.price && (
                  <span className="text-error text-sm mt-1">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            {/* Size and Capacity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Room Size (sqft)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 400 sqft"
                  {...register('size')}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Capacity (Guests)*
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2"
                  {...register('capacity', {
                    required: 'Capacity is required',
                    min: { value: 1, message: 'Capacity must be at least 1' },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.capacity && (
                  <span className="text-error text-sm mt-1">
                    {errors.capacity.message}
                  </span>
                )}
              </div>
            </div>

            {/* Bed Type */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Bed Type</span>
              </label>
              <select
                {...register('bedType')}
                className="select select-bordered"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Bed Type
                </option>
                <option value="Single">Single Bed</option>
                <option value="Double">Double Bed</option>
                <option value="Queen">Queen Bed</option>
                <option value="King">King Bed</option>
                <option value="Twin">Twin Beds</option>
              </select>
            </div>

            {/* Amenities */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Amenities</span>
                <span className="label-text-alt">Separate with commas</span>
              </label>
              <input
                type="text"
                placeholder="e.g., WiFi, TV, Air Conditioning, Mini Bar"
                {...register('amenities')}
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Room Description*
                </span>
              </label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                className="textarea textarea-bordered h-24"
                placeholder="Describe the room features and ambiance..."
              ></textarea>
              {errors.description && (
                <span className="text-error text-sm mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Availability and Featured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Availability*
                  </span>
                </label>
                <select
                  {...register('available')}
                  className="select select-bordered"
                  defaultValue="true"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">
                    Featured Room
                  </span>
                </label>
                <select
                  {...register('featured')}
                  className="select select-bordered"
                  defaultValue="false"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Room Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-accent btn-wide"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Adding Room...
                  </>
                ) : (
                  'Add Room'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoom;

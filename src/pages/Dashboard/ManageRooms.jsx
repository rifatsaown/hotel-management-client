import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEdit, FaEye, FaTimes, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import uploadPhoto from '../../components/uploadPhoto';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  const [editingRoom, setEditingRoom] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchRooms = async () => {
    try {
      const response = await axiosSecure.get('/rooms/allrooms');
      setRooms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load rooms',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = (room) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${room.name}"? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/rooms/${room._id}`);
          if (response.data.status === 'success') {
            fetchRooms(); // Refresh the list
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Room has been deleted successfully.',
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error('Error deleting room:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.response?.data?.message || 'Failed to delete room',
          });
        }
      }
    });
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setEditFormData({
      name: room.name || '',
      type: room.type || '',
      price: room.price || '',
      size: room.size || '',
      capacity: room.capacity || '',
      bedType: room.bedType || '',
      description: room.description || '',
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : '',
      available: room.available !== undefined ? room.available : true,
      featured: room.featured !== undefined ? room.featured : false,
    });
    setImagePreview(room.image || null);
    setNewImage(null);
    // Open modal
    document.getElementById('edit_modal').showModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = editingRoom.image;

      // Upload new image if provided
      if (newImage) {
        imageUrl = await uploadPhoto(newImage);
      }

      // Prepare update data
      const updateData = {
        name: editFormData.name,
        type: editFormData.type,
        price: parseFloat(editFormData.price),
        size: editFormData.size,
        capacity: parseInt(editFormData.capacity),
        bedType: editFormData.bedType,
        description: editFormData.description,
        amenities: editFormData.amenities
          ? editFormData.amenities.split(',').map((a) => a.trim())
          : [],
        image: imageUrl,
        available: editFormData.available,
        featured: editFormData.featured,
      };

      const response = await axiosSecure.put(
        `/rooms/${editingRoom._id}`,
        updateData
      );

      if (response.data.status === 'success') {
        fetchRooms(); // Refresh the list
        document.getElementById('edit_modal').close();
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Room has been updated successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
        setEditingRoom(null);
        setImagePreview(null);
        setNewImage(null);
      }
    } catch (error) {
      console.error('Error updating room:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update room',
      });
    } finally {
      setUpdating(false);
    }
  };

  const closeModal = () => {
    document.getElementById('edit_modal').close();
    setEditingRoom(null);
    setImagePreview(null);
    setNewImage(null);
  };

  const toggleAvailability = async (room) => {
    try {
      const newAvailability = !room.available;
      const response = await axiosSecure.put(`/rooms/${room._id}`, {
        available: newAvailability,
      });

      if (response.data.status === 'success') {
        fetchRooms(); // Refresh the list
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: `Room is now ${newAvailability ? 'available' : 'unavailable'}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Error updating room:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update room availability',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Galaxies Hotel | Manage Rooms</title>
      </Helmet>
      <div className="w-full px-4 pb-10">
        <div className="bg-base-200 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage All Rooms</h2>
            <div className="badge badge-lg badge-primary">
              Total Rooms: {rooms.length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Room Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8">
                      <div className="text-gray-500">
                        No rooms available. Add your first room!
                      </div>
                    </td>
                  </tr>
                ) : (
                  rooms.map((room, index) => (
                    <tr key={room._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            {room.image ? (
                              <img
                                src={room.image}
                                alt={room.name}
                                className="object-cover"
                              />
                            ) : (
                              <div className="bg-gray-300 w-full h-full flex items-center justify-center">
                                <FaEye className="text-gray-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-bold">
                          {room.name || 'No Name'}
                        </div>
                        {room.featured && (
                          <span className="badge badge-warning badge-sm mt-1">
                            Featured
                          </span>
                        )}
                      </td>
                      <td>{room.type || 'N/A'}</td>
                      <td className="font-semibold">${room.price || '0'}</td>
                      <td>{room.capacity || 'N/A'} guests</td>
                      <td>
                        <button
                          onClick={() => toggleAvailability(room)}
                          className={`badge ${
                            room.available ? 'badge-success' : 'badge-error'
                          } cursor-pointer hover:opacity-80`}
                        >
                          {room.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(room)}
                            className="btn btn-warning btn-sm"
                            title="Edit Room"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(room)}
                            className="btn btn-error btn-sm"
                            title="Delete Room"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {rooms.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                Available: {rooms.filter((r) => r.available).length} |
                Unavailable: {rooms.filter((r) => !r.available).length} |
                Featured: {rooms.filter((r) => r.featured).length}
              </p>
            </div>
          )}
        </div>

        {/* Edit Room Modal */}
        <dialog id="edit_modal" className="modal">
          <div className="modal-box max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Edit Room</h3>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateRoom} className="space-y-4">
              {/* Room Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Room Name*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Room Type and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Type*</span>
                  </label>
                  <select
                    name="type"
                    value={editFormData.type || ''}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Presidential">Presidential Suite</option>
                    <option value="Family">Family Room</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Price*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={editFormData.price || ''}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              {/* Size and Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Size</span>
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={editFormData.size || ''}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Capacity*</span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={editFormData.capacity || ''}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              {/* Bed Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Bed Type</span>
                </label>
                <select
                  name="bedType"
                  value={editFormData.bedType || ''}
                  onChange={handleInputChange}
                  className="select select-bordered"
                >
                  <option value="">Select Bed Type</option>
                  <option value="Single">Single Bed</option>
                  <option value="Double">Double Bed</option>
                  <option value="Queen">Queen Bed</option>
                  <option value="King">King Bed</option>
                  <option value="Twin">Twin Beds</option>
                </select>
              </div>

              {/* Amenities */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Amenities</span>
                  <span className="label-text-alt">Comma separated</span>
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={editFormData.amenities || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  placeholder="WiFi, TV, Air Conditioning"
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Description*</span>
                </label>
                <textarea
                  name="description"
                  value={editFormData.description || ''}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered h-20"
                  required
                ></textarea>
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="available"
                      checked={editFormData.available || false}
                      onChange={handleInputChange}
                      className="checkbox"
                    />
                    <span className="label-text">Available</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={editFormData.featured || false}
                      onChange={handleInputChange}
                      className="checkbox"
                    />
                    <span className="label-text">Featured Room</span>
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Room Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-sm h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="modal-action">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-ghost"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Updating...
                    </>
                  ) : (
                    'Update Room'
                  )}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default ManageRooms;

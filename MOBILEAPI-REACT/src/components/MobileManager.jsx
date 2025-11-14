import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const MobileManager = () => {
  const [mobiles, setMobiles] = useState([]);
  const [mobile, setMobile] = useState({
    id: '',
    brand: '',
    model: '',
    price: '',
    color: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedMobile, setFetchedMobile] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

 const baseUrl = `${import.meta.env.VITE_API_URL}/api/mobiles`;

  useEffect(() => {
    fetchAllMobiles();
  }, []);

  const fetchAllMobiles = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setMobiles(res.data);
    } catch (error) {
      setMessage('Failed to fetch mobiles.');
    }
  };

  const handleChange = (e) => {
    setMobile({ ...mobile, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in mobile) {
      if (!mobile[key] || mobile[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    if (isNaN(mobile.price) || Number(mobile.price) <= 0) {
      setMessage('Price must be a valid positive number.');
      return false;
    }
    return true;
  };

  const addMobile = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, mobile);
      setMessage('Mobile added successfully.');
      fetchAllMobiles();
      resetForm();
    } catch (error) {
      setMessage('Error adding mobile.');
    }
  };

  const updateMobile = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, mobile);
      setMessage('Mobile updated successfully.');
      fetchAllMobiles();
      resetForm();
    } catch (error) {
      setMessage('Error updating mobile.');
    }
  };

  const deleteMobile = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllMobiles();
    } catch (error) {
      setMessage('Error deleting mobile.');
    }
  };

  const getMobileById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedMobile(res.data);
      setMessage('');
    } catch (error) {
      setFetchedMobile(null);
      setMessage('Mobile not found.');
    }
  };

  const handleEdit = (mob) => {
    setMobile(mob);
    setEditMode(true);
    setMessage(`Editing mobile with ID ${mob.id}`);
  };

  const resetForm = () => {
    setMobile({
      id: '',
      brand: '',
      model: '',
      price: '',
      color: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Mobile Management</h2>

      <div>
        <h3>{editMode ? 'Edit Mobile' : 'Add Mobile'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={mobile.id} onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand" value={mobile.brand} onChange={handleChange} />
          <input type="text" name="model" placeholder="Model" value={mobile.model} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={mobile.price} onChange={handleChange} />
          <input type="text" name="color" placeholder="Color" value={mobile.color} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addMobile}>Add Mobile</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateMobile}>Update Mobile</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Mobile By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getMobileById}>Fetch</button>

        {fetchedMobile && (
          <div>
            <h4>Mobile Found:</h4>
            <pre>{JSON.stringify(fetchedMobile, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Mobiles</h3>
        {mobiles.length === 0 ? (
          <p>No mobiles found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(mobile).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mobiles.map((mob) => (
                  <tr key={mob.id}>
                    {Object.keys(mobile).map((key) => (
                      <td key={key}>{mob[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(mob)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteMobile(mob.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileManager;

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { teamService } from '../services/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', country: '', formation: '4-3-3' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamService.getAll();
      setTeams(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await teamService.create(formData);
      toast.success('Team created successfully');
      setFormData({ name: '', country: '', formation: '4-3-3' });
      setShowForm(false);
      fetchTeams();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create team');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await teamService.delete(id);
        toast.success('Team deleted');
        fetchTeams();
      } catch (error) {
        toast.error('Failed to delete team');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Teams</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add Team
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="Team Name"
              required
            />
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="form-input"
              placeholder="Country"
            />
            <select
              value={formData.formation}
              onChange={(e) => setFormData({ ...formData, formation: e.target.value })}
              className="form-input"
            >
              <option>4-3-3</option>
              <option>4-2-3-1</option>
              <option>3-5-2</option>
              <option>5-3-2</option>
            </select>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team._id} className="card">
            <h3 className="text-xl font-bold mb-2">{team.name}</h3>
            <p className="text-gray-600 mb-1">Country: {team.country || 'N/A'}</p>
            <p className="text-gray-600 mb-4">Formation: {team.formation}</p>
            <p className="text-gray-600 mb-4">Players: {team.players?.length || 0}</p>
            <div className="flex gap-2">
              <button className="btn btn-secondary flex-1 flex items-center justify-center gap-2">
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(team._id)}
                className="btn bg-red-600 text-white hover:bg-red-700 flex-1 flex items-center justify-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

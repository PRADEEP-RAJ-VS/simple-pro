import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { playerService, teamService } from '../services/api';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    jersey: '',
    position: 'MF',
    team: '',
    pace: 75,
    passing: 75,
    shooting: 75,
    defending: 75,
    dribbling: 75,
    strength: 75
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [playersRes, teamsRes] = await Promise.all([
        playerService.getAll(),
        teamService.getAll()
      ]);
      setPlayers(playersRes.data.data);
      setTeams(teamsRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await playerService.create(formData);
      toast.success('Player created successfully');
      setFormData({
        name: '',
        jersey: '',
        position: 'MF',
        team: '',
        pace: 75,
        passing: 75,
        shooting: 75,
        defending: 75,
        dribbling: 75,
        strength: 75
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create player');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await playerService.delete(id);
        toast.success('Player deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete player');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Players</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus /> Add Player
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="Player Name"
                required
              />
              <input
                type="number"
                value={formData.jersey}
                onChange={(e) => setFormData({ ...formData, jersey: e.target.value })}
                className="form-input"
                placeholder="Jersey #"
                required
              />
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="form-input"
              >
                <option>GK</option>
                <option>DF</option>
                <option>MF</option>
                <option>FW</option>
              </select>
              <select
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Select Team</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['pace', 'passing', 'shooting', 'defending', 'dribbling', 'strength'].map((skill) => (
                <div key={skill}>
                  <label className="text-sm font-medium text-gray-700 capitalize">{skill}: {formData[skill]}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData[skill]}
                    onChange={(e) => setFormData({ ...formData, [skill]: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full card">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Jersey</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{player.name}</td>
                <td className="p-3">{player.jersey}</td>
                <td className="p-3">{player.position}</td>
                <td className="p-3">{player.team?.name}</td>
                <td className="p-3">
                  {((player.pace + player.passing + player.shooting + player.defending + player.dribbling + player.strength) / 6).toFixed(1)}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(player._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

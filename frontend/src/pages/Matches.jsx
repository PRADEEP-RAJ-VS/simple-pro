import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { matchService, teamService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    homeTeam: '',
    awayTeam: '',
    matchDate: '',
    venue: '',
    competition: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [matchesRes, teamsRes] = await Promise.all([
        matchService.getAll(),
        teamService.getAll()
      ]);
      setMatches(matchesRes.data.data);
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
      await matchService.create(formData);
      toast.success('Match created successfully');
      setFormData({
        title: '',
        homeTeam: '',
        awayTeam: '',
        matchDate: '',
        venue: '',
        competition: ''
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create match');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Matches</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus /> Create Match
        </button>
      </div>

      {showForm && (
        <div className="card mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="form-input"
              placeholder="Match Title"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.homeTeam}
                onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Home Team</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
              <select
                value={formData.awayTeam}
                onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                className="form-input"
                required
              >
                <option value="">Away Team</option>
                {teams.map((t) => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            </div>
            <input
              type="datetime-local"
              value={formData.matchDate}
              onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
              className="form-input"
              required
            />
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="form-input"
              placeholder="Venue"
            />
            <input
              type="text"
              value={formData.competition}
              onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
              className="form-input"
              placeholder="Competition"
            />
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Create</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match) => (
          <div key={match._id} className="card border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4">{match.title}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-lg">{match.homeTeam?.name} vs {match.awayTeam?.name}</p>
              <p className="text-gray-600">Date: {new Date(match.matchDate).toLocaleString()}</p>
              <p className="text-gray-600">Venue: {match.venue || 'N/A'}</p>
              <p className="text-gray-600">Competition: {match.competition || 'N/A'}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                match.status === 'completed' ? 'bg-green-100 text-green-800' :
                match.status === 'live' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {match.status}
              </span>
            </div>
            <button
              onClick={() => navigate(`/lineup/${match._id}`)}
              className="btn btn-primary w-full"
            >
              Set Lineup
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

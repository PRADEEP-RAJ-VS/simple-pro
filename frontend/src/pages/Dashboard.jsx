import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { matchService } from '../services/api';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await matchService.getAll();
      setMatches(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600">{matches.length}</div>
          <div className="text-gray-600">Total Matches</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {matches.filter((m) => m.status === 'completed').length}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {matches.filter((m) => m.status === 'scheduled').length}
          </div>
          <div className="text-gray-600">Scheduled</div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
        <div className="space-y-4">
          {matches.length > 0 ? (
            matches
              .filter((m) => m.status !== 'completed')
              .slice(0, 5)
              .map((match) => (
                <div key={match._id} className="border-l-4 border-blue-500 pl-4 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{match.homeTeam?.name} vs {match.awayTeam?.name}</h3>
                      <div className="flex gap-4 text-gray-600 text-sm mt-2">
                        <span className="flex items-center gap-1">
                          <FaCalendar /> {new Date(match.matchDate).toLocaleDateString()}
                        </span>
                        {match.venue && (
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt /> {match.venue}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                      {match.status}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No matches found</p>
          )}
        </div>
      </div>
    </div>
  );
}

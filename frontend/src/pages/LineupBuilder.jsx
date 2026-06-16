import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { matchService, lineupService, playerService } from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';

export default function LineupBuilder() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [lineups, setLineups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [matchId]);

  const fetchData = async () => {
    try {
      const [matchRes, lineupsRes] = await Promise.all([
        matchService.getById(matchId),
        lineupService.getByMatch(matchId)
      ]);
      setMatch(matchRes.data.data);
      setLineups(lineupsRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelect = async (teamId) => {
    setSelectedTeam(teamId);
    setSelectedPlayers([]);
    try {
      const res = await playerService.getByTeam(teamId);
      setAvailablePlayers(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch players');
    }
  };

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.some((p) => p._id === player._id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p._id !== player._id));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleSaveLineup = async () => {
    if (selectedPlayers.length === 0) {
      toast.error('Please select at least 11 players');
      return;
    }

    try {
      const lineupData = {
        match: matchId,
        team: selectedTeam,
        formation: '4-3-3',
        players: selectedPlayers.slice(0, 11).map((p, i) => ({
          player: p._id,
          position: p.position,
          shirtNumber: p.jersey
        })),
        bench: selectedPlayers.slice(11).map((p) => p._id)
      };

      const existingLineup = lineups.find((l) => l.team._id === selectedTeam);
      if (existingLineup) {
        await lineupService.update(existingLineup._id, lineupData);
        toast.success('Lineup updated successfully');
      } else {
        await lineupService.create(lineupData);
        toast.success('Lineup created successfully');
      }

      fetchData();
      setSelectedTeam(null);
      setSelectedPlayers([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save lineup');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!match) return <div className="text-center p-8">Match not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/matches')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft /> Back to Matches
      </button>

      <h1 className="text-3xl font-bold mb-4">{match.homeTeam?.name} vs {match.awayTeam?.name}</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Home Team */}
        <div className="card cursor-pointer border-2 border-gray-300 hover:border-blue-500" onClick={() => handleTeamSelect(match.homeTeam._id)}>
          <h2 className="text-xl font-bold mb-4">{match.homeTeam?.name}</h2>
          {selectedTeam === match.homeTeam._id && (
            <div className="bg-blue-100 p-4 rounded mb-4 text-sm text-blue-800">
              Selected for lineup
            </div>
          )}
          <div className="space-y-2">
            {availablePlayers
              .filter((p) => !selectedPlayers.some((sp) => sp._id === p._id))
              .slice(0, 5)
              .map((p) => (
                <div key={p._id} className="text-gray-600">
                  #{p.jersey} - {p.name} ({p.position})
                </div>
              ))}
          </div>
        </div>

        {/* Away Team */}
        <div className="card cursor-pointer border-2 border-gray-300 hover:border-blue-500" onClick={() => handleTeamSelect(match.awayTeam._id)}>
          <h2 className="text-xl font-bold mb-4">{match.awayTeam?.name}</h2>
          {selectedTeam === match.awayTeam._id && (
            <div className="bg-blue-100 p-4 rounded mb-4 text-sm text-blue-800">
              Selected for lineup
            </div>
          )}
          <div className="space-y-2">
            {availablePlayers
              .filter((p) => !selectedPlayers.some((sp) => sp._id === p._id))
              .slice(0, 5)
              .map((p) => (
                <div key={p._id} className="text-gray-600">
                  #{p.jersey} - {p.name} ({p.position})
                </div>
              ))}
          </div>
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="card mb-8">
            <h3 className="text-2xl font-bold mb-4">Select Players ({selectedPlayers.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availablePlayers.map((player) => (
                <button
                  key={player._id}
                  onClick={() => handlePlayerSelect(player)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedPlayers.some((p) => p._id === player._id)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="font-bold">#{player.jersey}</div>
                  <div className="text-sm">{player.name}</div>
                  <div className="text-xs">{player.position}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveLineup}
            className="btn btn-primary w-full py-3 text-lg"
          >
            Save Lineup
          </button>
        </>
      )}

      {lineups.length > 0 && (
        <div className="mt-8 card bg-gray-50">
          <h3 className="text-2xl font-bold mb-4">Current Lineups</h3>
          {lineups.map((lineup) => (
            <div key={lineup._id} className="border-l-4 border-green-500 pl-4 py-4">
              <h4 className="font-bold">{lineup.team?.name}</h4>
              <p className="text-sm text-gray-600">Players: {lineup.players?.length || 0}</p>
              <p className="text-sm text-gray-600">Formation: {lineup.formation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

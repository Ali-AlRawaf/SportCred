const NBA = require("nba");
const NBAClient = require('nba-api-client')

export const getNBAplayerByName = (player_name) => {
	const player = NBA.findPlayer(player_name)
	return player
}

export const getHeadshotOfPlayer = (player) => {
	const result = NBAClient.getPlayerHeadshotURL({PlayerID: player.playerId, TeamID: player.teamId})
	return result
}

export const getPlayerStats = async (player) => {
	const result = await NBA.stats.playerInfo({ PlayerID: player.playerId })
	return result
}
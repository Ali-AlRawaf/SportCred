const NBA = require("nba");
const NBAClient = require('nba-api-client')
const NBAStats = require('nba-stats-client')

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

export const getGamesOnDay = async () => {
	const sports = await NBAStats.getGames({ year: 2018, month: 1, day: 1 });
	const result = sports.sports_content.games.game.map(game => {
		const home = game.home.nickname;
		const away = game.visitor.nickname;
		return {"home": home, "away": away}
	})
	return result
}
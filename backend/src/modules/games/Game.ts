export interface Settings {
  playerCount: number;
}

enum PlayerStatus {
  Active,
  Inactive,
}

export interface Player {
  id: number;
  status: PlayerStatus;
}

interface RematchTracker {
  [key: number]: boolean;
}

enum GameStatus {
  Pending,
  Started,
  Ended,
}

export default class Game {
  roomCode: string;
  hostId: number;
  settings: Settings;
  players: Player[];
  status: GameStatus;
  rematchTracker: RematchTracker;
  rematchVoteThreshhold: 100;

  constructor(hostId: number, playerCount: number, type: string) {}

  getSettings() {
    return this.settings;
  }
  // ! NOTE FOR SELF
  // what if you make a component for maps
  // <Map func={(data) => return <ListItem e={data.e}} />} />
  // something like that to handle lists
  addPlayer(playerId: number) {
    let success = true;
    let starting = false;
    let startingInformation;

    if (this.players.length != this.settings.playerCount) {
      const newPlayer: Player = { id: playerId, status: PlayerStatus.Active };
      this.players.push(newPlayer);
      this.rematchTracker[playerId] = false;

      success = true;
      if (this.players.length == this.settings.playerCount) {
        startingInformation = this.start();
        starting = true;
      }
    }

    return { success, starting, startingInformation };
  }

  removePlayer(playerId: number) {}

  isReady() {}

  changeRematchOption(playerId: number) {}

  start() {}

  end() {}

  handleRejoin() {}

  handleDisconnect() {}

  handleEnd() {}

  hasPlayer(playerId: number) {
    return !!this.players.find(player => player.id == playerId);
  }
}

import db from "#db/client";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistTrack } from "./queries/playlistTracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed(
  NUM_TRACKS = 20,
  NUM_PLAYLISTS = 10,
  NUM_PLAYLIST_TRACKS = 15,
) {
  for (let i = 0; i < NUM_TRACKS; i++) {
    const name = "Track " + i;
    const durationMs = 1000000;
    await createTrack(name, durationMs);
  }
  for (let i = 0; i < NUM_PLAYLISTS; i++) {
    const name = "Playlist " + i;
    const description = "Description " + i;
    await createPlaylist(name, description);
  }
  for (let i = 0; i < NUM_PLAYLIST_TRACKS; i++) {
    const playlistId = 1 + Math.floor(i / 3);
    const trackId = 1 + i;
    await createPlaylistTrack(playlistId, trackId);
  }
}

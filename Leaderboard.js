import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema({
    code: String,
    results: [{
        score: Number,
        user: String
    }]
});
const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);
export default Leaderboard;

const profileModel = require("../../models/profileSchema");

module.exports = async(client, discord, member) =>{
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        isDailyAvailable: true,
        streak: 0,
        pontos: 1000
    });
    profile.save();
};
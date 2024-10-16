const { MessageAttachment,MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const sharp = require('sharp');
const { prefix } = require('../botconfig.json');

module.exports = {
    help: {
        name: 'profile',
        aliases: ['pro'],
    },
    async run(bot, message, args) {
        try {
            if (!message.content.startsWith(`${prefix}`)) return;

            const username = message.author.username;
            const userId = message.author.id;
            const role = message.member.roles.highest.name;
            const avatarURL = message.author.displayAvatarURL({ format: 'png', size: 128 });
            const status = message.member.presence?.status || 'offline';

            let statusColor;
            switch (status) {
                case 'online':
                    statusColor = '#43B581';
                    break;
                case 'idle':
                    statusColor = '#FAA61A';
                    break;
                case 'dnd':
                    statusColor = '#F04747';
                    break;
                default:
                    statusColor = '#747F8D';
            }

            // Menggunakan arrayBuffer sebagai pengganti buffer dan mengubahnya ke Buffer.
            const response = await fetch(avatarURL);
            const avatarArrayBuffer = await response.arrayBuffer();
            const avatarBuffer = Buffer.from(avatarArrayBuffer);

            const backgroundBlur = await sharp(avatarBuffer)
                .resize(500, 700)
                .blur(20)
                .modulate({ brightness: 0.5 })
                .png()
                .toBuffer();

            const avatar = await sharp(avatarBuffer)
                .resize(200, 200)
                .composite([{
                    input: Buffer.from(
                        `<svg><circle cx="100" cy="100" r="100"/></svg>`,
                        'utf-8'
                    ),
                    blend: 'dest-in'
                }])
                .png()
                .toBuffer();

            const textBuffer = await sharp({
                create: {
                    width: 500,
                    height: 700,
                    channels: 4,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                }
            })
            .composite([{
                input: Buffer.from(
                    `<svg width="500" height="700">
                        <text x="20" y="40" font-size="15" fill="#FFFFFF" font-family="Sans">${userId}</text>
                        <text x="250" y="420" font-size="36" fill="#FF9E00" text-anchor="middle" font-family="Sans" font-weight="bold">${username}</text>
                        <text x="250" y="445" font-size="16" fill="#FFFFFF" text-anchor="middle" font-family="Sans" font-weight="bold">AdySquad Server</text>
                        <text x="250" y="550" font-size="24" fill="white" text-anchor="middle" font-family="Sans">${role}</text>
                        <text x="470" y="40" font-size="24" fill="${statusColor}" text-anchor="end" font-family="Sans">• ${status.toUpperCase()}</text>
                    </svg>`,
                    'utf-8'
                ),
                top: 0,
                left: 0
            }])
            .png()
            .toBuffer();

            const finalImage = await sharp(backgroundBlur)
                .composite([
                    { input: textBuffer, top: 0, left: 0 },
                    { input: avatar, top: 180, left: 150 }
                ])
                .png()
                .toBuffer();

            const attachment = new MessageAttachment(finalImage, 'profile-image.png');
            
            message.reply({ files: [attachment] });

        } catch (err) {
            console.error('Error occurred in profile command:', err);
            message.reply("An error occurred while generating your profile image.");
        }
    }
}
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "https://kaleidoscopic-gingersnap-626d8a.netlify.app/", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());


const io = new Server(server, {
  cors: {
    origin: "https://kaleidoscopic-gingersnap-626d8a.netlify.app/", // Frontend URL
    methods: ["GET", "POST"],
  },
});

let players = [];
let gameStates = {}; // Track game states
const prompts = {
  truth: [
    "What is your biggest fear?",
    "Who was your first crush?",
    "What is the most embarrassing thing you've ever done?",
    "What’s a secret you’ve never told anyone?",
    "Have you ever lied to your best friend?",
    "Ever fucked your friend's guy/girl?",
    "Do you have a crush?",
    "Do u like sex chatting?",
    "Who's that person you can die for?",
    "Someone you hate?",
    "Do you go for night parties?",
    "Have you ever smoked before?",
    "Have you ever got drunk?",
    "Do u masturbate?",
    "Last time you cried?",
    "bisexual or straight?",
    "What name would you give your pussy/Dick?",
    "Ever given/receive a BJ?",
    "Do u watch porn?",
    "If you had 3 wishes, what would they be?",
    "Last time you had good sex???",
    "Favourite Dick size / your dick size?",
    "Have you ever been touched by your fellow woman/man?",
    "Do you enjoy oral sex?",
    "Do you Like dirty talks?",
    "Something you would change about yourself?",
    "Ever slept with a married man/woman?",
    "Can you suck me till I cum?",
    "What get u wet/horny?",
    "Do you ever wish you could start over?",
    "Last time you sucked a dick/pussy?",
    "Have you ever imagine making love with your crush when you are making love with your man/woman?",
    "Ever fucked two friends?",
    "ever cheated on ur bae /boo b4?",
    "one secret?",
    " longest relationship?",
    "what do you like in a man/woman?",
    "three sex positions you love?",
    "ever had sex with a stranger?",
    "Are you naughty?",
    "Ever exchanged nudes?",
    "Favorite body part of your opposite gender?",
    "done one night stand?",
    "suck or fuck??",
    "Can u let me touch u?",
    "where's the craziest place you have had sex?",
    "favorite sex position?",
    "done threesome?",
    "Have you been seen having sex?",
    "Your kind of man/woman",
    "what's your mood right now?",
    "Three craziest place you have had sex.",
    "can u let me finger/wank you?",
    "what turns you on before sex?",
    "How do you feel when you are cuming",
    "ever cried during sex?",
    "How  do u enjoy sex",
    "rough sex or gentle",
    "Can we exchange nudes?",
    "If I'm right there would it be okay if I kissed you.",
    "What's your secret move to turn a guy on.",
    "Have you ever made out because you were horny?",
    "what should a guy do to make you wet.",
    "If there's one place a guy could touch to make you horny, where is that",
    "Have you ever slept naked.",
    "Wats the most sensitive part of your body opposite gender should touch.",
    "Ever watched porn with opposite gender?",
    " Can I be your sex mate",
    "Which part of my  body you want to touch or feel?",
    "What’s your secret move to turn a guy on?",
    "The best kiss you ever did that make you wet?",
    "Do you watch porn?",
    "What kind of porn do you like?",
    "Have you ever had an orgasm during sex before?",
    "Where do you like being touched the most?",
    "How often do you masturbate?",
    "Do you like breast/Dick massage?",
    "Do you like any sex position?",
    "Do you like threesome?",
    "Which position is your favorite for us?",
    "If I was in your room right now, what would you want to do to me?",
    "When you had sex for the first time, what age were you?",
    "Can I finger your pussy or stroke your dick?",
    "What is the weirdest thing you dreamt of doing with a girl or guy?",
    "Have you ever slept with someone, then woke up wishing you never have?",
    "What's one thing you want me to do that I have not yet- In the bedroom?",
    "Do you like sex chatting?",
    "What is the dirtiest thing, you ever thought about me?",
    "What would you say or do if I sent you a dirty picture of me?",
    "What is your biggest turn on in bed?",
    "Last kiss and wit who",
    "Ever kissed a same gender person?",
    "Do u love bj?",
    "Tel me 3 deepest secrets?",
    "Ever had sex wit a same gender person?",
    "Do u sex chat?",
    "Ever begged for sex?",
    "Are you naughty?",
    " Naughtiest tin u have ever done",
    " Last time u felt like having sex",
    "How long do you want sex to be.",
    " Do you love sex?",
    "Do you prefer being sucked on your pussy or rather have sex.",
    " Are you horny right now ",
    "What don’t you like about me?",
    "Did you like your first kiss?",
    "Have you ever decided to kiss or make out with a guy just because you were Horny?",
    "If you ask me to do something naughty what would you prefer I do?",
    "What turns you on the most in a guy/girl?",
    "Have you ever thought about kissing me?",
    "How long do you think a guy should last on bed?",
    "Have you ever had a crush on one of your cousins?",
    "Have you ever dated two girls/guys at the same time?",
    "While you are kissing, what types of other things you prefer to be done simultaneously?",
    "What’s your biggest sexual fear?",
    "How often do you watch something naughty?",
    "Do you like your partner to be silent or loud?",
    "Tell me a Dirty Truth about you that no one else knows?",
    "When is the last time that you touched yourself?",
    "If I was tied down to the bed right now, what would you do to me?",
    "When was the last time you masturbated?",
    " Does naughty talk get you aroused?",
    "Have you ever witnessed people having sex?",
    " If u were to choose a sex time for both of us, how long will that be?",
    "Tell me one thing I could do that would make you reach orgasm.",
    "Would you prefer to dominate me in bed or do you want me to dominate you in bed?",
    "Which is your favorite kind of sex: soft, slow, and sweet or aggressive, fast, and feisty?",
    " Is there something you've seen in a steamy movie that you'd like to try?",
    "What position have you always wanted to try?",
    "Hw many times a week would you want to have sex?",
    "How long can u last in bed?",
    "Do u like me being ontop u or u being ontop me?",
    "How can I make sex more enjoyable for you?",
    " Can I watch you play with your stuff",
    " Last time you had a wet dream?",
    "Would you ever want to be blindfolded during sex?",
    "HAVE YOU EVER FLIRTED WITH SOMEONE ELSE WHILE IN A RELATIONSHIP?",
    "What’s a fantasy you’ve always wanted to act out but haven’t told me about?",
    "What’s the one thing i do that drives you crazy in a good and bd way?",
    "If you could choose one secret location for us to be naughty,where would it be and why?",

  ],
  dare: [
    "Do 10 pushups.",
    "Sing a song chosen by the other player.",
    "Act like a chicken for 30 seconds.",
    "Do a silly dance for 1 minute.",
    "Send an embarrassing text to someone.",
    "Tell me everything you are wearing now? ",
    "Send me ya nude video",
    "send me your full pics",
    "Snap yourself on bra or bare chest  and show me",
    "snap yourself on pant/boxer and show me now",
    "Send me your two sexiest pics",
    "show me your boobs or dick",
    "Tell me an erotic story.",
    "Send me a picture of you in singlet.",
    "Send me a pic.",
    " ask me a question.",
    "Send me your boobs/Dick pics with oil on it",
    "Ur most enjoyable sex,tel me abt it in details",
    "Promise to kiss me wen we meet?",
    "Promise to watch porn wit me or gv me a Bj",
    "Promise to have sex with me",
    " Tell me how you had ur last time sex in details",
    "Send me a sex video of yourself",
    "Show me a porn video you’d want us to act out together",
    " Tell me something to get me aroused.",



    

  ],
};


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Add player on connection
  socket.on("create_game", (playerName) => {
    if (!playerName) {
      socket.emit("error_message", "Player name is required.");
      return;
    }

    const existingPlayer = players.find((p) => p.name === playerName);
    if (existingPlayer) {
      console.error(`Player name '${playerName}' is already taken.`);
      socket.emit("error_message", "Player name already taken.");
      return;
    }

    const player = { id: socket.id, name: playerName };
    players.push(player);
    io.emit("player_list", players.map((p) => p.name));
  });

  // Send game request
  socket.on("send_game_request", (targetUser) => {
    const targetPlayer = players.find((p) => p.name === targetUser);
    if (targetPlayer) {
      console.log(`Game request sent from ${socket.id} to ${targetPlayer.id}`);
      socket.to(targetPlayer.id).emit("game_invitation", socket.id);
    } else {
      console.error(`Target player '${targetUser}' not found.`);
      socket.emit("error_message", "Target player not found.");
    }
  });

  // Accept game request
  socket.on("accept_game", (fromUser) => {
    const targetPlayer = players.find((p) => p.id === fromUser);
    const currentPlayer = players.find((p) => p.id === socket.id);

    if (!targetPlayer || !currentPlayer) {
      console.error(`One or both players not found. Target: ${fromUser}, Current: ${socket.id}`);
      socket.emit("error_message", "Players not found.");
      return;
    }

    const room = fromUser;
    gameStates[room] = {
      players: {
        [currentPlayer.name]: { id: socket.id, turns: 0, consecutive: null },
        [targetPlayer.name]: { id: fromUser, turns: 0, consecutive: null },
      },
      currentTurn: currentPlayer.name,
      usedQuestions: {},
    };

    socket.join(room);
    io.to(fromUser).emit("start_game", { room, opponent: currentPlayer.name });
    socket.emit("start_game", { room, opponent: targetPlayer.name });
  });

  // Get a truth or dare prompt
  socket.on("get_prompt", ({ type, room }) => {
    const gameState = gameStates[room];
    if (!gameState) {
      console.error(`Game state not found for room: ${room}`);
      socket.emit("error_message", "Game not found.");
      return;
    }

    const currentPlayerName = Object.keys(gameState.players).find(
      (name) => gameState.players[name].id === socket.id
    );

    if (!currentPlayerName || gameState.currentTurn !== currentPlayerName) {
      socket.emit("error_message", "Not your turn.");
      return;
    }

    const playerState = gameState.players[currentPlayerName];
    if (playerState.consecutive === type) {
      playerState.turns++;
    } else {
      playerState.turns = 1;
      playerState.consecutive = type;
    }

    if (playerState.turns > 2) {
      socket.emit("error_message", "You cannot choose the same type three times in a row.");
      return;
    }

    const questions = [...prompts[type]];
    const usedQuestions = gameState.usedQuestions || {};
    const usedByType = usedQuestions[type] || [];

    const availableQuestions = questions.filter((q) => !usedByType.includes(q));

    if (availableQuestions.length === 0) {
      usedQuestions[type] = [];
    } else {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const prompt = availableQuestions[randomIndex];

      usedByType.push(prompt);
      usedQuestions[type] = usedByType;
      gameState.usedQuestions = usedQuestions;

      io.to(room).emit("new_prompt", { type, prompt, player: currentPlayerName });

      const nextPlayerName = Object.keys(gameState.players).find((name) => name !== currentPlayerName);
      gameState.currentTurn = nextPlayerName;
    }
  });

  // Delete room
  socket.on("delete_room", (room) => {
    delete gameStates[room];
    io.to(room).emit("room_deleted");
    socket.leave(room);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    players = players.filter((p) => p.id !== socket.id);
    io.emit("player_list", players.map((player) => player.name));

    for (const room in gameStates) {
      const gameState = gameStates[room];
      const playerName = Object.keys(gameState.players).find(
        (name) => gameState.players[name].id === socket.id
      );

      if (playerName) {
        delete gameStates[room];
        io.to(room).emit("room_deleted");
      }
    }
  });
});

// Serve static files (if needed)
app.get("/", (req, res) => {
  res.send("Backend is running.");
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
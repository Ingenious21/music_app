// Modern Music App Script (Enhanced Functionality)

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const speedSelect = document.getElementById('speed');
const currentSongName = document.getElementById('currentSongName');
const currentTimeElem = document.getElementById('currentTime');
const totalDurationElem = document.getElementById('totalDuration');
const playlist = document.getElementById('playlist');

let isRepeat = false;
let isShuffle = false;
let currentSongIndex = 0;

const songs = [
    { name: 'Chris Brown - Bruce Lee', url: '/assets/music/bruce_lee.mp3' },
    { name: 'Chris Brown - Delusional', url: '/assets/music/delusional.mp3' },
    { name: 'Chris Brown - Feelings Don\'t lie', url: '/assets/music/feelings_dont_lie.mp3' },
    { name: 'Chris Brown - Freak', url: '/assets/music/freak.mp3' },
    { name: 'Chris Brown - Hmm - ft Davido', url: '/assets/music/hmm_davido.mp3' },
    { name: 'Chris Brown - No One Else', url: '/assets/music/no_one_else.mp3' },
    { name: 'Chris Brown - Press Me', url: '/assets/music/press_me.mp3' },
    { name: 'Chris Brown - Stutter', url: '/assets/music/stutter.mp3' },
    { name: 'Chris Brown - Angel Numbers/Ten Toes', url: '/assets/music/angel_numbers.mp3' },
    { name: 'Chris Brown - Weakest Link', url: '/assets/music/weakest_link.mp3' },
    { name: 'Chris Brown - Shooter', url: '/assets/music/shooter.mp3' }
];

function loadSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    audio.src = song.url;
    currentSongName.textContent = song.name;
    updatePlaylistHighlight();
}

function playSong() {
    audio.play();
    playIcon.classList.replace('fa-play', 'fa-pause');
}

function pauseSong() {
    audio.pause();
    playIcon.classList.replace('fa-pause', 'fa-play');
}

function togglePlayPause() {
    audio.paused ? playSong() : pauseSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    if (isShuffle) {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * songs.length);
        } while (nextIndex === currentSongIndex);
        currentSongIndex = nextIndex;
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    playSong();
}

function updatePlaylistHighlight() {
    [...playlist.children].forEach((item, idx) => {
        item.classList.toggle('active', idx === currentSongIndex);
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = song.name;
    li.addEventListener('click', () => {
        loadSong(index);
        playSong();
    });
    playlist.appendChild(li);
});

// Event Listeners
playBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
});
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
});
speedSelect.addEventListener('change', () => {
    audio.playbackRate = parseFloat(speedSelect.value);
});

audio.addEventListener('ended', () => {
    if (isRepeat) {
        playSong();
    } else {
        nextSong();
    }
});

audio.addEventListener('loadedmetadata', () => {
    totalDurationElem.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    currentTimeElem.textContent = formatTime(audio.currentTime);
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

// Initialize first song
loadSong(currentSongIndex);

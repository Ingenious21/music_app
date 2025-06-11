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
    {
        name: 'Chris Brown - Bruce Lee',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Bruce%20Lee%20Lyric%20Video.mp3'
    },
    {
        name: 'Chris Brown - Delusional',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Delusional%20Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Feelings Don\'t lie',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Feelings%20Dont%20Lie%20Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Freak - ft Lil Wayne, Joyner Lucas & Tee Grizzley',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Freak%20Visualizer%20ft%20Lil%20Wayne%20Joyner%20Lucas%20Tee%20Grizzley.mp3'
    },
    {
        name: 'Chris Brown - Hmm - ft Davido',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Hmmm%20Visualizer%20ft%20Davido.mp3'
    },
    {
        name: 'Chris Brown - No One Else',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20No%20One%20Else%20Visualizer%20ft%20Fridayy.mp3'
    },
    {
        name: 'Chris Brown - Press Me',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Press%20Me%20Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Stutter',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Stutter%20Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Angel Numbers/Ten Toes',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Angel%20Numbers%20Ten%20Toes%20Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Weakest Link',
        url: '/assets/music/y2mate.com%20-%20Weakest%20Link.mp3'
    },
    {
        name: 'Chris Brown - Shooter',
        url: '/assets/music/y2mate.com%20-%20Chris%20Brown%20Shooter%20Visualizer.mp3'
    }
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

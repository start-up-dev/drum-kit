class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.currentKick = "allSounds/kick-808.wav";
    this.snareAudio = document.querySelector(".snare-sound");
    this.currentSnare = "allSounds/snare-808.wav";
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.currenthithat = "allSounds/hihat-808.wav";
    this.clapAudio = document.querySelector(".clap-sound");
    this.currentClap = "allSounds/clap-808.wav";
    this.select = document.querySelectorAll(".select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.bpnText = document.querySelector(".bpn");
    this.bpnRange = document.querySelector(".form-range");
    this.index = 0;
    this.bpm = 180;
    this.isPlaying = null;
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);

    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }

        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }

        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }

        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }

  changeSelector(e) {
    const selectionValue = e.target.value;
    const selectionName = e.target.name;

    switch (selectionName) {
      case "kick":
        this.kickAudio.src = selectionValue;
        break;
      case "snare":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap":
        this.clapAudio.src = selectionValue;
        break;
    }
  }

  muteBTN(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "3":
          this.clapAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "3":
          this.clapAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  changeRange(e) {
    this.bpm = e.target.value;
    this.bpnText.innerText = this.bpm;
  }

  updateRange() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

// Event Listener

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.select.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSelector(e);
  });
});

drumKit.muteBtn.forEach((muteBtn) => {
  muteBtn.addEventListener("click", function (e) {
    drumKit.muteBTN(e);
  });
});

drumKit.bpnRange.addEventListener("input", function (e) {
  drumKit.changeRange(e);
  drumKit.updateRange();
});

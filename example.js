// ----------------------
// Setup
// ----------------------

// Load the Gif
var sup1 = new SuperGif({ gif: document.getElementById("exampleimg") });
sup1.load(function () {});

var instructions = document.getElementById("instructions");

// ----------------------
// Text to speech GUI
// ----------------------

// Code for the voice select element
var voiceSelecter = document.getElementById("voiceSelecter");

// setInterval(() => {
//   axios
//     .get("https://jsonplaceholder.typicode.com/users")
//     .then(function (response) {
//       // handle success
//       let number = Math.floor(Math.random() * 11);
//       let name = response.data[parseInt(number)].name;
//       console.log(name, number);
//       playsyncronized();
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// }, 10000);

function getVoices() {
  if (voiceSelecter) {
    voiceSelecter.innerHTML = "";
    var voices = speechSynthesis.getVoices();
    // iOS returns voices it doesn't let you use.
    var bIsiOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var iOSVoiceSet = {};
    if (bIsiOS) {
      var array = [
        "Maged",
        "Zuzana",
        "Sara",
        "Anna",
        "Melina",
        "Karen",
        "Serena",
        "Moira",
        "Tessa",
        "Samantha",
        "Monica",
        "Paulina",
        "Satu",
        "Amelie",
        "Thomas",
        "Carmit",
        "Lekha",
        "Mariska",
        "Damayanti",
        "Alice",
        "Kyoko",
        "Yuna",
        "Ellen",
        "Xander",
        "Nora",
        "Zosia",
        "Luciana",
        "Joana",
        "Ioana",
        "Milena",
        "Laura",
        "Alva",
        "Kanya",
        "Yelda",
        "Ting-Ting",
        "Sin-Ji",
        "Mei-Jia",
      ];
      array.forEach(function (val) {
        iOSVoiceSet[val] = true;
      });
    }
    voices.forEach(function (voice, i) {
      // only some iOS voices are working, but they are all returned.
      if (!bIsiOS || voice.name in iOSVoiceSet) {
        var option = document.createElement("option");
        option.value = voice.name;
        option.innerHTML = voice.name;
        if (voice.lang.substring(0, 2) == "en") {
          voiceSelecter.insertBefore(option, voiceSelecter.firstChild);
        } else {
          voiceSelecter.appendChild(option);
        }
      }
    });
  }
}

getVoices();
// Update the voices when they change (chrome loads asynchronously)
window.speechSynthesis.onvoiceschanged = function (e) {
  getVoices();
};

// ----------------------
// Load new GIFs
// ----------------------

var gifurlinput = document.getElementById("gifurlinput");
function loadNewGif() {
  var gifURL = gifurlinput.value;
  if (gifURL.toLowerCase().indexOf(".gif") == -1) {
    document.getElementById("giferrormessage").innerHTML =
      "Specify a gif file.";
    return;
  }
  function doesFileExist(urlToFile, success) {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", urlToFile, true);
    xhr.onload = function (e) {
      if (xhr.status != "404") {
        if (success) success(urlToFile);
      } else
        document.getElementById("giferrormessage").innerHTML =
          "That file was not found.";
    };
    xhr.onerror = function () {
      document.getElementById("giferrormessage").innerHTML =
        "Error loading gif. Make sure the resource exists and has Access-Control-Allow-Origin headers.";
    };
    xhr.send();
  }

  function onFileExists() {
    var imagecontainer = document.getElementById("imagecontainer");
    imagecontainer.innerHTML = "";
    imgElement = document.createElement("img");
    imgElement.src = gifURL;
    imgElement.animatedSrc = gifURL;
    imgElement.setAttribute("rel:animated_src", gifURL);
    imgElement.setAttribute("rel:auto_play", 0);
    imagecontainer.appendChild(imgElement);
    instructions.innerHTML = "Please wait...";

    if (sup1) {
      // free memory from previous SuperGif class.  The looping animation would
      // prevent the frames array from being garbage collected otherwise and memory
      // use would grow.
      sup1.destroy();
    }

    sup1 = new SuperGif({ gif: imgElement });
    sup1.load(function () {
      instructions.innerHTML = "Click on the image below to hear the message.";
    });
    document.getElementById("giferrormessage").innerHTML = "";
  }
  doesFileExist(gifURL, onFileExists);
}
if (gifurlinput) gifurlinput.addEventListener("input", loadNewGif);

var imgurgifs = [
  "https://i.imgur.com/lLHEQ3F.gif", // mona
  "https://i.imgur.com/ork8hoP.gif", // lily
  "https://i.imgur.com/dS2yZ19.gif", // dog2
  "https://i.imgur.com/YpKsOQS.gif", // trump
  "https://i.imgur.com/FkEVxI6.gif", // washington
  "https://i.imgur.com/dvXw5bu.gif", // brunette
  "https://i.imgur.com/RLMkj1P.gif", // kiera
  "https://i.imgur.com/JwAmmkx.gif", // dog1
  "https://i.imgur.com/vqVsazA.gif", // beiber
  "https://i.imgur.com/YphP1gi.gif", // portman
];
var imgurgifindex = 0;
var newgifbutton = document.getElementById("newgifbutton");
if (newgifbutton) {
  newgifbutton.addEventListener("click", function () {
    imgurgifindex += 1;
    imgurgifindex = imgurgifindex % imgurgifs.length;
    gifurlinput.value = imgurgifs[imgurgifindex];
    loadNewGif();
  });
}

// ---------------------
// Playing TTS in sync
// ---------------------

// play the specified text
function playsyncronized(text = "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people). Since the release of the first novel, Harry Potter and the Philosopher's Stone, on 26 June 1997, the books have found immense popularity, critical acclaim and commercial success worldwide. They have attracted a wide adult audience as well as younger readers and are often considered cornerstones of modern young adult literature.[2] As of February 2018, the books have sold more than 500 million copies worldwide, making them the best-selling book series in history, and have been translated into eighty languages.[3] The last four books consecutively set records as the fastest-selling books in history, with the final installment selling roughly eleven million copies in the United States within twenty-four hours of its release. The series was originally published in English by two major publishers, Bloomsbury in the United Kingdom and Scholastic Press in the United States. A play, Harry Potter and the Cursed Child, based on a story co-written by Rowling, premiered in London on 30 July 2016 at the Palace Theatre, and its script was published by Little, Brown. The original seven books were adapted into an eight-part namesake film series by Warner Bros. Pictures, which is the third highest-grossing film series of all time as of February 2020. In 2016, the total value of the Harry Potter franchise was estimated at $25 billion,[4] making Harry Potter one of the highest-grossing media franchises of all time. A series of many genres, including fantasy, drama, coming of age, and the British school story (which includes elements of mystery, thriller, adventure, horror, and romance), the world of Harry Potter explores numerous themes and includes many cultural meanings and references.[5] According to Rowling, the main theme is death.[6] Other major themes in the series include prejudice, corruption, and madness.[7] The success of the books and films has allowed the Harry Potter franchise to expand with numerous derivative works, a travelling exhibition that premiered in Chicago in 2009, a studio tour in London that opened in 2012, a digital platform on which J.K. Rowling updates the series with new information and insight, and a pentalogy of spin-off films premiering in November 2016 with Fantastic Beasts and Where to Find Them, among many other developments. Most recently, themed attractions, collectively known as The Wizarding World of Harry Potter, have been built at several Universal Parks & Resorts amusement parks around the world.") {
  if (!"speechSynthesis" in window) {
    instructions.innerHTML =
      "Speech synthesis is not supported in this browser.  Sorry.";
    document.getElementById("ttsoptions").style.visibility = "hidden";
  } else {
    document.getElementById("ttsoptions").style.visibility = "visible";
    if (speechSynthesis.speaking) {
      return;
    }
    // var text = document.getElementById("texttospeakinput").value;
    // get the selected voice
    var voice = speechSynthesis.getVoices().filter(function (voice) {
      return voice.name == voiceSelecter.value;
    })[0];

    // Splitting each utterance up using punctuation is important.  Intra-utterance
    // punctuation will add silence to the tts which looks bad unless the mouth stops moving
    // correctly. Better to split it into separate utterances so play_for_duration will move when
    // talking, and be on frame 0 when not.

    // split everything betwen deliminators [.?,!], but include the deliminator.
    var substrings = text.match(/[^.?,!]+[.?,!]?/g);
    for (var i = 0, l = substrings.length; i < l; ++i) {
      var str = substrings[i].trim();

      // Make sure there is something to say other than the deliminator
      var numpunc = (str.match(/[.?,!]/g) || []).length;
      if (str.length - numpunc > 0) {
        // suprisingly decent approximation for multiple languages.

        // if you change the rate, you would have to adjust
        var speakingDurationEstimate = str.length * 50;
        // Chinese needs a different calculation.  Haven't tried other Asian languages.
        if (str.match(/[\u3400-\u9FBF]/)) {
          speakingDurationEstimate = str.length * 200;
        }

        var msg = new SpeechSynthesisUtterance();

        (function (dur) {
          msg.addEventListener("start", function () {
            sup1.play_for_duration(dur);
          });
        })(speakingDurationEstimate);

        // The end event is too inacurate to use for animation,
        // but perhaps it could be used elsewhere.  You might need to push
        // the msg to an array or aggressive garbage collection fill prevent the callback
        // from firing.
        //msg.addEventListener('end', function (){console.log("too late")}

		
        msg.text = str;
        //change voice here
        msg.voice = voice;

        window.speechSynthesis.speak(msg);
      }
    }
  }
}
document.addEventListener("keypress", function (e) {
  if (e.which == 13) {
    playsyncronized();
  }
});

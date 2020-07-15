const strings = {
  1: "E",
  2: "B",
  3: "G",
  4: "D",
  5: "A",
  6: "E"
};
const frets = 12;
const $fretboard = $(".fretboard");
const numericScale = {
  1: ["C"],
  2: ["C#", "Db"],
  3: ["D"],
  4: ["D#", "Eb"],
  5: ["E"],
  6: ["F"],
  7: ["F#", "Gb"],
  8: ["G"],
  9: ["G#", "Ab"],
  10: ["A"],
  11: ["A#", "Bb"],
  12: ["B"]
};

// Create Markup
var i, j;
for (i = 1; i <= Object.keys(strings).length; i++) {
  // console.log("string:", strings[i]);
  $fretboard.append('<div class="string string' + i + '"></div>');
  for (j = 0; j <= frets; j++) {
    var note = getNoteByStringAndFret(i, j);
    $(".string" + i).append(
      '<div class="fret fret' +
      j +
      '" data-note="' +
      note +
      '" data-string="' +
      i +
      '" data-fret="' +
      j +
      '"></div>'
    );
  }
}

// Helper Functions
function getNoteByStringAndFret(string, fret) {
  var stringNote = strings[string];
  for (var x = 1; x <= Object.keys(numericScale).length; x++) {
    if (Object.values(numericScale[x]).indexOf(stringNote) > -1) {
      var baseKey = x;
      var targetKey = baseKey + fret;
      if (targetKey > 12) {
        targetKey = targetKey - 12;
      }
      // var targetNote = Object.keys(numericScale[targetKey]);
      return targetKey;
    }
  }
}

function getNoteNameByID(id) {
  return numericScale[id];
}

function randomNoteID() {
  var numberOfNotes = Object.keys(numericScale).length;
  // console.log("numberOfNotes", numberOfNotes);
  targetNoteId = Math.ceil(Math.random() * Math.floor(numberOfNotes));
  // console.log("targetNote", targetNote);
  var targetNoteName = getNoteNameByID(targetNoteId);
  $(".js-targetNote").text(targetNoteName);
}

// Game Logic
let targetNoteId;
let clickedNoteId;
let points = 0;

// Init Game
randomNoteID();

// Click
$(".fret")
  .off("click")
  .on("click", function () {
    let $this = $(this);
    $(".fret").removeClass("active").html("");
    clickedNoteId = $(this).data("note");
    let noteName = getNoteNameByID(clickedNoteId);
    // console.log( "Fret Clicked", noteName );
    $this
      .addClass("active")
      .html("<span class='noteName'>" + noteName + "</span>");
    if (clickedNoteId === targetNoteId) {
      points++;
      $(".points").text(points);
      // console.log("points", points);
      randomNoteID();
    }
  });


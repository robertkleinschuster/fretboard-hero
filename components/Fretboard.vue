<template lang="html">
  <div>
    <h1 class="headline">{{ headline }}</h1>
    <div class="fretboard">
      <div class="string" :class="'string' + (stringIndex + 1)" v-for="(string, stringIndex) in string_list" :data-string="stringIndex + 1">
        <div class="fret" :class="'fret' + (fret - 1)" v-for="fret in fret_count + 1" v-on:click="onClickFret" :data-fret="fret - 1" :data-note="getNoteIdByStringAndFret(stringIndex + 1, fret -1)">
          <span class="noteName hidden" :id="(stringIndex + 1) + '_' + (fret -1)">{{ getNoteNameByID(getNoteIdByStringAndFret(stringIndex + 1, fret -1)) }}</span>
        </div>
      </div>
    </div>

    <div class="interface">
      <div class="interface__item">
        {{find}} <span id="targetNote" class="target__note" :data-note="noteId">{{ getNoteNameByID(noteId) }}</span>
      </div>
      <div class="interface__item">
        {{findString}} <span id="targetString" class="target__note" :data-string="stringId + 1">{{ string_list[stringId] }}</span>
      </div>

      <div class="interface__item">
        {{points}} <span id="points" class="points">0 </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import i18next from "i18next";
    import LanguageDetector from 'i18next-browser-languagedetector';

    i18next.use(LanguageDetector).init({
      detection: {
        // order and from where user language should be detected
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

        // keys or params to lookup language from
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,

        // cache user language on
        caches: ['localStorage', 'cookie'],
        excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
      },
      fallbackLng: "en",
      debug: false,
      resources: {
        en: {
          translation: {
            "headline": "Fretboard Hero",
            "find": "Find:",
            "findString": "String:",
            "points": "Points:",
          }
        },
        de: {
          translation: {
            "headline": "Fretboard Hero",
            "find": "Ton:",
            "findString": "Saite:",
            "points": "Punkte:",
          }
        }
      }
    });
    export default {
        name: "Fretboard",
        data: function () {
          return {
            headline: i18next.t("headline"),
            find: i18next.t("find"),
            findString: i18next.t("findString"),
            points: i18next.t("points"),
            string_list: string_list,
            fret_count: fret_count,
            noteId: randomNoteId(),
            stringId: randomStringId(),
            isActive: false
          }
        },
      methods: {
        getNoteIdByStringAndFret: getNoteIdByStringAndFret,
        getNoteNameByID: getNoteNameByID,
        onClickFret: function (ev: Event) {
          let string = ev.currentTarget.parentElement.getAttribute("data-string");
          let fret = ev.currentTarget.getAttribute("data-fret");
          for (let i = 0; i < document.getElementsByClassName("noteName").length; i++) {
            document.getElementsByClassName("noteName").item(i).classList.add("hidden");
            document.getElementsByClassName("noteName").item(i).classList.remove("success");
          }
          let span = document.getElementById(string + "_" + fret);
          span.classList.remove("hidden");

          if (document.getElementById("targetNote").getAttribute("data-note") == ev.currentTarget.getAttribute("data-note")
          && document.getElementById("targetString").getAttribute("data-string") == string
          ) {
            document.getElementById("points").innerHTML++;
            span.classList.add("success");
            this.noteId = randomNoteId();
            this.stringId = randomStringId();
          } else {
            span.classList.add("error");

          }
        }
      }
    }

    let fret_count = 12;

    let string_list = [
      "E",
      "B",
      "G",
      "D",
      "A",
      "E"
    ];

    let numericScale = [
       ["C"],
       ["C#", "Db"],
       ["D"],
       ["D#", "Eb"],
       ["E"],
       ["F"],
       ["F#", "Gb"],
       ["G"],
       ["G#", "Ab"],
       ["A"],
       ["A#", "Bb"],
       ["B"]
    ];


    function getNoteIdByStringAndFret(string, fret)
    {
      string = string - 1;
      let stringNote = string_list[string];
      let id = numericScale.findIndex((value) => value.indexOf(stringNote) != -1) + fret;
      if (id >= 12) {
        id = id - 12;
      }
      return id;
    }


    function randomNoteId()
    {
      return Math.ceil(Math.random() * Math.floor(numericScale.length - 1 ));
    }

    function randomStringId()
    {
      return Math.ceil(Math.random() * Math.floor(string_list.length - 1));
    }


    function getNoteNameByID(id) {
      if (typeof numericScale[id] != 'undefined') {
        return numericScale[id].join(' / ')
      }
      return '';
    }
</script>

<style lang="scss" scoped>
  .headline,
  .subheadline
  {
    font-size: 2rem;
    text-align: center;
  }

  .headline,
  .subheadline,
  .title,
  .f-item
  {
    width: 100%;
  }
  .f-wrap {
    display: flex;
    flex-wrap: wrap;
  }


  .fretboard {
    width: 100%;
    background: #1f1f1f;
    margin: 0 0 0rem;
  }
  .string {
    display: flex;
    position: relative;
    height: 40px;
    width: 100%;
  }
  .string:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 3px;
    width: 100%;
    background: #ffffff;
    pointer-events: none;  //allow clickthrough
  }
  .string {
    &1:after {
      height: 1px;
    }
    &2:after {
      height: 2px;
    }
    &3:after {
      height: 3px;
    }
    &4:after {
      height: 4px;
    }
    &5:after {
      height: 5px;
    }
    &6:after {
      height: 6px;
    }
  }
  .fret {
    position: relative;
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    justify-content: center;
  }
  .fret:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2px;
    height: 100%;
    background: #999999;
  }

  .fret0 {
    max-width: 40px;
    &:after {
      width: 8px;
    }
  }

  .noteName {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    display: flex;
    width: 60px;
    height: 32px;
    padding: 0.5rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  .noteName.success {
    background: #7bf33b;
  }

  .noteName.error {
    background: #aa5f5f;
  }

  @mixin fretpoint {
    content: "";
    display: block;
    position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    margin: auto;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #928160;
  }
  .string3 {
    .fret3,
    .fret5,
    .fret7,
    .fret9 {
      &:before {
        @include fretpoint();
      }
    }
  }
  .string2,
  .string5 {
    .fret12 {
      &:before {
        @include fretpoint();
        top: 4px;
      }
    }
  }

  .noteNames {
    display: flex;
    justify-content: space-around;
  }
  .noteName__btn {
    min-height: 50px;
    flex: 1 1 auto;
  }

  .interface {
    display: flex;
    justify-content: center;
  }
  .interface__item {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1.4rem;
  }

</style>

import { Tutor } from "../types";

function getPreferenceString(tutor: Tutor) {
  let preferenceString = "";
  
  if (tutor.esl_novice) {
    preferenceString += "ESL Novice, ";
  }
  if (tutor.esl_beginner) {
    preferenceString += "ESL Beginner, ";
  }
  if (tutor.esl_intermediate) {
    preferenceString += "ESL Intermediate, ";
  }
  if (tutor.citizenship) {
    preferenceString += "Citizenship, ";
  }
  if (tutor.sped_ela) {
    preferenceString += "SPED ELA, ";
  }
  if (tutor.basic_math) {
    preferenceString += "Basic Math, ";
  }
  if (tutor.hiset_math) {
    preferenceString += "HiSET Math, ";
  }
  if (tutor.basic_reading) {
    preferenceString += "Basic Reading, ";
  }
  if (tutor.hiset_reading) {
    preferenceString += "HiSET Reading, ";
  }
  if (tutor.basic_writing) {
    preferenceString += "Basic Writing, ";
  }
  if (tutor.hiset_writing) {
    preferenceString += "HiSET Writing, ";
  }
  return preferenceString.slice(0, preferenceString.length - 2);
}

export default getPreferenceString;
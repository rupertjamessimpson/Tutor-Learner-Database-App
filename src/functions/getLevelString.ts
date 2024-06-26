function getLevelString(level: string) {
  let returnString = '';
  
  switch (level) {
    case 'conversation':
      returnString = 'Conversation';
      break;
    case 'esl_novice':
      returnString = 'ESL Novice';
      break;
    case 'esl_beginner':
      returnString = 'ESL Beginner';
      break;
    case 'esl_intermediate':
      returnString = 'ESL Intermediate';
      break;
    case 'citizenship':
      returnString = 'Citizenship';
      break;
    case 'sped_ela':
      returnString = 'SPED ELA';
      break;
    case 'basic_math':
      returnString = 'Basic Math';
      break;
    case 'basic_reading':
      returnString = 'Basic Reading';
      break;
    case 'basic_writing':
      returnString = 'Basic Writing';
      break;
	}
    
  
  return returnString;
}

export default getLevelString;
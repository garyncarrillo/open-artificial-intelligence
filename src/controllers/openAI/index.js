import { Configuration, OpenAIApi } from "openai";
import { keys } from '../../config/apiCredentials'

console.log(keys.REACT_APP_OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: keys.REACT_APP_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const createOpenAI = async(params) => {
  if (!configuration.apiKey) {
      alert("OpenAI API key not configured, please follow instructions in README.md")
      return;
  }

  const description = params.description || '';
  if (description.trim().length === 0) {
      alert("Please enter a valid description")
      return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(description),
      temperature: 0.6,
    });
    console.log('************************************');
    console.log(completion);
    alert(completion.data.choices[0].text)
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

export const chatOpenAI = async(params) => {
  if (!configuration.apiKey) {
      alert("OpenAI API key not configured, please follow instructions in README.md")
      return;
  }

  if (!params) {
      alert("Please enter a valid description")
      return;
  }

  try {
    const completion = await openai.createCompletion({
      model: params.optionSelected, //"text-davinci-002"
      prompt: generatePromptwitQuestion(params),
      temperature: params.temperature,
      max_tokens: params.maxLength,
      top_p: params.topP,
      frequency_penalty: params.frecuencyPenalty,
      presence_penalty: params.presencePenalty,
    });
    console.log('************************************');
    console.log(completion.data);
    return {
      response: completion.data.choices[0].text,
      total_tokens: completion.data.usage.total_tokens
    };
  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

const generatePrompt = (description) => {
    const capitalizedDescription =
    description[0].toUpperCase() + description.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.
  
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${capitalizedDescription}
  Names:`;
  }

  const textHasPoint = (text) => {
    
    if (text.trim().length === 0) {
      return true;
    }
    
    if (text.substr(text.length - 1, 1) == '.') {
      return true;
    }

    return false;
  }

  const generatePromptwitQuestion = (params) => {
    var question = `${textHasPoint(params.role) ? params.role : params.role+"."} ${textHasPoint(params.task) ? params.task : params.task+"." } ${params.context ? "Context:" : "" } ${textHasPoint(params.context) ? params.context : params.context+"." } with voice ${params.voiceSelected} for ${params.audiencesSelected} audience`
    console.log("**********************")
    console.log(question)
    return `${question}`;
  }
  

  export const engineList = async(params) => {
    try {
      const response = await openai.listEngines();
      return response;
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
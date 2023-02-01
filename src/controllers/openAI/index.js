import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
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
  
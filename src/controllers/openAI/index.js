import { Configuration, OpenAIApi } from "openai";
import { keys } from '../../config/apiCredentials'

console.log(keys.REACT_APP_OPENAI_API_KEY)

const configuration = new Configuration({
  apiKey: keys.REACT_APP_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const chatCompletion = [
                          "gpt-3.5-turbo-0301",
                          "gpt-3.5-turbo"
                       ];

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
    if (chatCompletion.includes(params.optionSelected)) {
      const completion = await openai.createChatCompletion({
        model: params.optionSelected,
        messages: [{role: "user", content: generatePromptwitQuestion(params)}],
      });
      return {
        response: completion.data.choices[0].message.content,
        total_tokens: completion.data.usage.total_tokens
      };
    } else {
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
    }
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
      return null;
    }
  }

  export const trainingOpenAI = async(description) => {
    if (!configuration.apiKey) {
        alert("OpenAI API key not configured, please follow instructions in README.md")
        return;
    }
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-002", //"text-davinci-002"
        prompt: generatePromptTraining2(description),
        temperature: 0.5,
        max_tokens: 10000,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
      });
      console.log('************************************');
      console.log(completion.data);
      console.log(completion.data.choices[0].text);
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


  const generatePromptTraining = (description) => {
    // const capitalizedDescription =
    // description[0].toUpperCase() + description.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.
  
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${description}
  Names:`;
  }

  const generatePromptTraining2 = (description) => {
    // const capitalizedDescription =
    // description[0].toUpperCase() + description.slice(1).toLowerCase();
    //considering the following answers, please give me an answer that takes into account what has already been mentioned.
    //according to the following answers, what is the main idea addressed?
    return `considering the following answers, please give me an answer that takes into account what has already been mentioned.
  
  answer: To condense it all down to what I really want to do but also am wanting to make sure itâ€™s right for me too. Like I have soooo many ways I could go( launching a lifestyle blog-been on the back burner for three years! But no more procrastinating.)  Plus, am a widow with two young men still at home. I want to crystallize it all , still down to the most crucial, best of the best goals. Hope that helps!
  answer: I am my biggest challenge. Trying to learn technology and computer systems that I just don't understand. This gets me overwhelmed, full of anxiety which leads into migraines. It is extremely tough to keep motivating yourself when you are routinely stuck on systems you don't grasp the concepts of and on top of that, do not have guidance for.
  answer: Feeling completely beholden to my hourly, entry level job that I don't enjoy and dreaming of a way to work independently. I have no experience doing so and I thought writing would be a good idea because I am very talented at it and it seems like an area of independent employment that doesn't necessarily require a ton of experience, or at least it has an entry-level niche to get your start in. A lot of the other independent lines of work seemed to require massive amounts of experience and/or a college degree.
  answer: I broke my heel bone 8 weeks ago and I havenâ€™t been able to work at all. Iâ€™m staying with my mom. I thought my cast would come off today however it looks like 3 more weeks in a cast with my foot propped up up.  I need a job that will overlook the cast and hire me right away regardless of my foot.
  answer: Cost of living conservatively is beyond my wages even when working overtime. Everything including housing figures to a minimum living wage of $53.00 an hour, not the $14.00 that is a      dollar less per hour than I made in the same city. For the same kind of security officer job in 1986.
  answer: I need to find my own home asap so I can do things I want to do like go back to school work a few hrs a wk as Im disabled n cant work more than mayb 20 hrs a wk Im just stuck right now unable to move forward til I can get into my own home I am homeless at the moment.
  answer: Not having a job that meets my monthly bills. I am also in physical pain do to inflammation in my body which I am staring a, cleanse in about a week that may help as well as a change to my diet. I was a homeschool mother and homemaker. I co-owned a real estate appraisal business with my ex husband but mostly he ran it. My professional  skills are limited  because I dedicated  myself to the home.
  answer: Right now off work due to medical issues job not owning injury,; herniated disc, and spinal stenosis(limited due when I  return to the post office). Thinking about leaving job and opening homebase business.
  answer: Overcoming fear of making too much money to keep my subsidized housing before I can make enough money to live without it, which is what I want anyway. I desperately want to become financially independent.
  answer: I have many talents and things that i enjoy so I always get lost. I don't know which path is the right path and i fear that choosing the wrong one will not allow me to do any of them. But, I know that if I chose one and stuck to it I would be successful, so why can't I ever stick to just one thing?
  answer: My biggest present challenge is completing and finish all of the marketing collateral and assets I need.  This isnâ€™t my most important task, but it is the one that needs to be successfully completed first in order for me to start doing the things that will take me where I want to be in 2019.
  answer: I have a colonoscopy bag right now,but will be removed in approximately30 days.I also need to get my new laptop working on internet, which will happen next week.
  answer: Finding the right niche,and once I get my business off the ground finding the right employees to keep the business running so that I can expand and grow!!!
  answer: I put everyone before myself no matter what. Even if its something to advance myself,I'll stop what im doing to help whoever is asking me for help. I have a very hard time saying no because I feel selfish If I do.
  answer: Determining where to priorize and allocate my time. Torn between full time job, side job I want to be full time job, working towards an MBA`;
  }

  const AskBoldPromise = (params, typeQuestion, biggestDesireAnswer, biggestPainAnswer, humanDisireOptions) => {
    var prompt  = "";

    switch (typeQuestion) {
      case 1:
        prompt = generatePromptBoldPromiseBiggestDesire(params, humanDisireOptions)
        break;
      case 2:
        prompt = generatePromptBoldPromiseBiggestPain(params, biggestDesireAnswer)
        break;
      case 3:
        prompt = generatePromptBoldPromiseBiggestObjection(params, biggestDesireAnswer, biggestPainAnswer)
        break;
    }
    return prompt;
  }

  const generatePromptBoldPromiseBiggestDesire = (params, humanDisireOptions) => {
    //var question = `What is the biggest desire of A group of diabetic people. if I am selling some recipes to improve the life of a diabetic person, Through a website I sell the PDFs with the recipes. The answer must begin with an infinitive verb. Also, keep these basic desires in mind to prepare your answer: Care & Protection.`;
    var arrayHumanDesire = [ ];
    params.humanDesire.forEach((element, index) => {
      var humanDesire = humanDisireOptions.find((desire, ix) => desire.id == element);

      if  (humanDesire) {
        arrayHumanDesire.push(humanDesire.detail) 
      }
    })

    var question = `What is the biggest desire of ${params.questionWho.toLowerCase()}. if ${params.questionWhat.toLowerCase()}, ${params.questionHow.toLowerCase()}. The answer must begin with an infinitive verb. Also, keep these basic desires in mind to prepare your answer: ${arrayHumanDesire.join(", ")}`;
    console.log("QUESTION NO 1 *** =>>>>> "+question)
    return question;
  }

  const RemovePoint = (text) => {
    if ( (text.toLowerCase().length > 0) && ((text.length - 1) > 0) ){
      var point = text.substring(text.length - 1, text.length)
      
      if (point == '.') {
        text = text.substring(0, text.length - 1)
      }
    }
   
    return text;
  }

  const generatePromptBoldPromise = (params) => {
    var who = RemovePoint(params.questionWho.toLowerCase().trim());
    var what = RemovePoint(params.questionWhat.toLowerCase());
    var how = RemovePoint(params.questionHow.toLowerCase());
      
    var question = `Build three phrase like these ones: 
    How to find amazin property deals and grow your wealth without a lot of starting capital, even if you've struggled to get funding in the past.
    How to have clear and open communication with your teenager without the drama even if there's currently a lot of friction and Rebellious Behavior.
    How to be a confident leader and increase productivity without a lot of "ra ra ra!", even if you're struggling with massive staff turnover and low morale right now.
    For ${who}, if ${what}, through ${how}.
    
    
    `;
    return question;
  }

  const generatePromptBoldPromiseBiggestPain = (params, biggestDesireAnswer) => {
    //var question = "What is the biggest pain for A group of diabetic people if their biggest desire is To improve the care and protection of a group of diabetic people, offer recipes through a website in PDF format?. The answer must begin with Have."
    var question = `What is the biggest pain for ${params.questionWho.toLowerCase()} if their biggest desire is ${biggestDesireAnswer.toLowerCase()} offer ${params.questionHow.toLowerCase()}? The answer must begin with Have.`;
    console.log("QUESTION NO 2  *** =>>>>> "+question)
    return question
  }

  const generatePromptBoldPromiseBiggestObjection = (params, biggestDesireAnswer, biggestPainAnswer) => {
    // var question = "In one line What prevents you as A group of diabetic people To improve the care and protection of a group of diabetic people, offer recipes through a website in PDF format?"
    var question = `In one line What prevents you as ${params.questionWho.toLowerCase()} ${biggestDesireAnswer.toLowerCase()}, offer ${params.questionHow.toLowerCase()}? `;
    console.log("QUESTION NO 3 *** =>>>>> "+question)
    return question
  }

  export const chatOpenAiBoldPromise = async(params, typeQuestion, biggestDesireAnswer, biggestPainAnswer, humanDisireOptions) => {
    try {

      const completion = await openai.createCompletion({
        model: params.optionSelected,
        prompt: AskBoldPromise(params, typeQuestion, biggestDesireAnswer, biggestPainAnswer, humanDisireOptions),
        temperature: params.temperature,
        max_tokens: params.maxLength,
        top_p: params.topP,
        frequency_penalty: params.frecuencyPenalty,
        presence_penalty: params.presencePenalty,
        suffix: ""
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

  export const chatOpenAiBoldPromiseV2 = async(params) => {
    try {
      if (chatCompletion.includes(params.optionSelected)) {
        const completion = await openai.createChatCompletion({
          model: params.optionSelected,
          messages: [{role: "user", content: generatePromptBoldPromise(params)}],
        });
        return {
          response: completion.data.choices[0].message.content,
          total_tokens: completion.data.usage.total_tokens
        };
      } else {
        var question = generatePromptBoldPromise(params);
        console.log("<<<>>>>>>>>>>>>>>>>>>")
        console.log(question)
        console.log("<<<>>>>>>>>>>>>>>>>>>")
        const completion = await openai.createCompletion({
          model: params.optionSelected,
          prompt: question,
          temperature: params.temperature,
          max_tokens: 2048,
          top_p: params.topP,
          frequency_penalty: params.frecuencyPenalty,
          presence_penalty: params.presencePenalty,
          suffix: ""
        });
        console.log('************************************');
        console.log(completion.data);
        return {
          response: completion.data.choices[0].text,
          total_tokens: completion.data.usage.total_tokens
        };
      }
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }


  export const chatOpenAIFree = async(params, question) => {
    if (!configuration.apiKey) {
        alert("OpenAI API key not configured, please follow instructions in README.md")
        return;
    }
    
    try {
      if (chatCompletion.includes(params.optionSelected)) {
        const completion = await openai.createChatCompletion({
          model: params.optionSelected,
          messages: [{role: "user", content: `${question}
      
      
          `,}],
        });
        return {
          response: completion.data.choices[0].message.content,
          total_tokens: completion.data.usage.total_tokens
        };
      } else {
        const completion = await openai.createCompletion({
          model: params.optionSelected, //"text-davinci-002"
          // prompt: generatePromptWithSimpleQuestion(params),
          prompt: `${question}
      
      
          `,
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
      }
    } catch(error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }
  }
  
  
  const generatePromptWithSimpleQuestion = (params) => {
    var question = `${params.questions}
    
    
    `
    console.log("**********************")
    console.log(question)
    return question;
  }
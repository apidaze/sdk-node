const serve = require('./server');
const { ScriptBuilder, ScriptNodes } = require('../');
const {
  Record, Answer, Echo, Speak, Wait, Bind, BaseNode, Conference, Playback, Ringback
} = ScriptNodes;

const baseUrl = process.env.BASE_URL;
const wait = (duration, attrs = {}) => new Wait(duration, attrs);

const getIntroScriptContent = () => {
  const builder = new ScriptBuilder();
  const ringback = new Ringback(`${baseUrl}/intro.wav`);
  const answer = new Answer();
  const record = new Record({ name: 'example_recording' });
  const playback = new Playback(`${baseUrl}/intro.wav`);
  const speak = new Speak('This example script will show you some things you can do with our API.');
  const instructionSpeech = new Speak(
    'Press 1 for an example of text to speech, press 2 to enter an echo line to check voice latency or press 3 to enter a conference.',
    { 
      inputTimeout: 10000
    }
  );
  const bind1 = new Bind('1', { action: `${baseUrl}/step-1.xml` });
  const bind2 = new Bind('2', { action: `${baseUrl}/step-2.xml` });
  const bind3 = new Bind('3', { action: `${baseUrl}/step-3.xml` });

  instructionSpeech
    .add(bind1)
    .add(bind2)
    .add(bind3)

  const script = builder
    .add(ringback)
    .add(wait(2))
    .add(answer)
    .add(record)
    .add(wait(2))
    .add(playback)
    .add(speak)
    .add(wait(2))
    .add(instructionSpeech)
    .toString();

  return script;
};

const getStep1ScriptContent = () => {
  const builder = new ScriptBuilder();

  const speech1 = new Speak(`Our text to speech leverages Google's cloud APIs to offer the best possible solution`);
  const speech2 = new Speak('A wide variety of voices and languages are available. Here are just a few', { lang: 'en-AU', voice: 'male-a' });
  const speech3 = new Speak('Je peux parler français', { lang: 'fr-FR' });
  const speech4 = new Speak('Auch deutsch', { lang: 'de-DE' });
  const speech5 = new Speak('そして日本人ですら', { lang: 'ja-JP' });
  const speech6 = new Speak(`You can see our documentation for a full list of supported languages and voices for them.  We'll take you back to the menu for now.`);

  const script = builder
    .add(speech1)
    .add(wait(1))
    .add(speech2)
    .add(wait(1))
    .add(speech3)
    .add(wait(1))
    .add(speech4)
    .add(wait(1))
    .add(speech5)
    .add(wait(1))
    .add(speech6)
    .add(wait(2, { action: `${baseUrl}` }))
    .toString();

  return script;
};

const getStep2ScriptContent = () => {
  const builder = new ScriptBuilder();
  const speech = new Speak('You will now be joined to an echo line.');
  const echo = new Echo(500);
  
  const script = builder
    .add(speech)
    .add(echo)
    .toString();

  return script;
};

const getStep3ScriptContent = () => {
  const builder = new ScriptBuilder();
  const speech = new Speak('You will be entered into a conference call now. You can initiate more calls to join participants or hangup to leave.');
  const conference = new Conference('SDKTestConference');
  
  const script = builder
    .add(speech)
    .add(conference)
    .toString();

  return script;
};

(async () => {
  const routeHandlers = {
    '/': () => getIntroScriptContent(),
    '/step-1.xml': () => getStep1ScriptContent(),
    '/step-2.xml': () => getStep2ScriptContent(),
    '/step-3.xml': () => getStep3ScriptContent(),
  };

  serve(routeHandlers);
})();

const serve = require('./server');
const { ScriptBuilder, ScriptNodes } = require('../');
const { Dial, Hangup } = ScriptNodes;

const firstNumber = '12345678';
const secondNumber = '22345678';

const getScriptContent = (firstNumber, secondNumber) => {
  const builder = new ScriptBuilder();

  const dialNode = new Dial({
    strategy: 'sequence',
    timeout: 12
  });

  dialNode.addCalleeNode({ destination: firstNumber, targetType: 'number', attributes: { timeout: 6 } });
  dialNode.addCalleeNode({ destination: secondNumber, targetType: 'number', attributes: { timeout: 6 } });

  builder.add(dialNode);

  const hangupNode = new Hangup();
  builder.add(hangupNode);

  return builder.toString();
};

const routes = {
  '/': () => getScriptContent(firstNumber, secondNumber)
};

serve(routes);

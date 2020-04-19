const { ScriptBuilder, Dial } = require('../');

const firstNumber = '12345678';
const secondNumber = '22345678';

const getScriptContent = (firstNumber, secondNumber) => {
  const builder = new ScriptBuilder();

  const dialNode = new Dial({
    strategy: 'sequence',
    targetType: 'number',
    timeout: 12,
    destination: firstNumber
  });

  dialNode.addCalleeNode({ destination: secondNumber, targetType: 'number' });

  builder.add(dialNode);

  return builder.toString();
};

const output = getScriptContent(firstNumber, secondNumber);

console.log(output);

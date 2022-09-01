const axios = require('axios');

it('api pass', async () => {
  const response = await axios.get('http://localhost:63369/api/txs?a=0x00192fb10df37c9fb26829eb2cc623cd1bf599e8');
  expect(response.data.message).toBe('OK');
  expect(response.status).toEqual(200);
});

it('api field', async () => {
  const response = await axios.get('http://localhost:63369/api/txs?a=0x00192fb10df37c9fb26829eb2cc623cd1bf599e8');
  const expected = [
    'blockNumber',
    'timeStamp',
    'hash',
    'nonce',
    'blockHash',
    'transactionIndex',
    'from',
    'to',
    'value',
    'gas',
    'gasPrice',
    'isError',
    'txreceipt_status',
    'input',
    'contractAddress',
    'cumulativeGasUsed',
    'gasUsed',
    'confirmations',
    'methodId',
    'functionName',
  ];
  expect(Object.keys(response?.data?.result[0])).toEqual(expect.arrayContaining(expected));
});

it('Query multiple accounts ', async () => {
  const accountsArray = [
    '0xeB2a81e229b68c1c22B6683275C00945f9872D90',
    '0x7F101fE45e6649A6fB8F3F8B43ed03D353f2B90c',
    '0x45a36a8e118C37e4c47eF4Ab827A7C9e579E11E2',
  ];
  const statusCode = ['OK', 'OK', 'OK'];
  const requestArray = accountsArray.map((item) => axios.get(`http://localhost:63369/api/txs?a=${item}`));
  const responseArray = await Promise.all(requestArray);
  const fieldArray = responseArray.map((item) => item.data.message);
  expect(responseArray.length).toEqual(3);
  expect(fieldArray).toEqual(expect.arrayContaining(statusCode));
});

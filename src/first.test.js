//first.test.js
const axios = require('axios');
const qs = require('qs');

test('Test express. This create the user and tests his ballance.', async () => {
await axios.post(
      'https://api.findinamika.com/api/v1/Users',
      qs.stringify({
        login: '89041340559',
        role: 'passenger',
        start_balance: 100,
      })
    ).then(data=>{
    expect(data.status).toBe(200);
})

});


test('Test express. This check the user ballance.', async () => {
await axios.get(
      'https://api.findinamika.com/api/v1/wallet',
    {params:{
        login: '89041340559',
       }}
    )
    .then((data) => {
    data.data.data.balance.forEach((el)=>{
        if (el.asset_issuer_type == "currency"){
            console.log(el.balance)
          expect(el.balance).toBe(100);  
        }
    })
    
    });
});

//first.test.js
const axios = require('axios');
const qs = require('qs');
const faker = require('faker/locale/ru');

const phone = faker.phone.phoneNumber('89' + '#########').toString();

test('Test express. This create the user.', async () => {
  await axios
    .post(
      'https://api.findinamika.com/api/v1/Users',
      qs.stringify({
        login: `${phone}`,
        role: 'passenger',
        start_balance: 100,
      })
    )
    .then((data) => {
      expect(data.data).toEqual({
        success: true,
        data: {
          login: `${phone}`,
          role: 'passenger',
        },
      });
    });
}, 20000);

test('Test express. This try find user after create.', async () => {
  await axios
    .get(`https://api.findinamika.com/api/v1/users/${phone}`)
    .then((data) => {
      expect(data.data.data).toEqual({ login: `${phone}`, role: 'passenger' });
    });
});

test('Test express. This check the user ballance.', async () => {
  await axios
    .get('https://api.findinamika.com/api/v1/wallet', {
      params: {
        login: `${phone}`,
      },
    })
    .then((data) => {
      data.data.data.balance.forEach((el) => {
        if (el.asset_issuer_type == 'currency') {
          expect(el.balance).toBe(100);
        }
      });
    });
});

test('Test express. This delete the user.', async () => {
  await axios
    .delete('https://api.findinamika.com/api/v1/users', {
      params: {
        login: `${phone}`,
      },
    })
    .then((data) => {
      expect(data.data.success).toBe(true);
    });
});

test('Test express. This try find user after delete.', async () => {
  await axios
    .get(`https://api.findinamika.com/api/v1/users/${phone}`)
    .then((data) => {
      expect(data.data.data).not.toEqual({
        login: `${phone}`,
        role: 'passenger',
      });
    });
});

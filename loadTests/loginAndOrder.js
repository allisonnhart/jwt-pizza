import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '20s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_1 - https://pizza.allisonnhart.com/', function () {
    // Homepage
    response = http.get('https://pizza.allisonnhart.com/', {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'if-modified-since': 'Wed, 30 Oct 2024 22:56:49 GMT',
        'if-none-match': '"cea4b585313ca3f44bcd9ecb7c61e7b4"',
        priority: 'u=0, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(18.7)

    const vars = {};

    // Login
    response = http.put(
      'https://pizza-service.allisonnhart.com/api/auth',
      '{"email":"d@jwt.com","password":"diner"}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.allisonnhart.com',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }

    let token = jsonpath.query(response.json(), '$.token')[0];

    sleep(4)

    // Get Menu
    response = http.get('https://pizza-service.allisonnhart.com/api/order/menu', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
        origin: 'https://pizza.allisonnhart.com',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })

    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Getting menu was *not* 200');
    }

    // Get Franchise
    response = http.get('https://pizza-service.allisonnhart.com/api/franchise', {
      headers: {
        accept: '*/*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        origin: 'https://pizza.allisonnhart.com',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
    })
    sleep(8)

    // Purchase Pizza
    response = http.post(
      'https://pizza-service.allisonnhart.com/api/order',
      '{"items":[{"menuId":2,"description":"Pepperoni","price":0.0042}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.allisonnhart.com',
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
      }
    )
    sleep(1.6)

    // Verify Pizza
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      //'{"jwt":"eyJpYXQiOjE3MzM5ODM3NDIsImV4cCI6MTczNDA3MDE0MiwiaXNzIjoiY3MzMjkuY2xpY2siLCJhbGciOiJSUzI1NiIsImtpZCI6IjE0bk5YT21jaWt6emlWZWNIcWE1UmMzOENPM1BVSmJuT2MzazJJdEtDZlEifQ.eyJ2ZW5kb3IiOnsiaWQiOiJhbGxpaGFyMiIsIm5hbWUiOiJBbGxpc29uIEhhcnQifSwiZGluZXIiOnsiaWQiOjM2LCJuYW1lIjoicGl6emEgZGluZXIiLCJlbWFpbCI6ImRAand0LmNvbSJ9LCJvcmRlciI6eyJpdGVtcyI6W3sibWVudUlkIjoyLCJkZXNjcmlwdGlvbiI6IlBlcHBlcm9uaSIsInByaWNlIjowLjAwNDJ9XSwic3RvcmVJZCI6IjEiLCJmcmFuY2hpc2VJZCI6MSwiaWQiOjEzOH19.Ira25EK0tfmnrQLL16Y-ditTjpsVNnwGc35Q9JGkCoboJoaCgSmj5bV7VcXp-fVF-KOzwS0eaFHRfCmN6V397MBbB6e_9YuOtvd-WzxHJWJqnvkUMvFsZMui6NFUnocO1hr4PbbSbvcPJHs4RuSLAqSeCJOhG7JowoRWAmueomKLCMVlgFctNrToyOr7dK-cMEtvvnfH9Spk1wUhKsTTnsGiKonA7OwbFuZYUEjIFM68-s010Bf3f-4WJVu2dSYjq0SG59HId3YXja0RIZfIvzl_Z_MvlNcDzzLbo-5Zu5MamrYVZLmVvrJFib_xZGUZQEIMKav_-eSRdf_93iO3ndapJSdicf71l1srQ5RIQJcLSwE7PP-SwUtoTCgwPEUs-ai5pRkv7fsb3iqSTNWhkvOBPW-Ig_FpX2S8XxI-d0F9ISmGS0NZQ2lZSTqiSm9dFikLwq1abLh-EAs_-5AwVPv4b9VV2r-DtqRXb1u6vw1RsyQ9Hm_ROBZ-3R9zPNxAbCVxtKhnbOpTMl7CkjRHPGdTDUD4mzbzp-1vCn1uzB5-_fYlOAmvGrBvAJOA3JhYOdz8pqaNbIlO35hqrBbirc7mwca9SEsMu0TBk08T7yYNyN8pvynX8NkbBZn-7u3DLekLQq9fyF2SJCQmlDV-4qco9lTzsWvxzBJGJnFev5E"}',
      JSON.stringify(token),
      {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          origin: 'https://pizza.allisonnhart.com',
          authorization: `Bearer ${token}`,
          priority: 'u=1, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
        },
      }
    )

    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Verifying pizza was *not* 200');
    }

  })
}


curl -X POST http://10.13.13.1.sslip.io/loki/api/v1/push \
-H "Content-Type: application/json" \
-d '{
  "streams": [
    {
      "stream": {
        "job": "example111"
      },
      "values": [
        ["1724147451000000001", "log message here"]
      ]
    }
  ]
}'

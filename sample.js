{
  'version': '1.0',
    'timestamp': '2023-02-18T13:30:16.997Z',
      'requestContext':
  {
    'requestId': 'fb0827b8-d913-4211-b11f-e6a9a5a1ce00',
      'functionArn': 'arn:aws:lambda:ap-northeast-1:544160245808:function:bccapp_inference:$LATEST',
        'condition': 'Success', 'approximateInvokeCount': 1
  }, 'requestPayload':
  {
    'Records': [
      {
        'eventVersion': '2.1',
        'eventSource': 'aws:s3',
        'awsRegion': 'ap-northeast-1',
        'eventTime': '2023-02-18T13:29:49.467Z',
        'eventName': 'ObjectCreated:Put',
        'userIdentity':
        {
          'principalId': 'AWS:AROAX5MT2NAYNKRD5D2OS:CognitoIdentityCredentials'
        },
        'requestParameters': {
          'sourceIPAddress': '60.237.73.37'
        },
        'responseElements': {
          'x-amz-request-id': 'WY1QBP163P1GMZYA',
          'x-amz-id-2': 'MrthNCy7DcH2ESCgCUjAxc7poMkjHLsJcyd59YbkP7sdH7L7/KyY5kp9T4kyTeflN/O/C4P1KgcSoGtgNdRQln3kduOVlr14'
        },
        's3': {
          's3SchemaVersion': '1.0',
          'configurationId': '3c25e00c-bb91-47b1-ae4a-8494a84ac1b9',
          'bucket':
          {
            'name': 'bcc-app-storage-dev150346-dev',
            'ownerIdentity':
            {
              'principalId': 'A2L04RDRIAQIRF'
            },
            'arn': 'arn:aws:s3:::bcc-app-storage-dev150346-dev'
          },
          'object': {
            'key': 'private/ap-northeast-1%3A6e668031-0cd7-47e7-b1cb-410507b2114f/debug-490K_1676726988433.jpg',
            'size': 489986,
            'eTag': 'ed4f8e51e814af0279f2fa93a9e97d04',
            'sequencer': '0063F0D2CD5EE325FE'
          }
        }
      }]
  },
  'responseContext':
  {
    'statusCode': 200,
      'executedVersion': '$LATEST'
  },
  'responsePayload':
  {
    'statusCode': 200,
      'body': 'success'
  }
}

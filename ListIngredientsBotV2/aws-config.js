// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
var aws_app_analytics = 'enable';
var aws_bots = 'enable';
var aws_bots_config = [{"name":"ListIngredientsBot","alias":"$LATEST","description":"","bot-template":"bot-import","commands-help":[],"region":"eu-west-1"}];
var aws_cognito_identity_pool_id = 'eu-west-1:b763048b-dec0-4e71-bf1d-d18e38ba7223';
var aws_cognito_region = 'eu-west-1';
var aws_content_delivery = 'enable';
var aws_content_delivery_bucket = 'test-hosting-mobilehub-281568956';
var aws_content_delivery_bucket_region = 'eu-west-1';
var aws_content_delivery_cloudfront = 'enable';
var aws_content_delivery_cloudfront_domain = 'dnpak9vjf529m.cloudfront.net';
var aws_mobile_analytics_app_id = 'e3768511993844bea1a4613d1937bbc4';
var aws_mobile_analytics_app_region = 'us-east-1';
var aws_project_id = 'e5472131-4479-40ac-8bb3-96cec2066e4d';
var aws_project_name = 'Test';
var aws_project_region = 'eu-west-1';
var aws_resource_name_prefix = 'test-mobilehub-281568956';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
  });
AWS.config.update({customUserAgent: 'MobileHub v0.1'});

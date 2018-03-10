# Amazon Lex: How It Works

For the commands: In Unix, macOS Change $LATEST to ^\\$LATEST, '^' to '\\'



Amazon Lex enables you to build applications using a speech or text interface powered by the same technology that powers Amazon Alexa. Following are the typical steps you perform when working with Amazon Lex:

1. Create a bot and configure it with one or more intents that you want to support. Configure the bot so it understands the user's goal (intent), engages in conversation with the user to elicit information, and fulfills the user's intent.
2. Test the bot. You can use the test window client provided by the Amazon Lex console.
3. Publish a version and create an alias.
4. Deploy the bot. You can deploy the bot on platforms such as mobile applications or messaging platforms such as Facebook Messenger.

Before you get started, familiarize yourself with the following Amazon Lex core concepts and terminology:

- **Bot** – A bot performs automated tasks such as ordering a pizza, booking a hotel, ordering flowers, and so on. An Amazon Lex bot is powered by Automatic Speech Recognition (ASR) and Natural Language Understanding (NLU) capabilities, the same technology that powers Amazon Alexa.

   

  Amazon Lex bots can understand user input provided with text or speech and converse in natural language. You can create Lambda functions and add them as code hooks in your intent configuration to perform user data validation and fulfillment tasks.

   

- **Intent** – An intent represents an action that the user wants to perform. You create a bot to support one or more related intents. For example, you might create a bot that orders pizza and drinks. For each intent, you provide the following required information:

   

  - **Intent name**– A descriptive name for the intent. For example, **OrderPizza**.

  - **Sample utterances** – How a user might convey the intent. For example, a user might say "Can I order a pizza please" or "I want to order a pizza".

  - **How to fulfill the intent** – How you want to fulfill the intent after the user provides the necessary information (for example, place order with a local pizza shop). We recommend that you create a Lambda function to fulfill the intent.

     

    You can optionally configure the intent so Amazon Lex simply returns the information back to the client application to do the necessary fulfillment.

     

  In addition to custom intents such as ordering a pizza, Amazon Lex also provides built-in intents to quickly set up your bot. For more information, see [Built-in Intents and Slot Types](https://docs.aws.amazon.com/lex/latest/dg/howitworks-builtins.html).

   

- **Slot** – An intent can require zero or more slots or parameters. You add slots as part of the intent configuration. At runtime, Amazon Lex prompts the user for specific slot values. The user must provide values for all *required* slots before Amazon Lex can fulfill the intent.

   

  For example, the `OrderPizza` intent requires slots such as pizza size, crust type, and number of pizzas. In the intent configuration, you add these slots. For each slot, you provide slot type and a prompt for Amazon Lex to send to the client to elicit data from the user. A user can reply with a slot value that includes additional words, such as "large pizza please" or "let's stick with small." Amazon Lex can still understand the intended slot value.

   

- **Slot type** – Each slot has a type. You can create your custom slot types or use built-in slot types. For example, you might create and use the following slot types for the `OrderPizza`intent:

   

  - Size – With enumeration values `Small`, `Medium`, and `Large`.
  - Crust – With enumeration values `Thick` and `Thin`.

   

  Amazon Lex also provides built-in slot types. For example, `AMAZON.NUMBER` is a built-in slot type that you can use for the number of pizzas ordered. For more information, see [Built-in Intents and Slot Types](https://docs.aws.amazon.com/lex/latest/dg/howitworks-builtins.html).

The following topics provide additional information. We recommend that you review them in order and then explore the [Getting Started with Amazon Lex](https://docs.aws.amazon.com/lex/latest/dg/getting-started.html) exercises.

**Topics**

- [Programming Model](https://docs.aws.amazon.com/lex/latest/dg/programming-model.html)
- [Service Permissions](https://docs.aws.amazon.com/lex/latest/dg/howitworks-service-permissions.html)
- [Managing Messages](https://docs.aws.amazon.com/lex/latest/dg/howitworks-manage-prompts.html)
- [Managing Conversation Context](https://docs.aws.amazon.com/lex/latest/dg/context-mgmt.html)
- [Bot Deployment Options](https://docs.aws.amazon.com/lex/latest/dg/chatbot-service.html)
- [Built-in Intents and Slot Types](https://docs.aws.amazon.com/lex/latest/dg/howitworks-builtins.html)
- [Custom Slot Types](https://docs.aws.amazon.com/lex/latest/dg/howitworks-custom-slots.html)

# Programming Model

A *bot* is the primary resource type in Amazon Lex. The other resource types in Amazon Lex are *intent*, *slot type*, *alias*, and *bot channel association*.

You create a bot using the Amazon Lex console or the model building API. The console provides a graphical user interface that you use to build a production-ready bot for your application. If you prefer, you can use the model building API through the AWS CLI or your own custom program to create a bot.

After you create a bot, you deploy it on one of the [supported platforms](http://docs.aws.amazon.com/lex/latest/dg/chatbot-service.html) or integrate it into your own application. When a user interacts with the bot, the client application sends requests to the bot using the Amazon Lex runtime API. For example, when a user says "I want to order pizza," your client sends this input to Amazon Lex using one of the runtime API operations. Users can provide input as speech or text.

You can also create Lambda functions and use them in an intent. Use these Lambda function code hooks to perform runtime activities such as initialization, validation of user input, and intent fulfillment. The following sections provide additional information.

**Topics**

- [Model Building API Operations](https://docs.aws.amazon.com/lex/latest/dg/programming-model.html#programming-model-build-time-api)
- [Runtime API Operations](https://docs.aws.amazon.com/lex/latest/dg/programming-model.html#programming-model-runtime-api)
- [Lambda Functions As Code Hooks](https://docs.aws.amazon.com/lex/latest/dg/programming-model.html#prog-model-lambda)

## Model Building API Operations

To programmatically create bots, intents, and slot types, use the model building API operations. You can also use the model building API to manage, update, and delete resources for your bot. The model building API operations include:

- [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html), [PutBotAlias](https://docs.aws.amazon.com/lex/latest/dg/API_PutBotAlias.html), [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html), and [PutSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_PutSlotType.html) to create and update bots, bot aliases, intents, and slot types, respectively.
- [CreateBotVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateBotVersion.html), [CreateIntentVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateIntentVersion.html), and [CreateSlotTypeVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateSlotTypeVersion.html) to create and publish versions of your bots, intents, and slot types, respectively.
- [GetBot](https://docs.aws.amazon.com/lex/latest/dg/API_GetBot.html) and [GetBots](https://docs.aws.amazon.com/lex/latest/dg/API_GetBots.html) to get a specific bot or a list of bots that you have created, respectively.
- [GetIntent](https://docs.aws.amazon.com/lex/latest/dg/API_GetIntent.html) and [GetIntents](https://docs.aws.amazon.com/lex/latest/dg/API_GetIntents.html) to get a specific intent or a list of intents that you have created, respectively.
- [GetSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_GetSlotType.html) and [GetSlotTypes](https://docs.aws.amazon.com/lex/latest/dg/API_GetSlotTypes.html) to get a specific slot type or a list of slot types that you have created, respectively.
- [GetBuiltinIntent](https://docs.aws.amazon.com/lex/latest/dg/API_GetBuiltinIntent.html), [GetBuiltinIntents](https://docs.aws.amazon.com/lex/latest/dg/API_GetBuiltinIntents.html), and [GetBuiltinSlotTypes](https://docs.aws.amazon.com/lex/latest/dg/API_GetBuiltinSlotTypes.html) to get an Amazon Lex built-in intent, a list of Amazon Lex built-in intents, or a list of built-in slot types that you can use in your bot, respectively.
- [GetBotChannelAssociation](https://docs.aws.amazon.com/lex/latest/dg/API_GetBotChannelAssociation.html) and [GetBotChannelAssociations](https://docs.aws.amazon.com/lex/latest/dg/API_GetBotChannelAssociations.html) to get an association between your bot and a messaging platform or a list of the associations between your bot and messaging platforms, respectively.
- [DeleteBot](https://docs.aws.amazon.com/lex/latest/dg/API_DeleteBot.html), [DeleteBotAlias](https://docs.aws.amazon.com/lex/latest/dg/API_DeleteBotAlias.html), [DeleteBotChannelAssociation](https://docs.aws.amazon.com/lex/latest/dg/API_DeleteBotChannelAssociation.html), [DeleteIntent](https://docs.aws.amazon.com/lex/latest/dg/API_DeleteIntent.html), and [DeleteSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_DeleteSlotType.html)to remove unneeded resources in your account.

You can use the model building API to create custom tools to manage your Amazon Lex resources. For example, there is a limit of 100 versions each for bots, intents, and slot types. You could use the model building API to build a tool that automatically deletes old versions when your bot nears the limit.

To make sure that only one operation updates a resource at a time, Amazon Lex uses checksums. When you use a `Put` API operation—[PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html), [PutBotAlias](https://docs.aws.amazon.com/lex/latest/dg/API_PutBotAlias.html) [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html), or [PutSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_PutSlotType.html)—to update a resource, you must pass the current checksum of the resource in the request. If two tools try to update a resource at the same time, they both provide the same current checksum. The first request to reach Amazon Lex matches the current checksum of the resource. By the time that the second request arrives, the checksum is different. The second tool receives a `PreconditionFailedException` exception and the update terminates.

The `Get` operations—[GetBot](https://docs.aws.amazon.com/lex/latest/dg/API_GetBot.html), [GetIntent](https://docs.aws.amazon.com/lex/latest/dg/API_GetIntent.html), and [GetSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_GetSlotType.html)—are eventually consistent. If you use a `Get` operation immediately after you create or modify a resource with one of the `Put`operations, the changes might not be returned. After a `Get` operation returns the most recent update, it always returns that updated resource until the resource is modified again. You can determine if an updated resource has been returned by looking at the checksum.

## Runtime API Operations

Client applications use the following runtime API operations to communicate with Amazon Lex:

- [PostContent](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostContent.html) – Takes speech or text input and returns intent information and a text or speech message to convey to the user. Currently, Amazon Lex supports the following audio formats:

   

  Input audio formats – LPCM and Opus

  Output audio formats – MPEG, OGG, and PCM

   

  The `PostContent` operation supports audio input at 8 kHz and 16 kHz. Applications where the end user speaks with Amazon Lex over the telephone, such as an automated call center, can pass 8 kHz audio directly.

   

- [PostText](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostText.html) – Takes text as input and returns intent information and a text message to convey to the user.

Your client application uses the runtime API to call a specific Amazon Lex bot to process utterances — user text or voice input. For example, suppose that a user says "I want pizza." The client sends this user input to a bot using one of the Amazon Lex runtime API operations. From the user input, Amazon Lex recognizes that the user request is for the `OrderPizza` intent defined in the bot. Amazon Lex engages the user in a conversation to gather the required information, or slot data, such as pizza size, toppings, and number of pizzas. After the user provides all of the necessary slot data, Amazon Lex either invokes the Lambda function code hook to fulfill the intent, or returns the intent data to the client, depending on how the intent is configured.

Use the [PostContent](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostContent.html) operation when your bot uses speech input. For example, an automated call center application can send speech to an Amazon Lex bot instead of an agent to address customer inquiries. You can use the 8 kHz audio format to send audio directly from the telephone to Amazon Lex.

The test window in the Amazon Lex console uses the [PostContent](https://docs.aws.amazon.com/lex/latest/dg/API_runtime_PostContent.html) API to send text and speech requests to Amazon Lex. You use this test window in the [Getting Started with Amazon Lex](https://docs.aws.amazon.com/lex/latest/dg/getting-started.html)exercises.

## Lambda Functions As Code Hooks

You can configure your Amazon Lex bot to invoke a Lambda function as a code hook. The code hook can serve multiple purposes:

- Customizes the user interaction—For example, when Joe asks for available pizza toppings, you can use prior knowledge of Joe's choices to display a subset of toppings.
- Validates the user's input—Suppose that Jen wants to pick up flowers after hours. You can validate the time that Jen input and send an appropriate response.
- Fulfills the user's intent—After Joe provides all of the information for his pizza order, Amazon Lex can invoke a Lambda function to place the order with a local pizzeria.

When you configure an intent, you specify Lambda functions as code hooks in the following places:

- Dialog code hook for initialization and validation—This Lambda function is invoked on each user input, assuming Amazon Lex understood the user intent.
- Fulfillment code hook—This Lambda function is invoked after the user provides all of the slot data required to fulfill the intent.

You choose the intent and set the code hooks in the Amazon Lex console, as shown in the following screen shot:

![                    The Amazon Lex console showing Lambda function code hooks.                ](https://docs.aws.amazon.com/lex/latest/dg/images/how-works-10.png)

You can also set the code hooks using the `dialogCodeHook` and `fulfillmentActivity` fields in the [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html) operation.

One Lambda function can perform initialization, validation, and fulfillment. The event data that the Lambda function receives has a field that identifies the caller as either a dialog or fulfillment code hook. You can use this information to execute the appropriate portion of your code.

You can use a Lambda function to build a bot that can navigate complex dialogs. You use the `dialogAction` field in the Lambda function response to direct Amazon Lex to take specific actions. For example, you can use the `ElicitSlot` dialog action to tell Amazon Lex to ask the user for a slot value that isn't required. You can use the `ElicitIntent` dialog action to elicit a new intent when the user is finished with the previous one.

For more information, see [Using Lambda Functions](https://docs.aws.amazon.com/lex/latest/dg/using-lambda.html).



# Service Permissions

Amazon Lex uses AWS Identity and Access Management (IAM)[ service-linked roles](https://docs.aws.amazon.com/console/iam/service-linked-role). Amazon Lex assumes these roles to call AWS services on behalf of your bots and bot channels. The roles exist within your account, but are linked to Amazon Lex use cases and have predefined permissions. Only Amazon Lex can assume these roles, and you can't modify their permissions. You can delete them after deleting their related resources using IAM. This protects your Amazon Lex resources because you can't inadvertently remove necessary permissions.

Amazon Lex uses two IAM service-linked roles:

- **AWSServiceRoleForLexBots**—Amazon Lex uses this service-linked role to invoke Amazon Polly to synthesize speech responses for your bot.
- **AWSServiceRoleForLexChannels**—Amazon Lex uses this service-linked role to post text to your bot when managing channels.

You don't need to manually create either of these roles. When you create your first bot using the console, Amazon Lex creates the **AWSServiceRoleForLexBots** role for you. When you first associate a bot with a messaging channel, Amazon Lex creates the **AWSServiceRoleForLexChannels** role for you.

## Creating Resource-Based Policies for AWS Lambda

When invoking Lambda functions, Amazon Lex uses resource-based policies. A *resource-based policy* is attached to a resource; it lets you specify who has access to the resource and which actions they can perform on it. This enables you to narrowly scope permissions between Lambda functions and the intents that you have created. It also allows you to see those permissions in a single policy when you manage Lambda functions that have many event sources.

For more information, see [Using Resource-Based Polices for AWS Lambda (Lambda Function Policies)](http://docs.aws.amazon.com/lambda/latest/dg/access-control-resource-based.html) in the *AWS Lambda Developer Guide*.

To create resource-based policies for intents that you associate with a Lambda function, you can use the Amazon Lex console. Or, you can use the AWS command line interface (AWS CLI). In the AWS CLI, use the Lambda [AddPermisssion](http://docs.aws.amazon.com/lambda/latest/dg/API_AddPermission.html) API with the `Principal` field set to`lex.amazonaws.com` and the `SourceArn` set to the ARN of the intent that is allowed to invoke the function.

## Deleting Service-Linked Roles

You can use the IAM console, the IAM CLI, or the IAM API to delete the`AWSServiceRoleForLexBots` and `AWSServiceRoleForLexChannels` service-linked roles. For more information, see [Deleting a Service-Linked Role](http://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html#delete-service-linked-role) in the *IAM User Guide*.

#  Getting Started (AWS CLI)

In this step, you use the AWS CLI to create, test, and modify an Amazon Lex bot. To complete these exercises, you need to be familiar with using the CLI and have a text editor. For more information, see [Step 2: Set Up the AWS Command Line Interface](https://docs.aws.amazon.com/lex/latest/dg/gs-set-up-cli.html)

- Exercise 1 — Create and test an Amazon Lex bot. The exercise provides all of the JSON objects that you need to create a custom slot type, an intent, and a bot. For more information, see [Amazon Lex: How It Works](https://docs.aws.amazon.com/lex/latest/dg/how-it-works.html)
- Exercise 2 — Update the bot that you created in Exercise 1 to add an additional sample utterance. Amazon Lex uses sample utterances to build the machine learning model for your bot.
- Exercise 3 — Update the bot that you created in Exercise 1 to add a Lambda function to validate user input and to fulfill the intent.
- Exercise 4 — Publish a version of the slot type, intent, and bot resources that you created in Exercise 1. A version is a snapshot of a resource that can't be changed.
- Exercise 5 — Create an alias for the bot that you created in Exercise 1.
- Exercise 6 — Clean up your account by deleting the slot type, intent, and bot that you created in Exercise 1, and the alias that you created in Exercise 5.



# Create an Amazon Lex Bot (AWS CLI)

In general, when you create bots, you:

1. Create slot types to define the information that your bot will be working with.
2. Create intents that define the user actions that your bot supports. Use the custom slot types that you created earlier to define the slots, or parameters, that your intent requires.
3. Create a bot that uses the intents that you defined.

In this exercise you create and test a new Amazon Lex bot using the CLI. Use the JSON structures that we provide to create the bot. To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

# Create a Service-Linked Role (AWS CLI)

Amazon Lex assumes AWS Identity and Access Management service-linked roles to call AWS services on behalf of your bots. The roles, which are in your account, are linked to Amazon Lex use cases and have predefined permissions. For more information, see [Service Permissions](https://docs.aws.amazon.com/lex/latest/dg/howitworks-service-permissions.html).

If you've already created an Amazon Lex bot using the console, the service-linked role was created automatically. Skip to [Step 2: Create a Custom Slot Type (AWS CLI)](https://docs.aws.amazon.com/lex/latest/dg/gs-create-flower-types.html).

**To create a service-linked role (AWS CLI)**

1. In the AWS CLI, type the following command:

   ```
   aws iam create-service-linked-role --aws-service-name lex.amazonaws.com
   ```

2. Check the policy using the following command:

   ```
   aws iam get-role --role-name AWSServiceRoleForLexBots
   ```

   The response is:

   ```
   {
       "Role": {
           "AssumeRolePolicyDocument": {
               "Version": "2012-10-17", 
               "Statement": [
                   {
                       "Action": "sts:AssumeRole", 
                       "Effect": "Allow", 
                       "Principal": {
                           "Service": "lex.amazonaws.com"
                       }
                   }
               ]
           },
           "RoleName": "AWSServiceRoleForLexBots", 
           "Path": "/aws-service-role/lex.amazonaws.com/", 
           "Arn": "arn:aws:iam::account-id:role/aws-service-role/lex.amazonaws.com/AWSServiceRoleForLexBots"
   }
   ```

# Create a Custom Slot Type (AWS CLI)

Create a custom slot type with enumeration values for the flowers that can be ordered. You use this type in the next step when you create the `OrderFlowers` intent. A *slot type* defines the possible values for a slot, or parameter, of the intent.

To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

**To create a custom slot type (AWS CLI)**

1. Create a text file named **FlowerTypes.json**. Copy the JSON code from [FlowerTypes.json](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-create-flower-types-json.html)into the text file.



Call the [PutSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_PutSlotType.html) operation using the AWS CLI to create the slot type. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models put-slot-type ^
    --region eu-west-1 ^
    --name FlowerTypes ^
    --cli-input-json file://FlowerTypes2.json
```



```
aws lex-models put-intent ^
   --region eu-west-1 ^
   --name OrderFlowers ^
   --cli-input-json file://OrderFlowers.json
```



In the AWS CLI, call the [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html) operation to create the bot. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models put-bot ^
    --region eu-west-1 ^
    --name OrderFlowersBot ^
    --cli-input-json file://OrderFlowersBot.json
```

To determine if your new bot is ready for use, run the following command. Repeat this command until the `status` field returns `READY`. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models get-bot ^
    --region eu-west-1 ^
    --name OrderFlowersBot ^
    --version-or-alias "$LATEST"
```

Look for the `status` field in the response:

```
{
    "status": "READY", 
    
    ...
    
}
```

# Create an Intent (AWS CLI)

Create an intent for the `OrderFlowersBot` bot and provide three slots, or parameters. The slots allow the bot to fulfill the intent:

- `FlowerType` is a custom slot type that specifies which types of flowers can be ordered.
- `AMAZON.DATE` and `AMAZON.TIME` are built-in slot types used for getting the date and time to deliver the flowers from the user.

To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

**To create the OrderFlowers intent (AWS CLI)**

1. Create a text file named **OrderFlowers.json**. Copy the JSON code from [OrderFlowers.json](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-create-order-flowers-json.html)into the text file.

2. In the AWS CLI, call the [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html) operation to create the intent. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (\) Unix continuation character at the end of each line with a caret (^).

   ```
   aws lex-models put-intent \
      --region region \
      --name OrderFlowers \
      --cli-input-json file://OrderFlowers.json
   ```

   The server responds with the following:

   ```
   {
       "confirmationPrompt": {
           "maxAttempts": 2, 
           "messages": [
               {
                   "content": "Okay, your {FlowerType} will be ready for pickup by {PickupTime} on {PickupDate}.  Does this sound okay?", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "name": "OrderFlowers", 
       "checksum": "checksum", 
       "version": "$LATEST", 
       "rejectionStatement": {
           "messages": [
               {
                   "content": "Okay, I will not place your order.", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "createdDate": timestamp, 
       "lastUpdatedDate": timestamp, 
       "sampleUtterances": [
           "I would like to pick up flowers", 
           "I would like to order some flowers"
       ], 
       "slots": [
           {
               "slotType": "AMAZON.TIME", 
               "name": "PickupTime", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "Pick up the {FlowerType} at what time on {PickupDate}?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 3, 
               "description": "The time to pick up the flowers"
           }, 
           {
               "slotType": "FlowerTypes", 
               "name": "FlowerType", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "What type of flowers would you like to order?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 1, 
               "slotTypeVersion": "$LATEST", 
               "sampleUtterances": [
                   "I would like to order {FlowerType}"
               ], 
               "description": "The type of flowers to pick up"
           }, 
           {
               "slotType": "AMAZON.DATE", 
               "name": "PickupDate", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "What day do you want the {FlowerType} to be picked up?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 2, 
               "description": "The date to pick up the flowers"
           }
       ], 
       "fulfillmentActivity": {
           "type": "ReturnIntent"
       }, 
       "description": "Intent to order a bouquet of flowers for pick up"
   }
   ```

# Create a Bot (AWS CLI)

The `OrderFlowersBot` bot has one intent, the `OrderFlowers` intent that you created in the previous step. To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

Note

The following AWS CLI example is formatted for Unix, Linux, and macOS. For Windows, change `"\$LATEST"` to `$LATEST`.

**To create the OrderFlowersBot bot (AWS CLI)**

1. Create a text file named **OrderFlowersBot.json**. Copy the JSON code from [OrderFlowersBot.json](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-create-order-flowers-bot-json.html) into the text file.

2. In the AWS CLI, call the [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html) operation to create the bot. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (\) Unix continuation character at the end of each line with a caret (^).

   ```
   aws lex-models put-bot \
       --region region \
       --name OrderFlowersBot \
       --cli-input-json file://OrderFlowersBot.json
   ```

   The response from the server follows. When you create or update bot, the `status` field is set to `BUILDING`. This indicates that the bot isn't ready to use. To determine when the bot is ready for use, use the [GetBot](https://docs.aws.amazon.com/lex/latest/dg/API_GetBot.html) operation in the next step .

   ```
   {
       "status": "BUILDING", 
       "intents": [
           {
               "intentVersion": "$LATEST", 
               "intentName": "OrderFlowers"
           }
       ], 
       "name": "OrderFlowersBot", 
       "locale": "en-US", 
       "checksum": "checksum", 
       "abortStatement": {
           "messages": [
               {
                   "content": "Sorry, I'm not able to assist at this time", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "version": "$LATEST", 
       "lastUpdatedDate": timestamp, 
       "createdDate": timestamp, 
       "clarificationPrompt": {
           "maxAttempts": 2, 
           "messages": [
               {
                   "content": "I didn't understand you, what would you like to do?", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "voiceId": "Salli", 
       "childDirected": false, 
       "idleSessionTTLInSeconds": 600, 
       "processBehavior": "BUILD",
       "description": "Bot to order flowers on the behalf of a user"
   }

   ```

3. To determine if your new bot is ready for use, run the following command. Repeat this command until the `status` field returns `READY`. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (\) Unix continuation character at the end of each line with a caret (^).

   ```
   aws lex-models get-bot \
       --region region \
       --name OrderFlowersBot \
       --version-or-alias "\$LATEST"
   ```

   Look for the `status` field in the response:

   ```
   {
       "status": "READY", 
       
       ...
       
   }

   ```



###Test text service

**To use text to test the bot (AWS CLI)**

1. In the AWS CLI, start a conversation with the `OrderFlowersBot` bot. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

   ```
   aws lex-runtime post-text ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --input-text "i would like to order flowers"
   ```

   Amazon Lex recognizes the user's intent and starts a conversation by returning the following response:

   ```
   {
       "slotToElicit": "FlowerType", 
       "slots": {
           "PickupDate": null, 
           "PickupTime": null, 
           "FlowerType": null
       }, 
       "dialogState": "ElicitSlot", 
       "message": "What type of flowers would you like to order?", 
       "intentName": "OrderFlowers"
   }
   ```

2. Run the following commands to finish the conversation with the bot.

   ```
   aws lex-runtime post-text ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --input-text "roses"
   ```

   ```
   aws lex-runtime post-text  ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --input-text "tuesday"
   ```

   ```
   aws lex-runtime post-text  ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --input-text "10:00 a.m."
   ```

   ```
   aws lex-runtime post-text  ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --input-text "yes"
   ```

   After you confirm the order, Amazon Lex

    sends a fulfillment response to complete the conversation:

   ```
   {
       "slots": {
           "PickupDate": "2017-05-16", 
           "PickupTime": "10:00", 
           "FlowerType": "roses"
       }, 
       "dialogState": "ReadyForFulfillment", 
       "intentName": "OrderFlowers"
   }
   ```

### Test speech service

**To use a speech input to test the bot (AWS CLI)**

1. In the AWS CLI, create an audio file using Amazon Polly. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (\\) Unix continuation character at the end of each line with a caret (^).

   ```
   aws polly synthesize-speech ^
       --region eu-west-1 ^
       --output-format pcm ^
       --text "i would like to order flowers" ^
       --voice-id "Kendra" ^
       IntentSpeech.mpg
   ```

2. To send the audio file to Amazon Lex, run the following command. Amazon Lex saves the audio from the response in the specified output file.

   ```
   aws lex-runtime post-content ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --content-type "audio/l16; rate=16000; channels=1" ^
       --input-stream IntentSpeech.mpg ^
       IntentOutputSpeech.mpg
   ```

   Amazon Lex responds with a request for the first slot. It saves the audio response in the specified output file.

   ```
   {
       "contentType": "audio/mpeg", 
       "slotToElicit": "FlowerType", 
       "dialogState": "ElicitSlot", 
       "intentName": "OrderFlowers", 
       "inputTranscript": "i would like to order some flowers", 
       "slots": {
           "PickupDate": null, 
           "PickupTime": null, 
           "FlowerType": null
       }, 
       "message": "What type of flowers would you like to order?"
   }
   ```

3. To order roses, create the following audio file and send it to Amazon Lex :

   ```
   aws polly synthesize-speech ^
       --region eu-west-1 ^
       --output-format pcm ^
       --text "roses" ^
       --voice-id "Kendra" ^
       FlowerTypeSpeech.mpg
   ```

   ```
   aws lex-runtime post-content ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --content-type "audio/l16; rate=16000; channels=1" ^
       --input-stream FlowerTypeSpeech.mpg ^
       FlowerTypeOutputSpeech.mpg
   ```

4. To set the delivery date, create the following audio file and send it to Amazon Lex:

   ```
   aws polly synthesize-speech ^
       --region eu-west-1 ^
       --output-format pcm ^
       --text "tuesday" ^
       --voice-id "Kendra" ^
       DateSpeech.mpg
   ```

   ```
   aws lex-runtime post-content ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --content-type "audio/l16; rate=16000; channels=1" ^
       --input-stream DateSpeech.mpg ^
       DateOutputSpeech.mpg
   ```

5. To set the delivery time, create the following audio file and send it to Amazon Lex:

   ```
   aws polly synthesize-speech ^
       --region eu-west-1 ^
       --output-format pcm ^
       --text "10:00 a.m." ^
       --voice-id "Kendra" ^
       TimeSpeech.mpg
   ```

   ```
   aws lex-runtime post-content ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --content-type "audio/l16; rate=16000; channels=1" ^
       --input-stream TimeSpeech.mpg ^
       TimeOutputSpeech.mpg
   ```

6. To confirm the delivery, create the following audio file and send it to Amazon Lex:

   ```
   aws polly synthesize-speech ^
       --region eu-west-1 ^
       --output-format pcm ^
       --text "yes" ^
       --voice-id "Kendra" ^
       ConfirmSpeech.mpg
   ```

   ```
   aws lex-runtime post-content ^
       --region eu-west-1 ^
       --bot-name OrderFlowersBot ^
       --bot-alias "$LATEST" ^
       --user-id UserOne ^
       --content-type "audio/l16; rate=16000; channels=1" ^
       --input-stream ConfirmSpeech.mpg ^
       ConfirmOutputSpeech.mpg
   ```

   After you confirm the delivery, Amazon Lex sends a response that confirms fulfillment of the intent:

   ```
   {
       "contentType": "text/plain;charset=utf-8", 
       "dialogState": "ReadyForFulfillment", 
       "intentName": "OrderFlowers", 
       "inputTranscript": "yes", 
       "slots": {
           "PickupDate": "2017-05-16", 
           "PickupTime": "10:00", 
           "FlowerType": "roses"
       }
   }
   ```

# Exercise 2: Add a New Utterance (AWS CLI)

To improve the machine learning model that Amazon Lex uses to recognize requests from your users, add another sample utterance to the bot.

Adding a new utterance is a four-step process.

1. Use the [GetIntent](https://docs.aws.amazon.com/lex/latest/dg/API_GetIntent.html) operation to get an intent from Amazon Lex.
2. Update the intent.
3. Use the [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html) operation to send the updated intent back to Amazon Lex.
4. Use the [GetBot](https://docs.aws.amazon.com/lex/latest/dg/API_GetBot.html) and [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html) operations to rebuild any bot that uses the intent.

To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

The response from the `GetIntent` operation contains a field called `checksum` that identifies a specific revision of the intent. You must provide the checksum value when you use the [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html) operation to update an intent. If you don't, you'll get the following error message:

```
            An error occurred (PreconditionFailedException) when calling 
            the PutIntent operation: Intent intent name already exists. 
            If you are trying to update intent name you must specify the 
            checksum.
        
```

Note

The following AWS CLI example is formatted for Unix, Linux, and macOS. For Windows, change `"\$LATEST"` to `$LATEST` and replace the backslash (\) continuation character at the end of each line with a caret (^).

**To update the OrderFlowers intent (AWS CLI)**

1. In the AWS CLI, get the intent from Amazon Lex. Amazon Lex sends the output to a file called **OrderFlowers-V2.json.**

   ```
   aws lex-models get-intent ^
       --region eu-west-1 ^
       --name OrderFlowers ^
       --intent-version "$LATEST" > OrderFlowers-V2.json
   ```

2. Open **OrderFlowers-V2.json** in a text editor.

   1. Find and delete the `createdDate`, `lastUpdatedDate`, and `version` fields.

   2. Add the following to the `sampleUtterances` field:

      ```
      I want to order flowers
      ```

   3. Save the file.

3. Send the updated intent to Amazon Lex with the following command:

   ```
   aws lex-models put-intent  ^
       --region eu-west-1 ^
       --name OrderFlowers ^
       --cli-input-json file://OrderFlowers-V2.json
   ```

   Amazon Lex sends the following response:

   ```
   {
       "confirmationPrompt": {
           "maxAttempts": 2, 
           "messages": [
               {
                   "content": "Okay, your {FlowerType} will be ready for pickup by {PickupTime} on {PickupDate}.  Does this sound okay?", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "name": "OrderFlowers", 
       "checksum": "checksum", 
       "version": "$LATEST", 
       "rejectionStatement": {
           "messages": [
               {
                   "content": "Okay, I will not place your order.", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "createdDate": timestamp, 
       "lastUpdatedDate": timestamp, 
       "sampleUtterances": [
           "I would like to pick up flowers", 
           "I would like to order some flowers", 
           "I want to order flowers"
       ], 
       "slots": [
           {
               "slotType": "AMAZON.TIME", 
               "name": "PickupTime", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "Pick up the {FlowerType} at what time on {PickupDate}?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 3, 
               "description": "The time to pick up the flowers"
           }, 
           {
               "slotType": "FlowerTypes", 
               "name": "FlowerType", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "What type of flowers would you like to order?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 1, 
               "slotTypeVersion": "$LATEST", 
               "sampleUtterances": [
                   "I would like to order {FlowerType}"
               ], 
               "description": "The type of flowers to pick up"
           }, 
           {
               "slotType": "AMAZON.DATE", 
               "name": "PickupDate", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "What day do you want the {FlowerType} to be picked up?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 2, 
               "description": "The date to pick up the flowers"
           }
       ], 
       "fulfillmentActivity": {
           "type": "ReturnIntent"
       }, 
       "description": "Intent to order a bouquet of flowers for pick up"
   }
   ```

Now that you have updated the intent, rebuild any bot that uses it.

**To rebuild the OrderFlowersBot bot (AWS CLI)**

1. In the AWS CLI, get the definition of the `OrderFlowersBot` bot and save it to a file with the following command:

   ```
   aws lex-models get-bot ^
       --region eu-west-1 ^
       --name OrderFlowersBot ^
       --version-or-alias "$LATEST" > OrderFlowersBot-V2.json
   ```

2. In a text editor, open **OrderFlowersBot-V2.json**. Remove the `createdDate`, `lastUpdatedDate`, `status` and `version` fields.

3. In a text editor, add the following line to the bot definition:

   ```
   "processBehavior": "BUILD",
   ```

4. In the AWS CLI, build a new revision of the bot by running the following command to :

   ```
   aws lex-models put-bot ^
       --region eu-west-1 ^
       --name OrderFlowersBot ^
       --cli-input-json file://OrderFlowersBot-V2.json
   ```

   The response from the server is:

   ```
   {
       "status": "BUILDING", 
       "intents": [
           {
               "intentVersion": "$LATEST", 
               "intentName": "OrderFlowers"
           }
       ], 
       "name": "OrderFlowersBot", 
       "locale": "en-US", 
       "checksum": "checksum", 
       "abortStatement": {
           "messages": [
               {
                   "content": "Sorry, I'm not able to assist at this time", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "version": "$LATEST", 
       "lastUpdatedDate": timestamp, 
       "createdDate": timestamp 
       "clarificationPrompt": {
           "maxAttempts": 2, 
           "messages": [
               {
                   "content": "I didn't understand you, what would you like to do?", 
                   "contentType": "PlainText"
               }
           ]
       }, 
       "voiceId": "Salli", 
       "childDirected": false, 
       "idleSessionTTLInSeconds": 600, 
       "description": "Bot to order flowers on the behalf of a user"
   }
   ```
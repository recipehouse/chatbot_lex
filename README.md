# Lex_Ingredients

this repo is for lex chatbot for the app

##Building the chatbot

### Create a Service-Linked Role (AWS CLI)

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

### Create a Custom Slot Type (AWS CLI)

Create a custom slot type with enumeration values for the flowers that can be ordered. You use this type in the next step when you create the `OrderFlowers` intent. A *slot type* defines the possible values for a slot, or parameter, of the intent.

To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

**To create a custom slot type (AWS CLI)**

1. Create a text file named **IngredientTypes.json**. Use the IngredientTypes.json file provided.
2. Call the [PutSlotType](https://docs.aws.amazon.com/lex/latest/dg/API_PutSlotType.html) operation using the AWS CLI to create the slot type. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models put-slot-type ^
    --region eu-west-1 ^
    --name IngredientTypes ^
    --cli-input-json file://IngredientTypes.json
```

### Create an Intent (AWS CLI)

Create an intent for the `OrderFlowersBot` bot and provide three slots, or parameters. The slots allow the bot to fulfill the intent:

- `FlowerType` is a custom slot type that specifies which types of flowers can be ordered.
- `AMAZON.DATE` and `AMAZON.TIME` are built-in slot types used for getting the date and time to deliver the flowers from the user.

To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

**To create the ListIngredients intent (AWS CLI)**

1. Create a text file named **ListIngredients.json**. Use the ListIngredients.json file provided.
2. In the AWS CLI, call the [PutIntent](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html) operation to create the intent. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (\) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models put-intent ^
   --region eu-west-1 ^
   --name ListIngredients ^
   --cli-input-json file://ListIngredients.json
```

***Will need Lambda functions to dynamically get rand number of ingredients***

### Step 4: Create a Bot (AWS CLI)

The `OrderFlowersBot` bot has one intent, the `OrderFlowers` intent that you created in the previous step. To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

Note

The following AWS CLI example is formatted for Unix, Linux, and macOS. For Windows, change `"\$LATEST"` to `$LATEST`.

**To create the OrderFlowersBot bot (AWS CLI)**

1. Create a text file named **ListIngredientsBot.json**. Reference the JSON code in [OrderFlowersBot.json](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-create-order-flowers-bot-json.html).

In the AWS CLI, call the [PutBot](https://docs.aws.amazon.com/lex/latest/dg/API_PutBot.html) operation to create the bot. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models put-bot ^
    --region eu-west-1 ^
    --name ListIngredientsBot ^
    --cli-input-json file://ListIngredientsBot.json
```

To determine if your new bot is ready for use, run the following command. Repeat this command until the `status` field returns `READY`. The example is formatted for Unix, Linux, and macOS. For Windows, replace the backslash (^) Unix continuation character at the end of each line with a caret (^).

```
aws lex-models get-bot ^
    --region eu-west-1 ^
    --name ListIngredientsBot ^
    --version-or-alias "$LATEST"
```

Look for the `status` field in the response:

```
{
    "status": "READY", 
    
    ...
    
}
```

# Exercise 4: Publish a Version (AWS CLI)

Now, create a version of the bot that you created in Exercise 1. A *version* is a snapshot of the bot. After you create a version, you can’t change it. The only version of a bot that you can update is the `$LATEST` version. For more information about versions, see [Versioning and Aliases](https://docs.aws.amazon.com/lex/latest/dg/versioning-aliases.html).

Before you can publish a version of a bot, you must publish the intents that is uses. Likewise, you must publish the slot types that those intents refer to. In general, to publish a version of a bot, you do the following:

1. Publish a version of a slot type with the [CreateSlotTypeVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateSlotTypeVersion.html) operation.
2. Publish a version of an intent with the [CreateIntentVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateIntentVersion.html) operation.
3. Publish a version of a bot with the [CreateBotVersion](https://docs.aws.amazon.com/lex/latest/dg/API_CreateBotVersion.html) operation .

To run the commands in this exercise, you need to know the region where the commands will be run. For a list of regions, see [Model Building Limits ](https://docs.aws.amazon.com/lex/latest/dg/gl-limits.html#gl-limits-model-building).

- [Step 1: Publish the Slot Type (AWS CLI)](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-publish-slot-type.html)
- [Step 2: Publish the Intent (AWS CLI)](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-publish-intent.html)
- [Step 3: Publish the Bot (AWS CLI)](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-publish-bot.html)

# Step 1: Publish the Slot Type (AWS CLI)

Before you can publish a version of any intents that use a slot type, you must publish a version of that slot type. In this case, you publish the `IngredientTypes` slot type.

Note

The following AWS CLI example is formatted for Unix, Linux, and macOS. For Windows, change `"\$LATEST"` to `$LATEST` and replace the backslash (\) continuation character at the end of each line with a caret (^).

**To publish a slot type (AWS CLI)**

1. In the AWS CLI, get the latest version of the slot type:

   ```
   aws lex-models get-slot-type ^
       --region eu-west-1 ^
       --name IngredientTypes ^
       --slot-type-version "$LATEST"
   ```

   The response from Amazon Lex follows. Record the checksum for the current revision of the `$LATEST` version.

   ```
   {
       "enumerationValues": [
           {
               "value": "tulips"
           }, 
           {
               "value": "lilies"
           }, 
           {
               "value": "roses"
           }
       ], 
       "name": "FlowerTypes", 
       "checksum": "checksum", 
       "version": "$LATEST", 
       "lastUpdatedDate": timestamp, 
       "createdDate": timestamp, 
       "description": "Types of flowers to pick up"
   }
   ```

2. Publish a version of the slot type. Use the checksum that you recorded in the previous step.

   ```
   aws lex-models create-slot-type-version ^
       --region eu-west-1 ^
       --name IngredientTypes ^
       --checksum "0fe199d9-5aff-4201-84e5-bcc7623fd69c"

   ```

   The response from Amazon Lex follows. Record the version number for the next step.

   ```
   {
       "version": "1", 
       "enumerationValues": [
           {
               "value": "tulips"
           }, 
           {
               "value": "lilies"
           }, 
           {
               "value": "roses"
           }
       ], 
       "name": "FlowerTypes", 
       "createdDate": timestamp, 
       "lastUpdatedDate": timestamp, 
       "description": "Types of flowers to pick up"
   }

   ```

# Step 2: Publish the Intent (AWS CLI)

Before you can publish an intent, you have to publish all of the slot types referred to by the intent. The slot types must be numbered versions, not the `$LATEST` version.

First, update the `ListIngredients` intent to use the version of the `FlowerTypes` slot type that you published in the previous step. Then publish a new version of the `OrderFlowers` intent.

Note

The following AWS CLI example is formatted for Unix, Linux, and macOS. For Windows, change `"\$LATEST"` to `$LATEST` and replace the backslash (\) continuation character at the end of each line with a caret (^).

**To publish a version of an intent (AWS CLI)**

1. In the AWS CLI, get the `$LATEST` version of the `OrderFlowers` intent and save it to a file:

   ```
   aws lex-models get-intent ^
       --region eu-west-1 ^
       --name ListIngredients ^
       --intent-version "$LATEST" > ListIngredients_V2.json

   ```

2. In a text editor, open the **ListIngredients_V2.json** file. Delete the `createdDate`, `lastUpdatedDate`, and `version` fields. Find the `IngredientsTypes` slot type and change the version to the version number that you recorded in the previous step. The following fragment of the **ListIngredients_V2.json** file shows the location of the change:

   ```
           {
               "slotType": "FlowerTypes", 
               "name": "FlowerType", 
               "slotConstraint": "Required", 
               "valueElicitationPrompt": {
                   "maxAttempts": 2, 
                   "messages": [
                       {
                           "content": "What type of flowers?", 
                           "contentType": "PlainText"
                       }
                   ]
               }, 
               "priority": 1, 
               "slotTypeVersion": "version", 
               "sampleUtterances": []
           }, 


   ```

3. In the AWS CLI, save the revision of the intent:

   ```
   aws lex-models put-intent ^
       --name ListIngredients ^
       --cli-input-json file://ListIngredients_V2.json

   ```

4. Get the checksum of the latest revision of the intent:

   ```
   aws lex-models get-intent ^
       --region eu-west-1 ^
       --name ListIngredients ^
       --intent-version "$LATEST"

   ```

   The following fragment of the response shows the checksum of the intent. Record this for the next step.

   ```
       "name": "OrderFlowers", 
       "checksum": "checksum", 
       "version": "$LATEST", 


   ```

5. Publish a new version of the intent:

   ```
   aws lex-models create-intent-version ^
       --region eu-west-1 ^
       --name ListIngredients ^
       --checksum "4907c589-57ee-45c6-89cd-56768626f86f"
   ```

   The following fragment of the response shows the new version of the intent. Record the version number for the next step.

   ```
       "name": "OrderFlowers", 
       "checksum": "checksum", 
       "version": "version", 

   ```

# Step 3: Publish the Bot (AWS CLI)

After you have published all of the slot types and intents that are used by your bot, you can publish the bot.

Update the `OrderFlowersBot` bot to use the `OrderFlowers` intent that you updated in the previous step. Then, publish a new version of the`OrderFlowersBot` bot.

Note

The following AWS CLI example is formatted for Unix, Linux, and macOS. For Windows, change `"\$LATEST"` to `$LATEST` and replace the backslash (\) continuation character at the end of each line with a caret (^).

**To publish a version of a bot (AWS CLI)**

1. In the AWS CLI, get the `$LATEST` version of the `OrderFlowersBot` bot and save it to a file:

   ```
   aws lex-models get-bot ^
       --region eu-west-1 ^
       --name ListIngredientsBot ^
       --version-or-alias "$LATEST" > ListIngredientsBot_V3.json

   ```

2. In a text editor, open the **OrderFlowersBot_V4.json** file. Delete the `createdDate`, `lastUpdatedDate`, `status` and `version` fields. Find the`OrderFlowers` intent and change the version to the version number that you recorded in the previous step. The following fragment of**OrderFlowersBot_V4.json** shows the location of the change.

   ```
       "intents": [
           {
               "intentVersion": "version", 
               "intentName": "OrderFlowers"
           }

   ```

3. In the AWS CLI, save the new revision of the bot:

   ```
   aws lex-models put-bot ^
       --name ListIngredientsBot ^
       --cli-input-json file://ListIngredientsBot_V3.json

   ```

4. Get the checksum of the latest revision of the bot:

   ```
   aws lex-models get-bot ^
       --region eu-west-1 ^
       --name ListIngredientsBot ^
       --version-or-alias "$LATEST" > ListIngredientsBot_V3.json

   ```

   The following fragment of the response shows the checksum of the bot. Record this for the next step.

   ```
       "name": "OrderFlowersBot", 
       "locale": "en-US", 
       "checksum": "checksum", 

   ```

5. Publish a new version of the bot:

   ```
   aws lex-models create-bot-version ^
       --region eu-west-1 ^
       --name ListIngredientsBot ^
       --checksum "b2cb8da4-cdaa-4477-bda3-6496f9c815f0"

   ```

   The following fragment of the response shows the new version of the bot.

   ```
       "checksum": "checksum", 
       "abortStatement": {
           ...
       }, 
       "version": "1",
       "lastUpdatedDate": timestamp, 


   ```

# 
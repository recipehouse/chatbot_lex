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

1. Create a text file named **OrderFlowersBot.json**. Copy the JSON code from [OrderFlowersBot.json](https://docs.aws.amazon.com/lex/latest/dg/gs-cli-create-order-flowers-bot-json.html) into the text file.

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


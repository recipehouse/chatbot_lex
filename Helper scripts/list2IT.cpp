#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main(int argc, char* argv[])
{
    ifstream file;
    file.open("wordlist.txt");

    ofstream myfile;
    myfile.open ("IngredientTypes.json");
    string str;

    if(file.is_open())
    {
        myfile << "{\n    \"enumerationValues\": [\n";
        while (getline(file, str))
        {
            myfile << "        {\n            \"value\": \"" << str << "\"\n        },\n";
        }
        myfile << "    ],\n    \"name\": \"IngredientTypes\",\n" << "    \"description\": \"Types of ingredients available to select\"\n}";
    }


    myfile.close();
    file.close();
    return 0;
}

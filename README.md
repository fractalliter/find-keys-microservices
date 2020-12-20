# Find Keys


Find keys in a big json response efficiently.

## Description

In this simple package, I tried to find the provided keys in a large JSON response without fetching the entire response. 

Sometimes, you need to find some provided keys in a large JSON response. It's a waste of time and resources if you load the entire responses into your memory and then look through for specified keys over and over.

In the test case, I found all three keys in the first two chunks without fetching all 16 chunks.

## How to run

clone the repository on your local machine.

You need to have docker installed on your machine.
check to see if you have it:

`
$ sudo docker -v
`

If you have then go to project directory and run:

`
$ sudo docker-compose up
`

open a terminal and send the following request:

`
$ curl -X POST http://localhost:3001 -d '{"keys":["actions.save", "address.form.error.first_name", "address.form.label.city"]}'
`

the output must be the following json

`
{
    "actions.save":"Speichern",
    "address.form.error.first_name":"Vorname","address.form.label.city":"City",
}
`

in this example which I test with default buffer size the number of chunks was 16. since keys were in the fist 2 chunk the rest of the chunks hasn't been fetched and connection destroyed after finding all the keys.


stop the containers with:

`
$ sudo docker-compose down
`
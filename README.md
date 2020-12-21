# Find Keys


Find keys in a big JSON response efficiently.

## Description

In this simple package, I tried to find the provided keys in a large JSON response without fetching the entire response. 

Sometimes, you need to find some provided keys in a large JSON response. It's a waste of time and resources if you load the entire response into your memory and then look through for specified keys over and over.

In the upcoming test case, I found all three keys in the first two chunks without fetching all 16 chunks.

## How to run

clone the repository on your local machine.

You need to have docker installed on your machine.
check to see if you have it:

`
$ sudo docker -v
`

If you have then go to the project directory and run:

`
$ sudo docker-compose up
`

When everything is up and running open a terminal and send the following request:

`
$ curl -X POST http://localhost:3001 -d '{"keys":["actions.save", "address.form.error.first_name", "address.form.label.city"]}'
`

the output must be the following JSON

`
{
    "actions.save":"Speichern",
    "address.form.error.first_name":"Vorname","address.form.label.city":"City",
}
`

in this example which I tested with default buffer size the number of chunks was 16. since keys were in the first 2 chunks the rest of the chunks haven't been fetched and the connection was destroyed after finding all the keys.


stop the containers with:

`
$ sudo docker-compose down
`

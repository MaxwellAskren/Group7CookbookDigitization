/*How might this work?
Notice, this is in a private route (denoted by the _ before the folder name)
This file should not need to be called explicitly because of the cron job (scheduling library)
the flow is like this
1a. cron job around this entire process
1. connect to the database (mongodb) and pull all of the ingredients to find their product links
2. Build our call to the apify client 'actor' (list of the productURLs will be passed to it)
3. take the dataset returned (which will include pricing and a slew of other info) and place the fields that we want into the db
when placing things in the database, we can just place the dataset returned straight into our db, and then I could use an already existing
aggregation to place the info in the correct fields. just a thought.
*/
'use server'; //we need to ensure this is server side
import { ApifyClient } from 'apify-client';
const cron = require('node-cron');
const axious = require('axios');

// Initialize the client with your API token
// this needs to be from our .env file, dont commit it! 
const client = new ApifyClient({
    token: 'YOUR-APIFY-TOKEN',
});

// Start an Actor and wait for it to finish
//this actor is called e-commerce/walmart-product-detail-scraper
//the start URLs is the product links that we need to pull from the database
//max crawl pages should stay at 1 here, we know exactly what page we want, so there is no need to search others
const run = await client.actor('apify/web-scraper').call({
    startUrls: [{ url: 'https://example.com' }],
    maxCrawlPages: 1,
});

// Get results from the Actor's dataset
const { items } = await client.dataset(run.defaultDatasetId).listItems();
//after the dataset is returned, we should update the values in mongodb. 
console.log(items);
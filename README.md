# Rakuten Books Client

Rakuten Books Client is an NPM package that wraps around the Rakuten Books API and provides an easier way to access book information by ISBN. This package makes it easier for developers to access the information they need from the Rakuten Books API, without having to write the code to make API requests themselves.

## Features
* Search for books by ISBN
* Retrieve book information such as author, title, publisher, etc.

## Installation

To install Rakuten Books Client, simply run the following command in your terminal:

```yarn add rakuten-books-client``` or ```npm install rakuten-books-client```

## Usage

To use Rakuten Books Client, simply import the package and create an instance of the RakutenBooksService class, passing in your Rakuten Books API application ID.

Here is an example of how to search for a book by ISBN:

```
import RakutenBooksService from "rakuten-books-client";

const rakutenBooksService = new RakutenBooksService(<your-rakuten-books-api-application-id>);
const book = await rakutenBooksService.searchByIsbn(<isbn>);
```

## Future Development

The developer plans to add more features to Rakuten Books Client in the future to make it even more useful for accessing the Rakuten Books API. Stay tuned for updates!
// Rakuten Books API Endpoint
const RAKUTEN_BOOKS_ENDPOINT =
  "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404";

export type BookType = {
  author: string;
  title: string;
  subtitle: string;
  description: string;
  publisher: string;
  publishedAt?: string;
  imageUrl: string;
  vendorUrl?: string;
};

function parseImageUrl(imageUrl: string): string {
  /**
   * Parses an image URL string and returns a modified version of the URL.
   *
   * @param {string} imageUrl - The input image URL string.
   * @returns {string} The modified URL string with "_ex" parameter deleted from the search parameters.
   */
  let url = new URL(imageUrl);
  let params = new URLSearchParams(url.search);
  params.delete("_ex");
  url.search = params.toString();
  return url.toString();
}

class RakutenBooksService {
  /**
   * RakutenBooksService class provides functionality to search books by ISBN using Rakuten API.
   *
   * @property {string} endpoint - The endpoint URL for the Rakuten API.
   * @property {string} applicationId - The application ID required to access Rakuten API.
   */

  private readonly endpoint = RAKUTEN_BOOKS_ENDPOINT;
  private applicationId: string;

  // Constructor takes applicationId as an argument
  constructor(applicationId: string) {
    this.applicationId = applicationId;
  }

  async searchByIsbn(isbn: string): Promise<BookType | null> {
    /**
     * Searches a book by ISBN using Rakuten API.
     *
     * @param {string} isbn - The ISBN number of the book to search.
     * @returns {Promise<BookType | null>} A promise that resolves to the book information if found, otherwise null.
     * @throws {Error} If the API response contains
     */

    const url = new URL(this.endpoint);
    url.searchParams.append("applicationId", this.applicationId);
    url.searchParams.append("isbn", isbn);
    const response = await fetch(url.toString());
    const json = await response.json();
    // Check if json contains error key
    if (json.error) {
      throw new Error(json.error);
    }
    // Check if json contains Items key
    if (json.Items.length > 0) {
      const book = json.Items[0].Item;
      let imageUrl: string | undefined = book?.largeImageUrl;
      if (imageUrl) {
        imageUrl = parseImageUrl(imageUrl);
      }
      return {
        imageUrl,
        author: book["author"],
        title: book["title"],
        subtitle: book["subTitle"],
        description: book["itemCaption"],
        publisher: book["publisherName"],
        publishedAt: book["salesDate"],
      } as BookType;
    }
    return null;
  }
}

export default RakutenBooksService;

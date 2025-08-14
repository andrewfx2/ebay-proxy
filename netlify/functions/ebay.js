exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log('🔍 eBay diagnostic function called:', event.httpMethod);

    // Your eBay credentials
    const OAUTH_TOKEN = 'v^1.1#i^1#f^0#r^0#I^3#p^1#t^H4sIAAAAAAAA/+VYfWwURRTv9dqSAsX4EdAGYtlKUGD3ZvZur3tL7+Roe/RKv+gVKoiBvd1ZunRvd92dpT2icJYIGtME9Q+BUO0fmhhMkIQQiBJMTAxqrGDECFFJUIMY47dCoiE4ey3lWglFesYm3j+XefPmzfv93nvzZgdkSkoXbK/ffqnMM6VwIAMyhR4PnAZKS4oXzvAWlhcXgBwFz0DmvkxRr/dCtS2mNFNoQ7Zp6Daq6Elpui1khWHKsXTBEG3VFnQxhWwBS0Ii2tQosAwQTMvAhmRoVEW8NkzJVQrn9wMZckiWZAUQqX7VZrsRplAASGRG4gNQ5EMKS+Zt20Fx3caijsMUC1iOBjwNA+3AL7BAgEEGcnANVbEKWbZq6ESFAVQk666QXWvl+HpjV0XbRhYmRqhIPBpLtETjtXXN7dW+HFuRYR4SWMSOPXpUY8ioYpWoOejG29hZbSHhSBKybcoXGdphtFEhetWZW3A/S3VAUThZ4llQBXkIWZQXKmOGlRLxjf1wJapMK1lVAelYxenxGCVsJDciCQ+PmomJeG2F+7fCETVVUZEVpuqWRldHW1upSFSXLdQdQ3SrI3UtQ7pKt7bV0iwPAxIXrFJoicDlOT44vNGQtWGax+xUY+iy6pJmVzQbeCkiXqOx3MAcbohSi95iRRXsepSrx13lMFC1xg3qUBQd3Km7cUUpQkRFdjh+BEZWY2ypSQejEQtjJ7IUhSnRNFWZGjuZzcXh9Omxw1Qnxqbg83V3dzPdfsawNvhYAKDvoabGhNSJUiJFdN1aH9JXx19Aq1koEsktoi/gtEl86SG5ShzQN1ARzh+EAXaY99FuRcZK/ybIwewbXRH5qhAe8oFAUAn4WRmEQkjMR4VEhpPU5/qBkmKaTolWF8KmJkqIlkieOSlkqbLg5xTWzyuIloMhhQ6EFIVOcnKQhgpCAKFkUgrx/6dCudlUTyDJQjgvuZ63PDecthWtaVZTQ1bbcqsbpqKPbvZxbIfV7I9v3MivrFsINy1vrsE6Fw3fbDVcF3yNphJm2sn++SDArfX8kVBv2BjJE4KXkAwTtRqaKqUnV4D9ltwqWjidQJpGBBMCGTXNeH7O6rzB+4fHxK3hzl+P+o/603VR2W7KTi5U7nqbGBBNlXE7ECMZKZ9b64ZIrh+ueF3W6wnhVsnNdVKhJiCH0Kry0JWTycJl7E0SYyHbcCxy22Za3BtYu9GFdNLPsGVoGrJWwQnXcyrlYDGpoclW2HlIcFWcZM0WVnEcDMAgnNhxJGVb6brJdiTl4ygu6vXMHRd/GxK11OTCblqG7EjuHfNf+GTwjX7AiBRkf7DX8zbo9Rwr9HhANZgHK8HcEu/KIu/0clvFiFFFhbHVDTr5LrcQ04XSpqhahXcWnJjRKD9R3/h7Jukc7vjtQb6gLOf9ZOARcPfIC0qpF07LeU4Bs6/NFMPbZpWxHCCxBX4WwOAaUHlttgjOLLrrmSvJ/tDaaYPrZ76euPjjpxeqPpy/BZSNKHk8xQUk2AW7H7+f7+t/eZ73vNH51o7Y+vS8ORnx1Nqug9Ke3vf7q99r8iWcqX+gy08db7HgefXdvS+Wdz//0mOfd5bcMZjZdjoIXn3j9oYTDWu/2vnn4ssn75nfJ5zb8o2w/81YdHXB0djx9itPPxAaiJU+mTl2pjFRalZSB3b8vPCsuPWFqU313x84NsjQsy3nTFvfkv5v8ReHy7uKeo8e2h9/rqG/MvHTvl+ruZIllzpO7zvb07ClcxAaexeEPgodWTQdbh6MfLdywZFZMWZP8Nkly+TdBxftPTTn0BRu59YpvxQGO5KLT5a8su2zo7saZ1Qn9n/i7bMvfr3rnXOVHz+8w2h5rSRxyozO/ODLH+6tGYrlX/wpzMfZEgAA';
    const CLIENT_ID = 'AndrewFe-PuckGeni-PRD-2814c567f-c12e8586';

    // Get search term from request
    let searchTerm;
    if (event.httpMethod === 'POST' && event.body) {
      const body = JSON.parse(event.body);
      searchTerm = body.searchTerm;
    } else if (event.queryStringParameters) {
      searchTerm = event.queryStringParameters.searchTerm;
    }

    if (!searchTerm) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'searchTerm parameter is required. Usage: ?searchTerm=iPhone' 
        })
      };
    }

    console.log('🔍 Searching eBay for:', searchTerm);

    // Diagnostic object to collect all details
    const diagnostic = {
      searchTerm,
      timestamp: new Date().toISOString(),
      browseAPI: {},
      findingAPI: {},
      tokenInfo: {
        provided: !!OAUTH_TOKEN,
        length: OAUTH_TOKEN?.length || 0,
        prefix: OAUTH_TOKEN?.substring(0, 10) || 'none'
      }
    };

    // Method 1: Test Browse API with full diagnostics
    try {
      console.log('📡 Testing Browse API...');
      diagnostic.browseAPI.attempted = true;
      
      const searchParams = new URLSearchParams({
        q: searchTerm,
        limit: 5, // Smaller limit for testing
        sort: 'newlyListed'
      });

      const browseUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?${searchParams}`;
      diagnostic.browseAPI.url = browseUrl;
      
      const browseResponse = await fetch(browseUrl, {
        headers: {
          'Authorization': `Bearer ${OAUTH_TOKEN}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          'Accept': 'application/json'
        }
      });

      diagnostic.browseAPI.status = browseResponse.status;
      diagnostic.browseAPI.statusText = browseResponse.statusText;

      const browseResponseText = await browseResponse.text();
      diagnostic.browseAPI.responseLength = browseResponseText.length;

      if (browseResponse.ok) {
        const browseData = JSON.parse(browseResponseText);
        diagnostic.browseAPI.success = true;
        diagnostic.browseAPI.itemCount = browseData.itemSummaries?.length || 0;
        diagnostic.browseAPI.total = browseData.total || 0;
        
        if (browseData.itemSummaries && browseData.itemSummaries.length > 0) {
          // Return success with diagnostic info
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              method: 'Browse API',
              diagnostic,
              count: browseData.itemSummaries.length,
              listings: browseData.itemSummaries.slice(0, 3) // Just first 3 for testing
            })
          };
        }
      } else {
        diagnostic.browseAPI.success = false;
        diagnostic.browseAPI.errorResponse = browseResponseText.substring(0, 500); // First 500 chars
        console.log('❌ Browse API failed:', browseResponse.status, browseResponseText);
      }
    } catch (browseError) {
      diagnostic.browseAPI.success = false;
      diagnostic.browseAPI.error = browseError.message;
      console.log('❌ Browse API error:', browseError.message);
    }

    // Method 2: Test Finding API with full diagnostics
    try {
      console.log('📡 Testing Finding API...');
      diagnostic.findingAPI.attempted = true;
      
      let findingUrl = "https://svcs.ebay.com/services/search/FindingService/v1";
      findingUrl += "?OPERATION-NAME=findItemsByKeywords";
      findingUrl += "&SERVICE-VERSION=1.0.0";
      findingUrl += `&SECURITY-APPNAME=${CLIENT_ID}`;
      findingUrl += "&GLOBAL-ID=EBAY-US";
      findingUrl += "&RESPONSE-DATA-FORMAT=JSON";
      findingUrl += "&REST-PAYLOAD";
      findingUrl += `&keywords=${encodeURIComponent(searchTerm)}`;
      findingUrl += "&paginationInput.entriesPerPage=5"; // Small limit for testing

      diagnostic.findingAPI.url = findingUrl;
      console.log('🌐 Calling Finding API:', findingUrl);

      const findingResponse = await fetch(findingUrl);
      diagnostic.findingAPI.status = findingResponse.status;
      diagnostic.findingAPI.statusText = findingResponse.statusText;

      const findingResponseText = await findingResponse.text();
      diagnostic.findingAPI.responseLength = findingResponseText.length;
      
      if (findingResponse.ok) {
        const findingData = JSON.parse(findingResponseText);
        diagnostic.findingAPI.success = true;
        
        const searchResult = findingData.findItemsByKeywordsResponse?.[0]?.searchResult?.[0];
        const items = searchResult?.item;
        
        diagnostic.findingAPI.itemCount = items?.length || 0;
        diagnostic.findingAPI.searchResult = !!searchResult;
        
        if (items && items.length > 0) {
          // Return success with diagnostic info
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              method: 'Finding API',
              diagnostic,
              count: items.length,
              listings: items.slice(0, 3).map(item => ({
                title: item.title?.[0] || 'No title',
                price: item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ || 'No price'
              }))
            })
          };
        } else {
          diagnostic.findingAPI.noItems = true;
        }
      } else {
        diagnostic.findingAPI.success = false;
        diagnostic.findingAPI.errorResponse = findingResponseText.substring(0, 500);
        console.log('❌ Finding API failed:', findingResponse.status, findingResponseText);
      }
    } catch (findingError) {
      diagnostic.findingAPI.success = false;
      diagnostic.findingAPI.error = findingError.message;
      console.log('❌ Finding API error:', findingError.message);
    }

    // Return full diagnostic information
    return {
      statusCode: 200, // Return 200 so we can see the diagnostic info
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Both APIs failed - here is full diagnostic information',
        diagnostic,
        troubleshooting: {
          nextSteps: [
            'Check if your OAuth token is expired',
            'Verify eBay API status at developer.ebay.com',
            'Try again in a few minutes - APIs may be temporarily down',
            'Check Netlify function logs for more details'
          ]
        }
      })
    };

  } catch (error) {
    console.error('❌ Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack?.substring(0, 500)
      })
    };
  }
};

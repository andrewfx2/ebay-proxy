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
    console.log('🔍 eBay function called:', event.httpMethod);

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
          error: 'searchTerm parameter is required. Usage: ?searchTerm=iPhone or POST with {"searchTerm":"iPhone"}' 
        })
      };
    }

    console.log('🔍 Searching eBay for:', searchTerm);

    // Method 1: Try Browse API first
    try {
      console.log('📡 Trying Browse API...');
      
      const searchParams = new URLSearchParams({
        q: searchTerm,
        limit: 12,
        sort: 'newlyListed',
        filter: 'buyingOptions:{FIXED_PRICE}',
        fieldgroups: 'MATCHING_ITEMS,EXTENDED'
      });

      const browseUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?${searchParams}`;
      
      const browseResponse = await fetch(browseUrl, {
        headers: {
          'Authorization': `Bearer ${OAUTH_TOKEN}`,
          'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          'X-EBAY-C-ENDUSERCTX': 'contextualLocation=country%3DUS,zip%3D19406',
          'Accept': 'application/json'
        }
      });

      if (browseResponse.ok) {
        const browseData = await browseResponse.json();
        console.log('✅ Browse API success! Items found:', browseData.itemSummaries?.length || 0);
        
        if (browseData.itemSummaries && browseData.itemSummaries.length > 0) {
          const listings = browseData.itemSummaries.map(item => ({
            title: item.title,
            price: item.price ? `${item.price.value}` : 'Price not available',
            image: item.image?.imageUrl || item.additionalImages?.[0]?.imageUrl,
            link: item.itemWebUrl,
            condition: item.condition || 'Not specified',
            location: item.itemLocation?.city || 'Location not specified',
            shipping: item.shippingOptions?.[0]?.shippingCost ? 
              `${item.shippingOptions[0].shippingCost.value} shipping` : 
              'Free shipping'
          }));

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              method: 'Browse API',
              count: listings.length,
              total: browseData.total || 0,
              searchTerm: searchTerm,
              listings: listings
            })
          };
        }
      } else {
        const browseError = await browseResponse.text();
        console.log('❌ Browse API failed:', browseResponse.status, browseError);
      }
    } catch (browseError) {
      console.log('❌ Browse API error:', browseError.message);
    }

    // Method 2: Fallback to Finding API (more reliable)
    try {
      console.log('📡 Trying Finding API fallback...');
      
      let findingUrl = "https://svcs.ebay.com/services/search/FindingService/v1";
      findingUrl += "?OPERATION-NAME=findItemsByKeywords";
      findingUrl += "&SERVICE-VERSION=1.0.0";
      findingUrl += `&SECURITY-APPNAME=${CLIENT_ID}`;
      findingUrl += "&GLOBAL-ID=EBAY-US";
      findingUrl += "&RESPONSE-DATA-FORMAT=JSON";
      findingUrl += "&REST-PAYLOAD";
      findingUrl += `&keywords=${encodeURIComponent(searchTerm)}`;
      findingUrl += "&paginationInput.entriesPerPage=12";
      findingUrl += "&sortOrder=StartTimeNewest";
      findingUrl += "&itemFilter(0).name=ListingType";
      findingUrl += "&itemFilter(0).value=FixedPrice";

      console.log('🌐 Calling Finding API:', findingUrl);

      const findingResponse = await fetch(findingUrl);
      
      if (findingResponse.ok) {
        const findingData = await findingResponse.json();
        console.log('✅ Finding API response received');
        
        const searchResult = findingData.findItemsByKeywordsResponse?.[0]?.searchResult?.[0];
        const items = searchResult?.item;
        
        if (items && items.length > 0) {
          console.log('✅ Finding API success! Items found:', items.length);
          
          const listings = items.map(item => ({
            title: item.title?.[0] || 'No title',
            price: item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ ? 
              `${item.sellingStatus[0].currentPrice[0].__value__}` : 'Price not available',
            image: item.galleryURL?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
            link: item.viewItemURL?.[0] || 'https://www.ebay.com',
            condition: item.condition?.[0]?.conditionDisplayName?.[0] || 'Not specified',
            location: item.location?.[0] || 'Location not specified',
            shipping: item.shippingInfo?.[0]?.shippingServiceCost?.[0]?.__value__ === '0.0' ? 
              'Free shipping' : 
              item.shippingInfo?.[0]?.shippingServiceCost?.[0]?.__value__ ? 
                `${item.shippingInfo[0].shippingServiceCost[0].__value__} shipping` : 
                'Shipping varies'
          }));

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              method: 'Finding API (Browse API had issues)',
              count: listings.length,
              total: searchResult.count?.[0] || listings.length,
              searchTerm: searchTerm,
              listings: listings
            })
          };
        } else {
          console.log('⚠️ Finding API returned no items');
        }
      } else {
        console.log('❌ Finding API failed:', findingResponse.status);
      }
    } catch (findingError) {
      console.log('❌ Finding API error:', findingError.message);
    }

    // If both APIs fail, return helpful error
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Both eBay Browse API and Finding API are currently unavailable',
        details: 'eBay is experiencing technical issues. Please try again later.',
        searchTerm: searchTerm,
        timestamp: new Date().toISOString()
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
        details: 'Check function logs in Netlify dashboard for more information'
      })
    };
  }
};

  const form = document.getElementById('report-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const reason = document.getElementById('reason').value;

    // Construct the API request to Google Safe Browsing
    const apiUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=YOUR_API_KEY';
    const requestBody = {
      'client': {
        'clientId': 'your-client-id',
        'clientVersion': '1.0'
      },
      'threatInfo': {
        'threatTypes': ['MALWARE', 'SOCIAL_ENGINEERING'],
        'platformTypes': ['ANY_PLATFORM'],
        'threatEntryTypes': ['URL'],
        'threatEntries': [
          {'url': url, 'threatTypes': ['MALWARE', 'SOCIAL_ENGINEERING']}
        ]
      }
    };

    // Add the reason to the request body
    requestBody.threatInfo.threatEntries[0].threatTypes.push(`USER_REPORT:${reason}`);

    // Send the request to Google Safe Browsing
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
   .then((response) => response.json())
   .then((data) => console.log(data))
   .catch((error) => console.error(error));
  });
</script>
